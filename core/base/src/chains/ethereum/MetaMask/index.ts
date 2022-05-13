import Emitter from '../../../emitter';
import detectProvider from '../../../detect';
import { EthereumRPCMethod } from '../index';
import type { Provider } from '../type';

class MetaMaskRPCMethod extends EthereumRPCMethod {
    detectProvider = () => detectProvider<Provider>({ injectFlag: 'ethereum', walletFlag: 'isMetaMask', isSingleWalletFlag: true });
}

export default new Emitter(new MetaMaskRPCMethod());
