abstract class RPCMethod {
    abstract sessionKey: string;
    abstract injectFlag: string;
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
    retryLimit = 2;
    detectTimeout = 1500;

    detectAndSetProvider = () => {
        const p = this.detectProvider();
        p.then((provider) => (this.provider = provider)).catch((err) => console.warn(err));
        return p;
    };

    subProvider = () => {
        if (this.provider) return Promise.resolve(this.provider);
        return new Promise((resolve, reject) => {
            let hasValue = false;
            let value = window[this.injectFlag as any] as any;
            Object.defineProperty(window, this.injectFlag, {
                get: () => value,
                set: (provider: any) => {
                    value = provider;
                    if (this.provider || hasValue) {
                        reject();
                        return;
                    }
                    if (value) {
                        hasValue = true;
                        this.detectAndSetProvider().then(resolve, reject);
                    }
                },
            });
        });
    };

    setAccounts = (accounts: Array<string>) => {
        this.account = accounts?.[0];
    };

    getProvider = () => this.provider;
}

export default RPCMethod;
