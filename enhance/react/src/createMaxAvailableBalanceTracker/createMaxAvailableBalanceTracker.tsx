import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Unit, type store } from '@cfxjs/use-wallet-react/conflux';

export interface Params {
    crateTransaction: (currentBalance: Unit) => Partial<Record<'to' | 'data' | 'value', string>>;
    store: typeof store;
    rpcUrl: string;
    estimate: (params: any, conf: { rpcUrl: string; store: typeof store }) => Promise<string>;
}

export interface MaxAvailableBalanceStore {
    maxAvailableBalance?: Unit;
}
const maxAvailableBalanceStoreSelector = (state: MaxAvailableBalanceStore) => state.maxAvailableBalance;

export default function createMaxAvailableBalanceTracker({ crateTransaction, store, rpcUrl, estimate }: Params) {
    const maxAvailableBalanceStore = create(subscribeWithSelector<MaxAvailableBalanceStore>(() => ({ maxAvailableBalance: undefined })));

    const startTrack = () => {
        return store.subscribe(
            (state) => state.balance,
            (balance) => {
                if (!balance) {
                    maxAvailableBalanceStore.setState({ maxAvailableBalance: undefined });
                } else {
                    estimate(crateTransaction(balance), { store, rpcUrl })
                        .then((maxAvailableBalance) => maxAvailableBalanceStore.setState({ maxAvailableBalance: Unit.fromMinUnit(maxAvailableBalance) }))
                        .catch(() => maxAvailableBalanceStore.setState({ maxAvailableBalance: undefined }));
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
