import Emitter from '../../../emitter';
import detectProvider from '../../../detect';
import { EthereumRPCMethod } from '../index';
import type { Provider } from '../type';

class MetaMaskRPCMethod extends EthereumRPCMethod {
    sessionKey = 'ethereum-isMetaMask';
    detectProvider = () => detectProvider<Provider>({ injectFlag: 'ethereum', walletFlag: 'isMetaMask', isSingleWalletFlag: true });
}

export default new Emitter(new MetaMaskRPCMethod());
