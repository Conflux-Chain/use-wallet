import Emitter from '../../../emitter';
import detectProvider from '../../../detect';
import { EthereumRPCMethod } from '../index';
import type { Provider } from '../type';

class CoinbaseRPCMethod extends EthereumRPCMethod {
    sessionKey = 'ethereum-isCoinbaseWallet';
    detectProvider = () => detectProvider<Provider>({ injectFlag: this.injectFlag, walletFlag: 'isCoinbaseWallet' });
}

export default new Emitter(new CoinbaseRPCMethod());
