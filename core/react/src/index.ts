import { useEffect } from 'react';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import Unit from 'base/src/unit';
import Emitter from 'base/src/chains/ethereum/Halo';
import { subStateChange, selectors } from './helpers';
import { type State } from 'base/src/emitter';

export const store = create(
    subscribeWithSelector<State>(() => ({
        status: 'in-detecting',
        accounts: undefined,
        chainId: undefined,
        balance: undefined,
    }))
);

subStateChange(Emitter, store);

export const useStatus = () => store(selectors.status);
export const useChainId = () => store(selectors.chainId);
export const useAccount = () => store(selectors.account);

let referenceCount = 0;
export const useBalance = () => {
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

export const startTrackBalance = Emitter.startTrackBalance;
export const stopTrackBalance = Emitter.stopTrackBalance;
export const trackBalanceChangeOnce = Emitter.trackBalanceChangeOnce;
export const completeDetect = Emitter.completeDetect;

export const connect = Emitter.connect;
export const sendTransaction = Emitter.sendTransaction;
export const personalSign = Emitter.personalSign;
export const typedSign = Emitter.typedSign;
export const addChain = Emitter.addChain;
export const switchChain = Emitter.switchChain;
export const watchAsset = Emitter.watchAsset;
export const requestPermissions = Emitter.requestPermissions;
export const requestCrossNetworkPermission = Emitter.requestCrossNetworkPermission;
export const setCrossNetworkChain = Emitter.setCrossNetworkChain;
export let provider = Emitter.provider;
Emitter.completeDetect().then(() => (provider = Emitter.provider));

export { Unit };
