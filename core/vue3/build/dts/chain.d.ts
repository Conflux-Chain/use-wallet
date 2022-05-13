import { type State } from '../utils/emitter';
import Unit from '../utils/unit';
export declare const store: import("vue").ShallowReactive<State>;
export declare const useStatus: () => Readonly<import("vue").Ref<"in-detecting" | "not-installed" | "not-active" | "in-activating" | "active" | "chain-error">>;
export declare const useChainId: () => Readonly<import("vue").Ref<string | undefined>>;
export declare const useAccount: () => Readonly<import("vue").Ref<string | undefined>>;
export declare const useBalance: () => Readonly<import("vue").Ref<{
    readonly equalsWith: (another: Unit) => boolean;
    readonly toDecimalStandardUnit: (toFixed?: number | undefined, decimals?: number) => string;
    readonly toHexStandardUnit: (decimals?: number | undefined) => string;
    readonly toDecimalMinUnit: () => string;
    readonly toHexMinUnit: () => string;
    readonly [Symbol.toPrimitive]: (hint: "string" | "number" | "default") => string | import("decimal.js").default;
} | undefined>>;
export declare const connect: () => Promise<string[]>;
export declare const sendTransaction: (params: Omit<import("./type").TransactionParameters, "from">) => Promise<string>;
export declare const personalSign: (message: string) => Promise<string>;
export declare const typedSign: (typedData: Record<string, any>) => Promise<string>;
export declare const addChain: (params: import("./type").AddChainParameter) => Promise<string>;
export declare const switchChain: (chainId: string) => Promise<string>;
export declare const watchAsset: (param: import("./type").WatchAssetParams) => Promise<string>;
export declare const provider: import("./type").Provider | undefined;
export declare const trackBalanceChangeOnce: (callback: VoidFunction) => void;
export declare const completeDetect: () => Promise<void>;
export declare const requestPermissions: (params: Record<string, any>) => Promise<Record<string, string>>
export declare const requestCrossNetworkPermission: () => Promise<Record<string, string>>;
export declare const setCrossNetworkChain: (chainId?: string) => void;

export { Unit };
