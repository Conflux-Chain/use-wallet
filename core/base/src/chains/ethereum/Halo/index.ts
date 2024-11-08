import Emitter from '../../../emitter';
import detectProvider from '../../../detect';
import { EthereumRPCMethod } from '../index';
import type { Provider } from '../type';

class HaloRPCMethod extends EthereumRPCMethod {
    sessionKey = 'haloEthereum';
    injectFlag = 'haloEthereum';
    detectProvider = () => detectProvider<Provider>({ injectFlag: this.injectFlag });
}

export default new Emitter(new HaloRPCMethod());
