import Emitter from '../../../emitter';
import detectProvider from '../../../detect';
import { EthereumRPCMethod } from '../index';
import type { Provider } from '../type';

class TokenPocketRPCMethod extends EthereumRPCMethod {
    sessionKey = 'ethereum-isTokenPocket';
    detectProvider = () => detectProvider<Provider>({ injectFlag: this.injectFlag, walletFlag: 'isTokenPocket' });
}

export default new Emitter(new TokenPocketRPCMethod());
