import Emitter from '../../../emitter';
import { EthereumRPCMethod } from '../index';
import type { EIP6963ProviderDetail } from '../type';

export class EIP6963RPCMethod extends EthereumRPCMethod {
    constructor(detail: EIP6963ProviderDetail) {
        super();
        this.sessionKey = `eip6963-${detail.info.uuid}`;
        this.provider = detail.provider;
    }

    detectProvider = () => Promise.resolve(this.provider);
}

const createEIP6963Emitter = (providerDetail: EIP6963ProviderDetail) => {
    return new Emitter(new EIP6963RPCMethod(providerDetail));
}

export default createEIP6963Emitter;
