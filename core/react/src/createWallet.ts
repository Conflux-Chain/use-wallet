import { useEffect } from 'react';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import Unit from 'base/src/unit';
import createEIP6963Emitter from 'base/src/chains/ethereum/6963';
import { subStateChange, selectors } from './helpers';
import { type State } from 'base/src/emitter';


const createWallet = (providerDetail: Parameters<typeof createEIP6963Emitter>[0]) => {
  const Emitter = createEIP6963Emitter(providerDetail);

  const store = create(
    subscribeWithSelector<State>(() => ({
      status: 'in-detecting',
      accounts: undefined,
      chainId: undefined,
      balance: undefined,
    }))
  );

  subStateChange(Emitter, store)

  const useStatus = () => store(selectors.status);
  const useChainId = () => store(selectors.chainId);
  const useAccount = () => store(selectors.account);

  let referenceCount = 0;
  const useBalance = () => {
    useEffect(() => {
      if (++referenceCount === 1) {
        Emitter.startTrackBalance();
      }

      return () => {
        if (--referenceCount === 0) {
          Emitter.stopTrackBalance();
        }
      };
    }, []);

    return store(selectors.balance);
  };

  const startTrackBalance = Emitter.startTrackBalance;
  const stopTrackBalance = Emitter.stopTrackBalance;
  const trackBalanceChangeOnce = Emitter.trackBalanceChangeOnce;
  const completeDetect = Emitter.completeDetect;

  const connect = Emitter.connect;
  const sendTransaction = Emitter.sendTransaction;
  const personalSign = Emitter.personalSign;
  const typedSign = Emitter.typedSign;
  const addChain = Emitter.addChain;
  const switchChain = Emitter.switchChain;
  const watchAsset = Emitter.watchAsset;
  const requestPermissions = Emitter.requestPermissions;
  const requestCrossNetworkPermission = Emitter.requestCrossNetworkPermission;
  const setCrossNetworkChain = Emitter.setCrossNetworkChain;

  return {
    store,
    useStatus,
    useChainId,
    useAccount,
    useBalance,
    startTrackBalance,
    stopTrackBalance,
    trackBalanceChangeOnce,
    completeDetect,
    connect,
    sendTransaction,
    personalSign,
    typedSign,
    addChain,
    switchChain,
    watchAsset,
    requestPermissions,
    requestCrossNetworkPermission,
    setCrossNetworkChain,
    provider: providerDetail.provider,
    providerInfo: providerDetail.info,
  }
}

export { Unit, createWallet };
