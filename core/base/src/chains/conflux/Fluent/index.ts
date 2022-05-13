import Emitter from '../../../emitter';
import detectProvider from '../../../detect';
import { ConfluxRPCMethod } from '../index';
import type { Provider } from '../type';

class FluentRPCMethod extends ConfluxRPCMethod {
    detectProvider = () => detectProvider<Provider>({ injectFlag: 'conflux', walletFlag: 'isFluent' });

    getAccounts = () =>
        this.provider!.request({
            method: 'cfx_accounts',
            ...(typeof this.crossNetworkChain === 'string' ? { params: { chainId: this.crossNetworkChain } } : {}),
        });

    requestCrossNetworkPermission = () =>
        this.provider!.request({
            method: 'wallet_requestPermissions',
            params: [{ wallet_accounts: {}, wallet_crossNetworkTypeGetConfluxBase32Address: {}, wallet_crossNetworkTypeGetEthereumHexAddress: {} }],
        });
}

export default new Emitter(new FluentRPCMethod());
