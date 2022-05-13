import Emitter from '../../../emitter';
import detectProvider from '../../../detect';
import { EthereumRPCMethod } from '../index';
import type { Provider } from '../type';

class CoinbaseRPCMethod extends EthereumRPCMethod {
    detectProvider = () => detectProvider<Provider>({ injectFlag: 'ethereum', walletFlag: 'isCoinbaseWallet' });
}

export default new Emitter(new CoinbaseRPCMethod());
