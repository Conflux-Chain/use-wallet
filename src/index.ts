
import Wallet, { type WalletState} from './Wallet';
import Unit from './Unit';

const FluentWallet = new Wallet('conflux');

export const store = FluentWallet.store;
export const provider = FluentWallet.provider;
export const completeDetect = FluentWallet.completeDetect;
export const connect = FluentWallet.connect;
export const sendTransaction = FluentWallet.sendTransaction;
export const addChain = FluentWallet.addChain;
export const switchChain = FluentWallet.switchChain;
export const watchAsset = FluentWallet.watchAsset;
export const personalSign = FluentWallet.personalSign;
export const typedSign = FluentWallet.typedSign;
export const trackBalanceChangeOnce = FluentWallet.trackBalanceChangeOnce;
export const useStatus = FluentWallet.useStatus;
export const useAccount = FluentWallet.useAccount;
export const useChainId = FluentWallet.useChainId;
export const useBalance = FluentWallet.useBalance;

export {
    Unit
}

export default Wallet;