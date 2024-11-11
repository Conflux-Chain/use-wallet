import Emitter from '../../../emitter';
import detectProvider from '../../../detect';
import { EthereumRPCMethod } from '../index';
import type { Provider } from '../type';
import type { CustomDetectConfig } from '../../../emitter/RPCMethod';

class FluentRPCMethod extends EthereumRPCMethod {
    sessionKey = 'fluent-isFluent';
    injectFlag = 'fluent';
    detectProvider = (config: CustomDetectConfig = {}) => detectProvider<Provider>({ injectFlag: this.injectFlag, walletFlag: 'isFluent', ...config });

    requestCrossNetworkPermission = () =>
        this.provider!.request({
            method: 'wallet_requestPermissions',
            params: [{ wallet_accounts: {}, wallet_crossNetworkTypeGetConfluxBase32Address: {}, wallet_crossNetworkTypeGetEthereumHexAddress: {} }],
        });
}

export default new Emitter(new FluentRPCMethod());
