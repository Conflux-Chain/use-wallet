import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Unit, type store } from '@cfxjs/use-wallet-react/conflux';

export interface Params {
    createTransaction: ({ balance, account, chainId }: { balance: Unit, account: string; chainId: string; }) => Partial<Record<'to' | 'data' | 'value', string>> | false | null | undefined;
    store: typeof store;
    rpcUrl: string;
    estimate: (params: any, conf: { rpcUrl: string; store: typeof store }) => Promise<string>;
}

export interface MaxAvailableBalanceStore {
    maxAvailableBalance?: Unit;
}
const maxAvailableBalanceStoreSelector = (state: MaxAvailableBalanceStore) => state.maxAvailableBalance;

export default function createMaxAvailableBalanceTracker({ createTransaction, store, rpcUrl, estimate }: Params) {
    const maxAvailableBalanceStore = create(subscribeWithSelector<MaxAvailableBalanceStore>(() => ({ maxAvailableBalance: undefined })));

    const startTrack = () => {
        return store.subscribe(
            (state) => state.balance,
            (balance) => {
                if (!balance) {
                    maxAvailableBalanceStore.setState({ maxAvailableBalance: undefined });
                } else {
                    const { accounts, chainId } = store.getState();
                    const transaction = createTransaction({ balance, account: accounts?.[0]!, chainId: chainId! });
                    if (typeof transaction !== 'object') {
                        maxAvailableBalanceStore.setState({ maxAvailableBalance: undefined });
                    } else {
                        estimate(transaction, { store, rpcUrl })
                        .then((maxAvailableBalance) => {
                            maxAvailableBalanceStore.setState({ maxAvailableBalance: Unit.fromMinUnit(maxAvailableBalance) })
                        })
                        .catch(() => {
                            maxAvailableBalanceStore.setState({ maxAvailableBalance: undefined });
                        });
                    }
                }
            },
            { fireImmediately: true }
        );
    };

    return [
        {
            store: maxAvailableBalanceStore,
            use: () => maxAvailableBalanceStore(maxAvailableBalanceStoreSelector),
        },
        startTrack,
    ] as const;
}