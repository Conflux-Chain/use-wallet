import Unit from '../Unit';
import type { Provider, AddChainParameter, WatchAssetParams, TransactionParameters } from '../types';
import Wallet from '../Wallet';
import { type WalletState } from '../Wallet';

export declare const store: import("zustand").UseBoundStore<WalletState, Omit<import("zustand").StoreApi<WalletState>, "subscribe"> & {
    subscribe: {
        (listener: import("zustand").StateListener<WalletState>): () => void;
        <StateSlice>(selector: import("zustand").StateSelector<WalletState, StateSlice>, listener: import("zustand").StateSliceListener<StateSlice>, options?: {
            equalityFn?: import("zustand").EqualityChecker<StateSlice> | undefined;
            fireImmediately?: boolean | undefined;
        } | undefined): () => void;
    };
}>;
export declare const provider: Provider | undefined;
export declare const completeDetect: () => Promise<void>;
export declare const connect: () => Promise<void>;
export declare const sendTransaction: (params: Omit<TransactionParameters, "from">) => Promise<string>;
export declare const addChain: (param: AddChainParameter) => Promise<null>;
export declare const switchChain: (chainId: string) => Promise<null>;
export declare const watchAsset: (param: WatchAssetParams) => Promise<boolean>;
export declare const personalSign: (message: string) => Promise<any>;
export declare const typedSign: (typedData: Record<string, any>) => Promise<string>;
export declare const trackBalanceChangeOnce: (callback: () => void) => void;
export declare const useStatus: () => 'in-detecting' | 'not-installed' | 'not-active' | 'in-activating' | 'active';
export declare const useAccount: () => string | undefined;
export declare const useChainId: () => string | undefined;
export declare const useBalance: () => Unit | undefined;
export { Unit };
export default Wallet;
