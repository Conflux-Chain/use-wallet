export type ProviderType = 'conflux' | 'ethereum';
type PreFixType = 'cfx' | 'eth';
type Events = 'chainChanged' | 'accountsChanged' | 'connect' | 'disconnect';

export interface ProviderRpcError extends Error {
    message: string;
    code: number;
    data?: unknown;
}

export interface AddChainParameter {
    chainId: string; // A 0x-prefixed hexadecimal string
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string; // 2-6 characters long
        decimals: 18;
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
    iconUrls?: string[]; // Currently ignored.
}

export interface WatchAssetParams {
    type: 'ERC20'; // In the future, other standards will be supported
    options: {
        address: string; // The address of the token contract
        symbol: string; // A ticker symbol or shorthand, up to 5 characters
        decimals: number; // The number of token decimals
        image: string; // A string url of the token logo
    };
}

export interface TransactionParameters {
    gasPrice?: string; // customizable by user during MetaMask confirmation.
    gas?: string; // customizable by user during MetaMask confirmation.
    to?: string; // Required except during contract publications.
    from?: string; // must match user's active address.
    value?: string; // Only required to send ether to the recipient from the initiating external account.
    data?: string; // Optional, but used for defining smart contract creation and interaction.
}

export interface Provider {
    isConnected(): boolean;
    on(event: 'connect', cb: (param: { chainId: string; networkId: number }) => void): void;
    on(event: 'disconnect', cb: (a: any) => void): void;
    on(event: 'accountsChanged', cb: (accounts: Array<string>) => void): void;
    on(event: 'chainChanged', cb: (chainId: string) => void): void;
    off(event: Events, cb: Function): void;
    request(args: { method: `${PreFixType}_accounts` }): Promise<Array<string>>;
    request(args: { method: `${PreFixType}_requestAccounts` }): Promise<Array<string>>;
    request(args: { method: `${PreFixType}_chainId` }): Promise<string>;
    request(args: { method: `${PreFixType}_sendTransaction`; params: [TransactionParameters] }): Promise<string>;
    request(args: { method: `${PreFixType}_getBalance`; params: [string, 'latest' | 'latest_state'] }): Promise<string>;
    request(args: { method: `${PreFixType}_call`; params: [TransactionParameters, 'latest' | 'latest_state'] }): Promise<string>;
    request(args: { method: 'personal_sign'; params: [string, string] }): Promise<string>;
    request(args: { method: `${PreFixType}_signTypedData_v4`; params: [string, string] }): Promise<string>;
    request(args: { method: `wallet_add${Capitalize<ProviderType>}Chain`; params: [AddChainParameter] }): Promise<null>;
    request(args: { method: `wallet_switch${Capitalize<ProviderType>}Chain`; params: [{ chainId: string }] }): Promise<null>;
    request(args: { method: `wallet_watchAsset`; params: { type: string; options: Record<string, any> } }): Promise<boolean>;
    request(args: { method: `eth_estimateGas`; params: [TransactionParameters] }): Promise<string>;
    request(args: { method: `eth_gasPrice`; params: [] }): Promise<string>;
    isFluent?: boolean;
    isMetaMask?: boolean;
    isConfluxPortal?: boolean;
}
