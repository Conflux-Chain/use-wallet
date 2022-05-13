
abstract class RPCMethod {
    abstract provider: any;
    account!: string;
    abstract detectProvider(): Promise<any>;
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

    detectAndSetProvider = () => {
        const p = this.detectProvider();
        p.then(provider => this.provider = provider);
        return p;
    }

    setAccounts = (accounts: Array<string>) => {
        this.account = accounts?.[0];
    }

    getProvider = () => this.provider;
}

export default RPCMethod;