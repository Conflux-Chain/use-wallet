import Emitter from '../../../emitter';
import detectProvider from '../../../detect';
import { EthereumRPCMethod } from '../index';
import type { Provider } from '../type';

class TokenPocketRPCMethod extends EthereumRPCMethod {
    detectProvider = () => detectProvider<Provider>({ injectFlag: 'ethereum', walletFlag: 'isTokenPocket' });
}

export default new Emitter(new TokenPocketRPCMethod());
