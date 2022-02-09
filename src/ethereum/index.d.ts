import Unit from '../Unit';
import type { Provider, AddChainParameter, WatchAssetParams } from '../types';

export declare const provider: Provider;
export declare const completeDetect: () => Promise<void>;
export declare const connect: () => Promise<void>;
export declare const sendTransaction: ({
    from,
    to,
    value,
    data,
}: {
    from?: string | undefined;
    to: string;
    value: string;
    data?: string | undefined;
}) => Promise<any>;
export declare const addChain: (param: AddChainParameter) => Promise<null>;
export declare const switchChain: (chainId: string) => Promise<null>;
export declare const watchAsset: (param: WatchAssetParams) => Promise<boolean>;
export declare const personalSign: (message: string) => Promise<any>;
export declare const typedSign: (typedData: Object) => Promise<any>;
export declare const trackBalanceChangeOnce: (callback: () => void) => void;
export declare const useStatus: () => 'in-detecting' | 'not-installed' | 'not-active' | 'in-activating' | 'active';
export declare const useAccount: () => string | undefined;
export declare const useChainId: () => string | undefined;
export declare const useBalance: () => Unit | undefined;
export { Unit };
