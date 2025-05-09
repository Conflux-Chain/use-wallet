import Unit from '../../utils/unit';
import { type State } from '../../utils/emitter';
import type { EIP6963ProviderDetail, TransactionParameters, TypedSignParams, AddChainParameter, WatchAssetParams, Provider, ProviderInfo } from '../type';

type Write<T extends object, U extends object> = Omit<T, keyof U> & U;
type StoreSubscribeWithSelector<T extends State> = {
    subscribe: {
        (listener: (selectedState: T, previousSelectedState: T) => void): () => void;
        <U>(
            selector: (state: T) => U,
            listener: (selectedState: U, previousSelectedState: U) => void,
            options?: {
                equalityFn?: (a: U, b: U) => boolean;
                fireImmediately?: boolean;
            }
        ): () => void;
    };
};

export interface EIP6963Emitter {
    store: import('zustand').UseBoundStore<Write<import('zustand').StoreApi<State>, StoreSubscribeWithSelector<State>>>;
    useStatus: () => 'in-detecting' | 'not-installed' | 'not-active' | 'in-activating' | 'active' | 'chain-error';
    useChainId: () => string | undefined;
    useAccount: () => string | undefined;
    useBalance: () => Unit | undefined;
    connect: () => Promise<string[]>;
    sendTransaction: (params: Omit<TransactionParameters, 'from'>) => Promise<string>;
    personalSign: (message: string) => Promise<string>;
    typedSign: (typedData: TypedSignParams) => Promise<string>;
    addChain: (params: AddChainParameter, needConnected?: boolean) => Promise<string>;
    switchChain: (chainId: string) => Promise<string>;
    watchAsset: (param: WatchAssetParams) => Promise<string>;
    provider: Provider | undefined;
    startTrackBalance: (interval?: number) => void;
    stopTrackBalance: () => void;
    trackBalanceChangeOnce: (callback: VoidFunction) => void;
    completeDetect: () => Promise<void>;
    requestPermissions: (params: Record<string, any>) => Promise<Record<string, string>>;
    requestCrossNetworkPermission: () => Promise<Record<string, string>>;
    setCrossNetworkChain: (chainId?: string) => void;
    providerInfo: ProviderInfo | undefined;
}

export default function createEIP6963Emitter(providerDetail: EIP6963ProviderDetail): EIP6963Emitter;

export { Unit };