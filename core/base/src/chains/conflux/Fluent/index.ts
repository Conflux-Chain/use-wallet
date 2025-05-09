import Emitter from '../../../emitter';
import detectProvider from '../../../detect';
import { ConfluxRPCMethod } from '../index';
import type { Provider } from '../type';
import type { CustomDetectConfig } from '../../../emitter/RPCMethod';

export class FluentRPCMethod extends ConfluxRPCMethod {
    sessionKey = 'conflux-isFluent';

    detectProvider = (config: CustomDetectConfig = {}) => detectProvider<Provider>({ injectFlag: this.injectFlag, walletFlag: 'isFluent', ...config });

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
