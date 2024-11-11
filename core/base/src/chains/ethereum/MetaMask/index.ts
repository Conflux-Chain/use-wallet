import Emitter from '../../../emitter';
import detectProvider from '../../../detect';
import { EthereumRPCMethod } from '../index';
import type { Provider } from '../type';
import type { CustomDetectConfig } from '../../../emitter/RPCMethod';

class MetaMaskRPCMethod extends EthereumRPCMethod {
    sessionKey = 'ethereum-isMetaMask';
    detectProvider = (config: CustomDetectConfig = {}) =>
        detectProvider<Provider>({ injectFlag: this.injectFlag, walletFlag: 'isMetaMask', isSingleWalletFlag: true, ...config });
}

export default new Emitter(new MetaMaskRPCMethod());
