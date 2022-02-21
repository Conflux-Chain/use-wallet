import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { unstable_batchedUpdates } from 'react-dom';
import detectProvider from './detect-provider';
import Unit from './Unit';
import type { Provider, ProviderType, AddChainParameter, WatchAssetParams, TransactionParameters } from './types'

export interface WalletState {
    status: 'in-detecting' | 'not-installed' | 'not-active' | 'in-activating' | 'active';
    accounts?: Array<string>;
    chainId?: string;
    balance?: Unit;
}

class Wallet<T extends ProviderType> {
    private providerType: Capitalize<ProviderType>;
    private evtPrefix!: 'cfx' | 'eth';
    private balanceTimer: number | null = null;
    private resolveDetect!: () => void;
    private detectPromise = new Promise<void>((resolve) => this.resolveDetect = resolve);

    public provider?: Provider;
    public store = create(
        subscribeWithSelector(
            () =>
                ({
                    status: 'in-detecting',
                    accounts: undefined,
                    chainId: undefined,
                    balance: undefined,
                } as WalletState),
        ),
    );

    constructor(providerType: 'conflux', params?: { mustBeFluent?: boolean; silent?: boolean; timeout?: number });
    constructor(providerType: 'ethereum', params?: { mustBeMetaMask?: boolean; silent?: boolean; timeout?: number });
    constructor(providerType: T) {
        this.providerType = providerType === 'conflux' ? 'Conflux' : 'Ethereum';
        this.evtPrefix = providerPreFixMap[providerType];
        this.provider = (window as any)[providerType] as Provider;

        detectProvider(arguments[0], arguments[1])
            .then((provider) => {
                // Conflux Portal Wallet support
                if (provider.isConfluxPortal && (provider as any).send && !provider.request) {
                    this.provider!.request = ({ method, params }: any) => {
                        if (method === 'accounts') return Promise.resolve((this.provider as any).selectedAddress);
                        if (method === 'cfx_chainId') return Promise.resolve((this.provider as any).networkVersion);
                        return (this.provider as any)?.send(method, params);
                    }
                }

                this.batchGetInfo();
                this.subProvider();
            })
            .catch((err) => {
                console.error('detect error:', err);
                this.store.setState({ status: 'not-installed' });
                this.resolveDetect();
            })
    }

    private subProvider = async () => {
        this.store.subscribe(selectors.chainId, this.trackBalance);
        this.provider!.on('accountsChanged', () => this.batchGetInfo());
        this.provider!.on('chainChanged', () => this.batchGetInfo());
    };

    private handleAccountsChanged = (accounts?: string[]) => {
        const hasAccount = !!accounts?.[0];

        if (hasAccount) {
            this.store.setState({ status: 'active', accounts });
        } else {
            this.store.setState({ status: 'not-active', accounts, balance: undefined });
        }
    };

    private handleChainChanged = (chainId: string) => {
        if (!chainId || chainId === '0xNaN') {
            this.store.setState({ chainId: undefined, status: 'not-active', accounts: undefined, balance: undefined });
            return;
        }

        const preChainId = this.store.getState().chainId;
        if (preChainId !== chainId) {
            this.store.setState({ chainId: String(parseInt(chainId)), balance: undefined });
        }
    };

    private handleBalanceChanged = (newBalance?: Unit) => {
        if (!newBalance) return;
        const preBalance = this.store.getState().balance;

        if (preBalance === undefined || !preBalance.equalsWith(newBalance)) {
            this.store.setState({ balance: newBalance });
        }
    };

    // when connect or init, get account|chainId|balance batch, to reduce interface jitter.
    private batchGetInfo = async({ isRequestConnect }: { isRequestConnect: boolean; } = { isRequestConnect: false }) => {
        try {
            const [chainId, accounts] = await Promise.all([this.getChainId(), isRequestConnect ? this.requestAccounts() : this.getAccounts()]);
            
            // In very rare cases, the fullnode balance roc may crash, so the balance batch has to be dropped.
            let balanceTimeout: number | null = setTimeout(() => {
                balanceTimeout = null;
                unstable_batchedUpdates(() => {
                    this.handleAccountsChanged(accounts);
                    this.handleChainChanged(chainId);
                });
                this.resolveDetect();
            }, 1500);

            const balance = await this.getBalance(accounts);
            if (balanceTimeout !== null) {
                clearTimeout(balanceTimeout);
                unstable_batchedUpdates(() => {
                    this.handleAccountsChanged(accounts);
                    this.handleChainChanged(chainId);
                    this.store.setState({ balance });
                });
            }
        } catch (err) {
            console.error('batchGetInfo error: ', err);
            throw err;
        } finally {
            this.resolveDetect();
        }
    }

    private requestAccounts = () => {
        const preStatus = this.store.getState().status;
        if (preStatus !== 'active') {
            this.store.setState({ status: 'in-activating' });
        }

        const promise = this.provider!.request({ method: `${this.evtPrefix}_requestAccounts` })
        promise.catch(() => this.store.setState({ status: 'not-active' }));
        return promise;
    };

