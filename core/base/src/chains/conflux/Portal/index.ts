import Emitter from '../../../emitter';
import detectProvider from '../../../detect';
import { ConfluxRPCMethod } from '../index';
import type { Provider } from '../type';
import type { CustomDetectConfig } from '../../../emitter/RPCMethod';

class PortalRPCMethod extends ConfluxRPCMethod {
    sessionKey = 'conflux-isConfluxPortal';
    detectProvider = (config: CustomDetectConfig = {}) => detectProvider<Provider>({ injectFlag: this.injectFlag, walletFlag: 'isConfluxPortal', ...config });
}

export default new Emitter(new PortalRPCMethod());
