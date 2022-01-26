
import Wallet from './Wallet';
import Unit from './Unit';

const FluentWallet = new Wallet('conflux');

export const detect = FluentWallet.detect;
export const connect = FluentWallet.connect;
export const sendTransaction = FluentWallet.sendTransaction;
export const trackBalanceChangeOnce = FluentWallet.trackBalanceChangeOnce;
export const useStatus = FluentWallet.useStatus;
export const useAccount = FluentWallet.useAccount;
export const useChainId = FluentWallet.useChainId;
export const useBalance = FluentWallet.useBalance;
export const useMaxAvailableBalance = FluentWallet.useMaxAvailableBalance;

export {
    Unit
}

export default Wallet;