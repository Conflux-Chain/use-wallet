import Emitter from '../../../emitter';
import detectProvider from '../../../detect';
import { EthereumRPCMethod } from '../index';
import type { Provider } from '../type';
import type { CustomDetectConfig } from '../../../emitter/RPCMethod';

export class OKXRPCMethod extends EthereumRPCMethod {
    sessionKey = 'okxwallet-isOkxWallet';
    injectFlag = 'okxwallet';
    detectProvider = (config: CustomDetectConfig = {}) => detectProvider<Provider>({ injectFlag: this.injectFlag, walletFlag: 'isOkxWallet', ...config });
}

export default new Emitter(new OKXRPCMethod());
