import createMaxAvailableBalanceTracker, { type Params } from './createMaxAvailableBalanceTracker';
import confluxEstimate from './chains-estimate/conflux';

export const createConfluxMaxAvailableBalanceTracker = (params: Omit<Params, 'estimate'>) =>
    createMaxAvailableBalanceTracker({ ...params, estimate: confluxEstimate });
