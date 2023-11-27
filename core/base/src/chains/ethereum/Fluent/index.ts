import Emitter from '../../../emitter';
import detectProvider from '../../../detect';
import { EthereumRPCMethod } from '../index';
import type { Provider } from '../type';

class FluentRPCMethod extends EthereumRPCMethod {
    sessionKey = 'fluent-isFluent';
    detectProvider = () => detectProvider<Provider>({ injectFlag: 'fluent', walletFlag: 'isFluent' });

    requestCrossNetworkPermission = () =>
        this.provider!.request({
            method: 'wallet_requestPermissions',
            params: [{ wallet_accounts: {}, wallet_crossNetworkTypeGetConfluxBase32Address: {}, wallet_crossNetworkTypeGetEthereumHexAddress: {} }],
        });
}

export default new Emitter(new FluentRPCMethod());
