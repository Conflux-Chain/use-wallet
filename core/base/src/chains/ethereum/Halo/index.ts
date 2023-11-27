import Emitter from '../../../emitter';
import detectProvider from '../../../detect';
import { EthereumRPCMethod } from '../index';
import type { Provider } from '../type';

class HaloRPCMethod extends EthereumRPCMethod {
    sessionKey = 'haloEthereum';
    detectProvider = () => detectProvider<Provider>({ injectFlag: 'haloEthereum' });
}

export default new Emitter(new HaloRPCMethod());
