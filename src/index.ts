
import Wallet from './Wallet';
import Unit from './Unit';
import type { Provider } from './types';

const FluentWallet = new Wallet('conflux');

export const provider = FluentWallet.provider as (Provider<'conflux'> | undefined);
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