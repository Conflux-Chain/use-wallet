import type { DetectProviderConfig } from '../detect';

export type CustomDetectConfig = Omit<DetectProviderConfig, 'walletFlag' | 'isSingleWalletFlag' | 'injectFlag' | 'defaultWalletFlag'>;

abstract class RPCMethod {
    abstract sessionKey: string;
    abstract injectFlag: string;
    abstract provider: any;
    account!: string;
    abstract detectProvider(config?: CustomDetectConfig): Promise<any>;
    abstract requestAccounts(): Promise<Array<string>>;
    abstract getAccounts(): Promise<Array<string>>;
    abstract getChainId(): Promise<string>;
    abstract getBalance(): Promise<string>;
    abstract onAccountsChange(callback: (accounts?: Array<string>) => void): void;
    abstract onChainIdChange(callback: (chainId?: string) => void): void;
    abstract sendTransaction(params: any): Promise<any>;
    abstract personalSign(params: any): Promise<any>;
    abstract typedSign(params: any): Promise<any>;
    abstract addChain(params: any): Promise<any>;
    abstract switchChain(params: any): Promise<any>;
    abstract watchAsset(params: any): Promise<any>;
    requestPermissions?(params: any): Promise<any>;
    requestCrossNetworkPermission?(): Promise<any>;
    crossNetworkChain?: string;
    retryLimit = 2;
    detectTimeout = 1500;
    subTimeout = 1000;
    subInterval = 100;

    detectAndSetProvider = (config?: CustomDetectConfig) => {
        const p = this.detectProvider(config);
        p.then((provider) => (this.provider = provider)).catch((err) => console.warn(err));
        return p;
    };

    subProvider = () => {
        return this.detectAndSetProvider({
            timeout: this.subTimeout,
            interval: this.subInterval,
        });
    };

    setAccounts = (accounts: Array<string>) => {
        this.account = accounts?.[0];
    };

    getProvider = () => this.provider;
}

export default RPCMethod;
