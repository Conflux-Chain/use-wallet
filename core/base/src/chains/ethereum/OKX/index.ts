import Emitter from '../../../emitter';
import detectProvider from '../../../detect';
import { EthereumRPCMethod } from '../index';
import type { Provider } from '../type';

class OKXRPCMethod extends EthereumRPCMethod {
    sessionKey = 'okxwallet-isOkxWallet';
    detectProvider = () => detectProvider<Provider>({ injectFlag: 'okxwallet', walletFlag: 'isOkxWallet' });
}

export default new Emitter(new OKXRPCMethod());
