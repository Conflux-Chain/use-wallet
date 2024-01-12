
import { shallowReactive, computed, toRef, readonly, onBeforeMount, onBeforeUnmount } from 'vue';
import Emitter from 'base/src/chains/conflux';
import { type State } from 'base/src/emitter';
import Unit from 'base/src/unit';

export const store = shallowReactive<State>({
    status: 'in-detecting',
    accounts: undefined,
    chainId: undefined,
    balance: undefined,
});

const account = computed(() => store.accounts?.[0]);

Emitter.on('status', (status) => store.status = status);
Emitter.on('accounts', (accounts) => store.accounts = accounts);
Emitter.on('chainId', (chainId) => store.chainId = chainId);
Emitter.on('balance', (balance) => store.balance = balance);

export const useStatus = () => readonly(toRef(store, 'status'));
export const useChainId = () => readonly(toRef(store, 'chainId'));
export const useAccount = () => readonly(account);

let referenceCount = 0;
export const useBalance = () => {
    onBeforeMount(() => {
        if (++referenceCount === 1) {
            Emitter.startTrackBalance();
        }
    });
    onBeforeUnmount(() => {
        if (--referenceCount === 0) {
            Emitter.stopTrackBalance();
        }
    });

    return readonly(toRef(store, 'balance'));
}

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
Emitter.completeDetect().then(() => provider = Emitter.provider);

export { Unit };