    private getAccounts = () => this.provider!.request({ method: `${this.evtPrefix}_accounts` });
    private getChainId = () => this.provider!.request({ method: `${this.evtPrefix}_chainId` });

    private getBalance = async (accounts?: Array<string>) => {
        const account = accounts ? accounts[0] : this.store.getState().accounts?.[0];
        if (!account) return;

        try {
            const minUnitBalance = await this.provider!.request({
                method: `${this.evtPrefix}_getBalance`,
                params: [account, this.evtPrefix === 'cfx' ? 'latest_state' : 'latest'],
            });
            
            return Unit.fromMinUnit(minUnitBalance);
        } catch (err) {
            console.error('Get balance error: ', err);
            throw err;
        }
    };

    private checkConnected = () => {
        const account = this.store.getState().accounts?.[0];
        if (!account) {
            throw new Error('Operate error: request connect to wallet.');
        }
        return account;
    }

    private trackBalance = () => {
        const account = this.store.getState().accounts?.[0];

        const clearTimer = () => {
            if (typeof this.balanceTimer === 'number') {
                clearInterval(this.balanceTimer);
                this.balanceTimer = null;
            }
        }

        if (!account) {
            this.store.setState({ balance: undefined });
            clearTimer();
            return;
        }

        clearTimer();

        const getAndSetBalance = () => this.getBalance().then(balance => this.handleBalanceChanged(balance));
        getAndSetBalance();

        this.balanceTimer = setInterval(getAndSetBalance, 1500);
    };



    /* <--------- func ---------> */
    public connect = () => {
        const currentStatus = this.store.getState().status;
        if (currentStatus !== 'not-active') {
            if (currentStatus === 'active')
                return Promise.resolve();
            else
                throw new Error(`currentStatus can't activate`);
        }
        return this.batchGetInfo({ isRequestConnect: true });
    }

    public sendTransaction = (params: Omit<TransactionParameters, 'from'>) => {
        const account = this.checkConnected();

        if (typeof params !== 'object') {
            throw new Error('sendTransaction error: params must be object.');
        }

        return this.provider!.request({
            method: `${this.evtPrefix}_sendTransaction`,
            params: [{
                ...params,
                ...(params.value ? {} : { value: '0x0' }),
                from: account,
            }],
        });
    }

    public personalSign = (message: string) => {
        const account = this.checkConnected();

        return this.provider!.request({
            method: 'personal_sign',
            params: [message, account]
        });
    }

    public typedSign = (typedData: Record<string, any>) => {
        const account = this.checkConnected();

        if (typeof typedData !== 'object') {
            throw new Error('typedSign error: typedData must be object.');
        }

        return this.provider!.request({
            method: `${this.evtPrefix}_signTypedData_v4`,
            params: [account, JSON.stringify(typedData)]
        });
    }

    public addChain = (param: AddChainParameter) => {
        return this.provider!.request({
            method: `wallet_add${this.providerType}Chain`,
            params: [param]
        });
    }

    public switchChain = (chainId: string) => {
        return this.provider!.request({
            method: `wallet_switch${this.providerType}Chain`,
            params: [{ chainId }]
        });
    }

    public watchAsset = (param: WatchAssetParams) => {
        if (!param) {
            throw new Error('watchAsset error: param must be object.');
        }

        return this.provider!.request({
            method: 'wallet_watchAsset',
            params: param
        });
    }



    /* <--------- utils ---------> */
    public trackBalanceChangeOnce = (callback: () => void) => {
        if (!callback) return;
        let unsubBalance: Function | null = null;
        let unsubAccount: Function | null = null;
        unsubAccount = this.store.subscribe(selectors.accounts, () => {
            if (!unsubAccount) return;
            if (unsubBalance) {
                unsubBalance();
            }
            unsubAccount();
            unsubAccount = null;
        });
        unsubBalance = this.store.subscribe(selectors.balance, () => {
            if (!unsubBalance) return;
            callback();
            unsubBalance();
            unsubBalance = null;
        });
    }



    /* <--------- hooks ---------> */
    public useStatus = () => this.store(selectors.status);
    public useAccount = () => this.store(selectors.account);
    public useChainId = () => this.store(selectors.chainId);
    public useBalance = () => this.store(selectors.balance);


    /* <--------- other ---------> */
    public completeDetect = () => this.detectPromise;
}

const selectors = {
    status: (state: WalletState) => state.status,
    accounts: (state: WalletState) => state.accounts,
    account: (state: WalletState) => state.accounts?.[0],
    chainId: (state: WalletState) => state.chainId,
    balance: (state: WalletState) => state.balance,
};

const providerPreFixMap = {
    conflux: 'cfx',
    ethereum: 'eth',
} as const;

export default Wallet;