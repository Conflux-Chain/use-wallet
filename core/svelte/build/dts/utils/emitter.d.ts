import Unit from './unit';

declare abstract class RPCMethod {
    abstract provider: any;
    abstract detectProvider(): Promise<any>;
    abstract requestAccounts(): Promise<Array<string>>;
    abstract getAccounts(): Promise<Array<string>>;
    abstract getChainId(): Promise<string>;
    abstract getBalance(account: string): Promise<string>;
    abstract onAccountsChange(callback: (accounts?: Array<string>) => void): void;
    abstract onChainIdChange(callback: (chainId?: string) => void): void;
    abstract sendTransaction(params: any): Promise<any>;
}
export declare type State = {
    status: 'in-detecting' | 'not-installed' | 'not-active' | 'in-activating' | 'active' | 'chain-error';
    accounts: Array<string> | undefined;
    chainId: string | undefined;
    balance: Unit | undefined;
};
declare class Emitter<T extends RPCMethod> {
    private emitter;
    private state;
    private trackBalanceInterval?;
    private RPCMethod;
    private resolveDetect;
    private detectPromise;
    constructor(RPCMethod: T);
    private handleStateChange;
    private handleStatusChanged;
    private handleAccountsChanged;
    private handleChainChanged;
    private handleBalanceChanged;
    private batchGetInfo;
    private checkConnected;
    on: {
        <Key extends keyof State>(type: Key, handler: import("./mitt").Handler<State[Key]>): void;
        (type: "*", handler: import("./mitt").WildcardHandler<State>): void;
    };
    off: {
        <Key extends keyof State>(type: Key, handler?: import("./mitt").Handler<State[Key]> | undefined): void;
        (type: "*", handler: import("./mitt").WildcardHandler<State>): void;
    };
    clear: () => void;
    completeDetect: () => Promise<void>;
    startTrackBalance: () => void;
    stopTrackBalance: () => void;
    connect: () => Promise<void>;
    sendTransaction: T['sendTransaction'];
}
export default Emitter;
