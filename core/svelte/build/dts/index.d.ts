import Unit from '../utils/unit';
import { type State } from '../utils/emitter';
export declare const store: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<State>, "subscribe"> & {
    subscribe: {
        (listener: (selectedState: State, previousSelectedState: State) => void): () => void;
        <U>(selector: (state: State) => U, listener: (selectedState: U, previousSelectedState: U) => void, options?: {
            equalityFn?: ((a: U, b: U) => boolean) | undefined;
            fireImmediately?: boolean | undefined;
        } | undefined): () => void;
    };
}>;
export declare const useStatus: () => "in-detecting" | "not-installed" | "not-active" | "in-activating" | "active" | "chain-error";
export declare const useChainId: () => string | undefined;
export declare const useAccount: () => string | undefined;
export declare const useBalance: () => Unit | undefined;
export declare const connect: () => Promise<void>;
export declare const sendTransaction: (params: Omit<import("./type").TransactionParameters, "from">) => Promise<string>;
export { Unit };
