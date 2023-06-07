import Emitter from '../../emitter';
import RPCMethod from '../../emitter/RPCMethod';
import detectProvider from '../../detect';
import type { Provider, TransactionParameters, AddChainParameter, WatchAssetParams, TypedSignParams } from './type';

export class EthereumRPCMethod extends RPCMethod {
    declare provider: Provider;

    detectProvider = () => detectProvider<Provider>({ injectFlag: 'ethereum', defaultWaltFlag: 'isMetaMask' });

    requestAccounts = () => this.provider!.request({ method: 'eth_requestAccounts' });

    getAccounts = () => this.provider!.request({ method: 'eth_accounts' });

    getChainId = () => this.provider!.request({ method: 'eth_chainId' });

    getBalance = async () => {
        if (!this.account) throw new Error('getBalance error: must connect to wallet');

        try {
            const minUnitBalance = await this.provider!.request({
                method: 'eth_getBalance',
                params: [this.account, 'latest'],
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
            method: 'eth_sendTransaction',
            params: [params],
        });

    personalSign = (message: string) =>
        this.provider!.request({
            method: 'personal_sign',
            params: [message, this.account],
        });

    typedSign = (typedData: TypedSignParams) =>
        this.provider!.request({
            method: 'eth_signTypedData_v4',
            params: [this.account, JSON.stringify(typedData)],
        });

    addChain = (param: AddChainParameter) =>
        this.provider!.request({
            method: 'wallet_addEthereumChain',
            params: [param],
        });

    switchChain = (chainId: string) =>
        this.provider!.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId }],
        });

    watchAsset = (param: WatchAssetParams) =>
        this.provider!.request({
            method: 'wallet_watchAsset',
            params: param,
        });

    isHostedByFluent = () => this.provider! === (window as any).conflux;

    requestPermissions = (params: Record<string, any>) =>
        this.provider!.request({
            method: 'wallet_requestPermissions',
            params: [params!],
        });

    requestCrossNetworkPermission = () => {
        if (this.isHostedByFluent()) {
            return this.provider!.request({
                method: 'wallet_requestPermissions',
                params: [{ wallet_accounts: {}, wallet_crossNetworkTypeGetConfluxBase32Address: {}, wallet_crossNetworkTypeGetEthereumHexAddress: {} }],
            });
        }

        return Promise.reject();
    };
}

export default new Emitter(new EthereumRPCMethod());
