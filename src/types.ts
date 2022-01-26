export type ProviderType = 'conflux' | 'ethereum';
type PreFixType = 'cfx' | 'eth';
type Events = 'chainChanged' | 'accountsChanged' | 'connect' | 'disconnect';

interface ProviderRpcError extends Error {
    message: string;
    code: number;
    data?: unknown;
}

export interface Provider<T extends ProviderType = 'conflux'> {
    isConnected(): boolean;
    on(event: 'connect', cb: (param: { chainId: string; networkId: number }) => void): void;
    on(event: 'disconnect', cb: (a: any) => void): void;
    on(event: 'accountsChanged', cb: (accounts: Array<string>) => void): void;
    on(event: 'chainChanged', cb: (chainId: string) => void): void;
    off(event: Events, cb: Function): void;
    request(args: { method: `${PreFixType}_accounts` }): Promise<Array<string>>;
    request(args: { method: `${PreFixType}_requestAccounts` }): Promise<Array<string>>;
    request(args: { method: `${PreFixType}_chainId` }): Promise<string>;
    request(args: { method: `${PreFixType}_sendTransaction`; params: [{ from: string; to: string; value: string; data?: string }] }): Promise<any>;
    request(args: { method: `${PreFixType}_getBalance`; params: [string, 'latest' | 'latest_state'] }): Promise<string>;
    request(args: { method: 'personal_sign'; params: [string, string] }): Promise<any>;
    request(args: { method: `wallet_add${Capitalize<T>}Chain`; params: any }): Promise<any>;
    request(args: { method: `wallet_switch${Capitalize<T>}Chain`; params: [{ chainId: string }] }): Promise<any>;

    isFluent?: boolean;
    isMetaMask?: boolean;
}