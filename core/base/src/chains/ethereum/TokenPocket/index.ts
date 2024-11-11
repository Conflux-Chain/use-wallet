import Emitter from '../../../emitter';
import detectProvider from '../../../detect';
import { EthereumRPCMethod } from '../index';
import type { Provider } from '../type';
import type { CustomDetectConfig } from '../../../emitter/RPCMethod';

class TokenPocketRPCMethod extends EthereumRPCMethod {
    sessionKey = 'ethereum-isTokenPocket';
    detectProvider = (config: CustomDetectConfig = {}) => detectProvider<Provider>({ injectFlag: this.injectFlag, walletFlag: 'isTokenPocket', ...config });
}

export default new Emitter(new TokenPocketRPCMethod());
