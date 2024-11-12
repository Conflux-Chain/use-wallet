import Emitter from '../../emitter';
import RPCMethod, { type CustomDetectConfig } from '../../emitter/RPCMethod';
import detectProvider from '../../detect';
import type { Provider, TransactionParameters, AddChainParameter, WatchAssetParams, TypedSignParams } from './type';

export class ConfluxRPCMethod extends RPCMethod {
    sessionKey = 'conflux';
    injectFlag = 'conflux';
    declare provider: Provider;
    subTimeout = 5000;

    detectProvider = (config: CustomDetectConfig = {}) => {
        const p = detectProvider<Provider>({ injectFlag: this.injectFlag, ...config });

        // Conflux Portal Wallet support
        p.then((provider) => {
            if (provider.isConfluxPortal && (provider as any).send && !provider.request) {
                this.provider!.request = ({ method, params }: any) => {
                    if (method === 'accounts') return Promise.resolve((this.provider as any).selectedAddress);
                    if (method === 'cfx_chainId') return Promise.resolve((this.provider as any).networkVersion);
                    return (this.provider as any)?.send(method, params);
                };
            }
        });

        return p;
    };

    requestAccounts = () => this.provider!.request({ method: 'cfx_requestAccounts' });

    getAccounts = () => this.provider!.request({ method: 'cfx_accounts' });

    getChainId = () => this.provider!.request({ method: 'cfx_chainId' });

    getBalance = async () => {
        if (!this.account) throw new Error('getBalance error: must connect to wallet');

        try {
            const minUnitBalance = await this.provider!.request({
                method: 'cfx_getBalance',
                params: [this.account, 'latest_state'],
            });

            return minUnitBalance;
        } catch (err) {
            throw err;
        }
    };

    onAccountsChange = (callback: (accounts: Array<string>) => void) => this.provider!.on('accountsChanged', callback);

    onChainIdChange = (callback: (chainId: string) => void) => this.provider!.on('chainChanged', callback);

    sendTransaction = (params: Omit<TransactionParameters, 'from'>) =>
        this.provider!.request({
            method: 'cfx_sendTransaction',
            params: [params],
        });

    personalSign = (message: string) =>
        this.provider!.request({
            method: 'personal_sign',
            params: [message, this.account],
        });

    typedSign = (typedData: TypedSignParams) =>
        this.provider!.request({
            method: 'cfx_signTypedData_v4',
            params: [this.account, JSON.stringify(typedData)],
        });

    addChain = (param: AddChainParameter) =>
        this.provider!.request({
            method: 'wallet_addConfluxChain',
            params: [param],
        });

    switchChain = (chainId: string) =>
        this.provider!.request({
            method: 'wallet_switchConfluxChain',
            params: [{ chainId }],
        });

    watchAsset = (param: WatchAssetParams) =>
        this.provider!.request({
            method: 'wallet_watchAsset',
            params: param,
        });

    requestPermissions = (params: Record<string, any>) =>
        this.provider!.request({
            method: 'wallet_requestPermissions',
            params: [params!],
        });
}

export default new Emitter(new ConfluxRPCMethod());
