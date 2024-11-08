import Emitter from '../../../emitter';
import detectProvider from '../../../detect';
import { EthereumRPCMethod } from '../index';
import type { Provider } from '../type';

class OKXRPCMethod extends EthereumRPCMethod {
    sessionKey = 'okxwallet-isOkxWallet';
    injectFlag = 'okxwallet';
    detectProvider = () => detectProvider<Provider>({ injectFlag: this.injectFlag, walletFlag: 'isOkxWallet' });
}

export default new Emitter(new OKXRPCMethod());
