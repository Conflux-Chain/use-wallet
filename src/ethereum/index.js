import Wallet, { Unit } from '../index';

const FluentWallet = new Wallet('ethereum');

const provider = FluentWallet.provider;
const completeDetect = FluentWallet.completeDetect;
const connect = FluentWallet.connect;
const sendTransaction = FluentWallet.sendTransaction;
const addChain = FluentWallet.addChain;
const switchChain = FluentWallet.switchChain;
const watchAsset = FluentWallet.watchAsset;
const personalSign = FluentWallet.personalSign;
const typedSign = FluentWallet.typedSign;
const trackBalanceChangeOnce = FluentWallet.trackBalanceChangeOnce;
const useStatus = FluentWallet.useStatus;
const useAccount = FluentWallet.useAccount;
const useChainId = FluentWallet.useChainId;
const useBalance = FluentWallet.useBalance;

export {
    Unit,
    provider,
    completeDetect,
    connect,
    sendTransaction,
    addChain,
    switchChain,
    watchAsset,
    personalSign,
    typedSign,
    trackBalanceChangeOnce,
    useAccount,
    useBalance,
    useChainId,
    useStatus,
};
