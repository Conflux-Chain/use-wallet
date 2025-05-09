import Emitter from '../../../emitter';
import detectProvider from '../../../detect';
import { EthereumRPCMethod } from '../index';
import type { Provider } from '../type';
import type { CustomDetectConfig } from '../../../emitter/RPCMethod';

export class CoinbaseRPCMethod extends EthereumRPCMethod {
    sessionKey = 'ethereum-isCoinbaseWallet';
    detectProvider = (config: CustomDetectConfig = {}) => detectProvider<Provider>({ injectFlag: this.injectFlag, walletFlag: 'isCoinbaseWallet', ...config });
}

export default new Emitter(new CoinbaseRPCMethod());
