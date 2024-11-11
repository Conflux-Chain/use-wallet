import Emitter from '../../../emitter';
import detectProvider from '../../../detect';
import { EthereumRPCMethod } from '../index';
import type { Provider } from '../type';
import type { CustomDetectConfig } from '../../../emitter/RPCMethod';

class HaloRPCMethod extends EthereumRPCMethod {
    sessionKey = 'haloEthereum';
    injectFlag = 'haloEthereum';
    detectProvider = (config: CustomDetectConfig = {}) => detectProvider<Provider>({ injectFlag: this.injectFlag, ...config });
}

export default new Emitter(new HaloRPCMethod());
