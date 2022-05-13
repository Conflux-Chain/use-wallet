import ReactDOM from 'react-dom';
import type Emitter from 'base/src/chains/conflux';
import { type State } from 'base/src/emitter';
import { type store } from './index';

const isBelowReact18 = +ReactDOM.version.split('.')[0] < 18;
const scheduleMicrotask = typeof queueMicrotask === 'function' ? queueMicrotask : (callback: VoidFunction) => Promise.resolve(null).then(callback); 
let updateTasks: Array<Function> = [];
const createStateChangeHandler = <T extends Function>(updateTask: T) => {
    if (!isBelowReact18) {
        return updateTask;
    }

    return function() {
        if (!updateTasks.length && ReactDOM.unstable_batchedUpdates) {
            scheduleMicrotask(() => {
                ReactDOM.unstable_batchedUpdates(() => {
                    updateTasks.forEach((updateTask) => updateTask());
                    updateTasks = [];
                });
            });
        }

        updateTasks.push(updateTask.bind(null, ...arguments));
    }
};

export const subStateChange = (EmitterInstance: typeof Emitter, storeInstance: typeof store) => {
    EmitterInstance.on('status', createStateChangeHandler((status) => storeInstance.setState({ status })));
    EmitterInstance.on('accounts', createStateChangeHandler((accounts) => storeInstance.setState({ accounts })));
    EmitterInstance.on('chainId', createStateChangeHandler((chainId) => storeInstance.setState({ chainId })));
    EmitterInstance.on('balance', createStateChangeHandler((balance) => storeInstance.setState({ balance })));    
}

export const selectors = {
    status: (state: State) => state.status,
    chainId: (state: State) => state.chainId,
    balance: (state: State) => state.balance,
    accounts: (state: State) => state.accounts,
    account: (state: State) => state.accounts?.[0],
};