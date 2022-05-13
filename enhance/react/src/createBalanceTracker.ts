import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { debounce, isEqual } from 'lodash-es';
import shallow from 'zustand/shallow';
import { type store, Unit } from '@cfxjs/use-wallet-react/conflux';
import Decimal from 'decimal.js';

export interface SubObject {
    fetcher: (dependency: { wallet: { account?: string; chainId?: string; }; dependency?: any; }) => Promise<string> | undefined | null | boolean | '';
}

export interface BalanceStore {
    balance?: Unit;
    dependency?: any;
}
const balanceSelector = (state: BalanceStore) => state.balance;

export default function createBalanceTracker({
    subObjects, store: walletStore, intervalTime = 1500
}: {
    subObjects: Array<SubObject>,
    store: typeof store,
    intervalTime?: number,
}) {
    const subCenter = new Map<any, (tick: Decimal) => void>();
    const setSubFetcher = (
        { subObject, subObjectDriver }: { subObject: SubObject, subObjectDriver: any; },
        { wallet, dependency }: { wallet: { account?: string; chainId?: string; }; dependency: any; }
    ) => {
        subCenter.set(subObject, async (currentTick: Decimal) => {
            const fetcherRes = subObject.fetcher?.({ wallet, dependency});
            if (isPromise(fetcherRes)) {
                fetcherRes
                    .then(
                        (minUnitBalance) =>
                            typeof minUnitBalance === 'string' &&
                            subObjectDriver.handleBalanceChanged(Unit.fromMinUnit(minUnitBalance), currentTick),
                    )
                    .catch(() => {})
                    .finally(subObjectDriver.clearSetUndefinedTimer);
            }
        });
    }
    let tick = new Decimal('0');
    let timer: number | null = null;

    const clearTimer = () => {
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }
    };

    const tickFetchBalance = () => {
        tick = tick.add(new Decimal('1'));
        subCenter.forEach(function (fetcher) {
            fetcher(tick);
        });
    };

    const startTickFetch = () => {
        clearTimer();
        tickFetchBalance();
        timer = setInterval(tickFetchBalance, intervalTime) as unknown as number;
    };

    startTickFetch();

    const subObjectsDriver = subObjects.map(() => {
        const balanceStore = create(subscribeWithSelector<BalanceStore>(() => ({ balance: undefined, dependency: undefined })));

        const handleBalanceChanged = (newBalance: Unit, currentTick: Decimal) => {
            if (!newBalance || !currentTick.equals(tick)) return;
            const preBalance = balanceStore.getState().balance;
            if (preBalance === undefined || !preBalance.equalsWith(newBalance)) {
                balanceStore.setState({ balance: newBalance });
            }
        };

        let setUndefinedTimer: number | null = null;
        const clearSetUndefinedTimer = () => {
            if (setUndefinedTimer !== null) {
                clearTimeout(setUndefinedTimer);
                setUndefinedTimer = null;
            }
        };
        const startSetUndefinedTimer = (rightNow?: boolean) => {
            clearTimeout();
            if (rightNow) {
                balanceStore.setState({ balance: undefined });
                setUndefinedTimer = null;
            } else {
                setUndefinedTimer = setTimeout(() => {
                    balanceStore.setState({ balance: undefined });
                    setUndefinedTimer = null;
                }, 200) as unknown as number;
            }
        };

        const driver = {
            store: balanceStore,
            use: () => balanceStore(balanceSelector),
            handleBalanceChanged,
            startSetUndefinedTimer,
            clearSetUndefinedTimer,
            setDependency: (dependency: object) => {
                driver.isDependentOnOuter = true;
                balanceStore.setState({ dependency });
            },
            isDependentOnAccount: false,
            isDependentOnChainId: false,
            isDependentOnOuter: false,
            trackChangeOnce: (callback: () => void) => {
                if (!callback) return;
                let unsubBalance: Function | null = null;
                let unsubAccount: Function | null = null;
                let unsubChainId: Function | null = null;
                let unsubCurrentToken: Function | null = null;
                const clearUnsub = () => {
                    if (unsubBalance) {
                        unsubBalance();
                        unsubBalance = null;
                    }
                    if (unsubAccount) {
                        unsubAccount();
                        unsubAccount = null;
                    }
                    if (unsubChainId) {
                        unsubChainId();
                        unsubChainId = null;
                    }
                    if (unsubCurrentToken) {
                        unsubCurrentToken();
                        unsubCurrentToken = null;
                    }
                }
            
                if (walletStore) {
                    if (driver.isDependentOnAccount) {
                        unsubAccount = walletStore.subscribe(state => state.accounts, clearUnsub);
                    }
                    if (driver.isDependentOnChainId) {
                        unsubChainId = walletStore.subscribe(state => state.chainId, clearUnsub);
                    }
                }
            
                unsubBalance = balanceStore.subscribe(state => state.balance, () => {
                    callback();
                    clearUnsub();
                });
            },
            createDependentObject: ({ account, chainId }: { account?: string; chainId?: string; }) => ({
                _account: account,
                _chainId: chainId,
                get account() {
                    driver.isDependentOnAccount = true;
                    return this._account;
                },
                get chainId() {
                    driver.isDependentOnChainId = true;
                    return this._chainId;
                },
            })
        };

        return driver;
    });


    const subFunc = debounce(
        (
            [accounts, chainId]: readonly [Array<string> | undefined, string | undefined],
            [preAccounts, preChainId]: readonly [Array<string> | undefined, string | undefined],
        ) => {
            const account = accounts?.[0];
            const preAccount = preAccounts?.[0];
            const isAccountChanged = preAccount !== account;
            const isChainIdChanged = preChainId !== chainId;

            document.removeEventListener('focus', startTickFetch);
            subObjects.forEach((subObject, index) => {
                const subObjectDriver = subObjectsDriver[index];
                const isDependentOnAccount = subObjectDriver.isDependentOnAccount;
                const isDependentOnChainId = subObjectDriver.isDependentOnChainId;
                const shouldStartSetUndefinedTimer =
                    (isDependentOnAccount && isAccountChanged) || (isDependentOnChainId && isChainIdChanged);
                if (shouldStartSetUndefinedTimer) {
                    subObjectDriver.startSetUndefinedTimer((isDependentOnAccount && !account) || (isDependentOnChainId && !chainId));
                }

                subCenter.delete(subObject);
                if ((isDependentOnAccount && !account) || (isDependentOnChainId && !chainId)) return;
                setSubFetcher(
                    { subObject, subObjectDriver },
                    { 
                        wallet: subObjectDriver.createDependentObject({ account, chainId }),
                        dependency: subObjectDriver.store.getState().dependency
                    }
                );
            });
            tickFetchBalance();
            document.addEventListener('focus', startTickFetch);
        },
        16,
    );

    const startTrack = () => {
        const unSubWallet = walletStore.subscribe((state) => [state.accounts, state.chainId] as const, subFunc, { equalityFn: shallow, fireImmediately: true });
        subObjects.forEach((subObject, index) => {
            const subObjectDriver = subObjectsDriver[index];
            subObjectsDriver[index].store.subscribe((state) => state.dependency, (newDependency) => {
                if (!subObjectDriver.isDependentOnOuter) return;
    
                subObjectDriver.startSetUndefinedTimer(!newDependency);
                if (!newDependency === undefined) {
                    subCenter.delete(subObject);
                    return;
                }
    
                const account = walletStore.getState().accounts?.[0];
                const chainId = walletStore.getState().chainId;
    
                setSubFetcher(
                    { subObject, subObjectDriver },
                    { 
                        wallet: subObjectDriver.createDependentObject({ account, chainId }),
                        dependency: newDependency
                    }
                );
                tickFetchBalance();
            }, { equalityFn: isEqual, fireImmediately: true });
        });

        return () => {
            unSubWallet();
            subObjectsDriver.forEach(driver => {
                driver.store.destroy();
            });
        }
    }

    return [
        subObjectsDriver.map((subObjectDriver) => ({
            store: subObjectDriver.store,
            use: subObjectDriver.use,
            setDependency: subObjectDriver.setDependency,
            trackChangeOnce: subObjectDriver.trackChangeOnce
        })),
        startTrack
    ] as const;
};

function isPromise<T>(p: any): p is Promise<T> {
    return p !== null && typeof p === 'object' && typeof p.then === 'function';
}
