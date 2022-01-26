import Unit from '../Unit';
export declare const detect: () => Promise<void>;
export declare const connect: () => Promise<void>;
export declare const sendTransaction: ({ from, to, value, data }: {
    from?: string | undefined;
    to: string;
    value: string;
    data?: string | undefined;
}) => Promise<any>;
export declare const trackBalanceChangeOnce: (callback: () => void) => void;
export declare const useStatus: () => "in-detecting" | "not-installed" | "not-active" | "in-activating" | "active";
export declare const useAccount: () => string | undefined;
export declare const useChainId: () => string | undefined;
export declare const useBalance: () => Unit | undefined;
export declare const useMaxAvailableBalance: () => Unit | undefined;
export { Unit };
