import Wallet, { Unit } from '../index';

const FluentWallet = new Wallet("ethereum");

const detect = FluentWallet.detect;
const connect = FluentWallet.connect;
const sendTransaction = FluentWallet.sendTransaction;
const trackBalanceChangeOnce = FluentWallet.trackBalanceChangeOnce;
const useStatus = FluentWallet.useStatus;
const useAccount = FluentWallet.useAccount;
const useChainId = FluentWallet.useChainId;
const useBalance = FluentWallet.useBalance;
const useMaxAvailableBalance = FluentWallet.useMaxAvailableBalance;

export { Unit, detect, connect, sendTransaction, trackBalanceChangeOnce, useAccount, useBalance, useChainId, useMaxAvailableBalance, useStatus };
