type Events = 'chainChanged' | 'accountsChanged' | 'connect' | 'disconnect';

export interface ProviderInfo {
    uuid: string;
    name: string;
    icon: string;
    rdns: string;
};

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
        decimals: number;
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
    storageLimit?: string;
    nonce?: string;
}

export interface TypedSignParams {
    domain: {
        chainId?: number | string;
        name?: string; // A user-friendly name to the specific contract you're signing for.
        verifyingContract?: string; // Add a verifying contract to make sure you're establishing contracts with the proper entity.
        version?: string; // This identifies the latest version.
    };
    message: {};
    primaryType: string; // This refers to the keys of the following types object.
    types: {
        CIP23Domain: Array<{ name: string; type: string }>; // This refers to the domain the contract is hosted on.
    } & Record<string, Array<{ name: string; type: string }>>;
}

export interface Provider {
    isConnected(): boolean;
    on(event: 'connect', cb: (param: { chainId: string; networkId: number }) => void): void;
    on(event: 'disconnect', cb: (a: any) => void): void;
    on(event: 'accountsChanged', cb: (accounts: Array<string>) => void): void;
    on(event: 'chainChanged', cb: (chainId: string) => void): void;
    off(event: Events, cb: Function): void;
    request(args: { method: `cfx_accounts`; params?: { chainId: string } }): Promise<Array<string>>;
    request(args: {
        method: `cfx_requestAccounts`;
        params?: [{ wallet_crossNetworkTypeGetConfluxBase32Address: {}; wallet_crossNetworkTypeGetEthereumHexAddress: {} }];
    }): Promise<Array<string>>;
    request(args: { method: `cfx_chainId` }): Promise<string>;
    request(args: { method: `cfx_sendTransaction`; params: [TransactionParameters] }): Promise<string>;
    request(args: { method: `cfx_getBalance`; params: [string, 'latest_state'] }): Promise<string>;
    request(args: { method: `cfx_call`; params: [TransactionParameters, 'latest_state'] }): Promise<string>;
    request(args: { method: 'personal_sign'; params: [string, string] }): Promise<string>;
    request(args: { method: `cfx_signTypedData_v4`; params: [string, string] }): Promise<string>;
    request(args: { method: `wallet_addConfluxChain`; params: [AddChainParameter] }): Promise<null>;
    request(args: { method: `wallet_switchConfluxChain`; params: [{ chainId: string }] }): Promise<null>;
    request(args: { method: `wallet_watchAsset`; params: { type: string; options: Record<string, any> } }): Promise<boolean>;
    request(args: { method: `wallet_requestPermissions`; params: [Record<string, any>] }): Promise<Record<string, string>>;
    isConfluxPortal?: boolean;
}
