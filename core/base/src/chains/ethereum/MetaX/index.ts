import Emitter from '../../../emitter';
import detectProvider from '../../../detect';
import { EthereumRPCMethod } from '../index';
import type { Provider } from '../type';

class MetaXRPCMethod extends EthereumRPCMethod {
    detectProvider = () => detectProvider<Provider>({ injectFlag: 'okexchain', walletFlag: 'isOKExWallet' });
}

export default new Emitter(new MetaXRPCMethod());
