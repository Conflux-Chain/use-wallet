import Emitter from '../../../emitter';
import detectProvider from '../../../detect';
import { ConfluxRPCMethod } from '../index';
import type { Provider } from '../type';

class PortalRPCMethod extends ConfluxRPCMethod {
    sessionKey = 'conflux-isConfluxPortal';
    detectProvider = () => detectProvider<Provider>({ injectFlag: 'conflux', walletFlag: 'isConfluxPortal' });
}

export default new Emitter(new PortalRPCMethod());
