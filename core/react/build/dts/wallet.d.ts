import Unit from '../../utils/unit';
import { type State } from '../../utils/emitter';
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
export declare const store: import('zustand').UseBoundStore<Write<import('zustand').StoreApi<State>, StoreSubscribeWithSelector<State>>>;
export declare const useStatus: () => 'in-detecting' | 'not-installed' | 'not-active' | 'in-activating' | 'active' | 'chain-error';
export declare const useChainId: () => string | undefined;
export declare const useAccount: () => string | undefined;
export declare const useBalance: () => Unit | undefined;
export declare const connect: () => Promise<string[]>;
export declare const sendTransaction: (params: Omit<import('./type').TransactionParameters, 'from'>) => Promise<string>;
export declare const personalSign: (message: string) => Promise<string>;
export declare const typedSign: (typedData: import('./type').TypedSignParams) => Promise<string>;
export declare const addChain: (params: import('./type').AddChainParameter) => Promise<string>;
export declare const switchChain: (chainId: string) => Promise<string>;
export declare const watchAsset: (param: import('./type').WatchAssetParams) => Promise<string>;
export declare const provider: import('./type').Provider | undefined;
export declare const startTrackBalance: (interval?: number) => void;
export declare const stopTrackBalance: () => void;
export declare const trackBalanceChangeOnce: (callback: VoidFunction) => void;
export declare const completeDetect: () => Promise<void>;
export declare const requestPermissions: (params: Record<string, any>) => Promise<Record<string, string>>;
export declare const requestCrossNetworkPermission: () => Promise<Record<string, string>>;
export declare const setCrossNetworkChain: (chainId?: string) => void;

export { Unit };
