import mitt from 'mitt';
import Unit from '../unit';
import type RPCMethod from './RPCMethod';

export type State = {
    status: 'in-detecting' | 'not-installed' | 'not-active' | 'in-activating' | 'active';
    accounts: Array<string> | undefined;
    chainId: string | undefined;
    balance: Unit | undefined;
};

class Emitter<T extends RPCMethod> {
    private emitter = mitt<State>();
    private state: State;
    private trackBalanceInterval?: number;
    private detectTimer?: NodeJS.Timeout;
    private trackBalanceChangeOnceCallback: Array<VoidFunction> = [];
    private RPCMethod: RPCMethod;
    public provider!: T['provider'];

    private resolveDetect!: () => void;
    private detectPromise = new Promise<void>(
        (resolve) =>
        (this.resolveDetect = () => {
            if (this.detectTimer) {
                clearTimeout(this.detectTimer);
            }
            resolve();
        }),
    );

    constructor(RPCMethod: T, { isEIP6963 = false }: { isEIP6963?: boolean } = { isEIP6963: false }) {
        this.state = {
            status: isEIP6963 ? 'not-active' : 'in-detecting',
            accounts: undefined,
            chainId: undefined,
            balance: undefined,
        };
        this.RPCMethod = RPCMethod;
        if (typeof this.RPCMethod.detectProvider !== 'function') {
            return;
        }

        this.RPCMethod.detectAndSetProvider()
            .then(this.setProvider)
            .catch((e) => {
                this.handleStatusChanged('not-installed');
                this.resolveDetect();
                if (typeof e === 'string' && e.startsWith('Unable to detect window.')) {
                    this.RPCMethod.subProvider().then(this.setProvider);
                }
            });

        if (isEIP6963) {
            return;
        }
        
        this.detectTimer = setTimeout(() => {
            console.error(`detect ${this.RPCMethod.sessionKey ? 'window.' + this.RPCMethod.sessionKey.split('-')[0] : 'wallet'} timeout.`);
            if (this.RPCMethod.sessionKey) {
                const times = Number(sessionStorage.getItem(this.RPCMethod.sessionKey) || 0);
                if (times >= this.RPCMethod.retryLimit) {
                    this.handleStatusChanged('not-active');
                    this.resolveDetect();
                    throw new Error(`detect ${this.RPCMethod.sessionKey ? 'window.' + this.RPCMethod.sessionKey.split('-')[0] : 'wallet'} timeout.`);
                }
                sessionStorage.setItem(this.RPCMethod.sessionKey, String(times + 1));
            }
            window.location.reload();
        }, this.RPCMethod.detectTimeout);
    }

    setProvider = (provider: any) => {
        this.batchGetInfo();
        this.RPCMethod.onChainIdChange(() => this.batchGetInfo());
        this.RPCMethod.onAccountsChange(() => this.batchGetInfo());
        this.provider = provider;
    };

    private handleStateChange = <T extends keyof State>(stateKey: T, newVal: State[T]) => {
        const preVal = this.state[stateKey];

        let isValChanged = false;
        switch (stateKey) {
            case 'accounts':
                isValChanged = (preVal as State['accounts'])?.[0] !== (newVal as State['accounts'])?.[0];
                break;
            case 'balance':
                if (newVal !== undefined && preVal !== undefined) {
                    isValChanged = !(preVal as State['balance'])!.equalsWith((newVal as State['balance'])!);
                } else {
                    isValChanged = preVal !== newVal;
                }
                break;
            default:
                isValChanged = preVal !== newVal;
        }

        if (isValChanged) {
            Object.assign(this.state, { [stateKey]: newVal });
            this.emitter.emit(stateKey, newVal);

            if (stateKey === 'balance' && this.trackBalanceChangeOnceCallback.length) {
                this.trackBalanceChangeOnceCallback.forEach((callback) => callback());
                this.trackBalanceChangeOnceCallback = [];
            }
        }
    };

    private handleStatusChanged = (status: 'in-detecting' | 'not-installed' | 'not-active' | 'in-activating' | 'active') =>
        this.handleStateChange('status', status);

    private handleAccountsChanged = (accounts?: string[]) => {
        const hasAccount = !!accounts?.[0];

        if (hasAccount) {
            this.handleStatusChanged('active');
        } else {
            this.handleStatusChanged('not-active');
        }

        this.handleStateChange('accounts', accounts);
    };

    private handleChainChanged = (chainId: string) => {
        if (!chainId || chainId === '0xNaN') {
            this.handleStateChange('chainId', undefined);
            this.handleAccountsChanged(undefined);
            return;
        }

        this.handleStateChange('chainId', String(parseInt(chainId)));
    };

    private handleBalanceChanged = (balanceMinUnit?: string) => {
        if (typeof balanceMinUnit !== 'string' && typeof balanceMinUnit !== 'number') {
            this.handleStateChange('balance', undefined);
            return;
        }

        this.handleStateChange('balance', Unit.fromMinUnit(balanceMinUnit));
    };

    // when connect or init, get account|chainId|balance batch, to reduce interface jitter.
    private batchGetInfo = async ({ isRequestConnect }: { isRequestConnect: boolean } = { isRequestConnect: false }) => {
        try {
            const [chainId, accounts] = await Promise.all([
                this.RPCMethod.getChainId(),
                isRequestConnect ? this.RPCMethod.requestAccounts() : this.RPCMethod.getAccounts(),
            ]);
            this.RPCMethod.setAccounts(accounts);

            // In very rare cases, the fullnode balance roc may crash, so the balance batch has to be dropped.
            let balanceTimeout: number | undefined = setTimeout(() => {
                this.handleChainChanged(chainId);
                this.handleAccountsChanged(accounts);
                this.handleBalanceChanged(undefined);
                this.resolveDetect();
                balanceTimeout = undefined;
            }, 1250) as unknown as number;

            try {
                const balance = await this.RPCMethod.getBalance();

                if (balanceTimeout !== undefined) {
                    clearTimeout(balanceTimeout);
                    this.handleChainChanged(chainId);
                    this.handleAccountsChanged(accounts);
                }
                this.handleBalanceChanged(balance);
            } catch (_) {
                if (balanceTimeout !== undefined) {
                    clearTimeout(balanceTimeout);
                    this.handleChainChanged(chainId);
                    this.handleAccountsChanged(accounts);
                    this.handleBalanceChanged(undefined);
                }
            }
            return accounts;
        } catch (err) {
            throw err;
        } finally {
            this.resolveDetect();
        }
    };

    private checkConnected = (operate: string) => {
        const account = this.state.accounts?.[0];
        if (!account) {
            throw new Error(`${operate} error: request connect to wallet.`);
        }
        return account;
    };

    public on = this.emitter.on;
    public off = this.emitter.off;
    public clear = this.emitter.all.clear;

    public completeDetect = () => this.detectPromise;

    public startTrackBalance = (interval = 1500) => {
        this.stopTrackBalance();
        const getAndSetBalance = () => {
            const account = this.state.accounts?.[0];
            const chainId = this.state.chainId;
            if (!chainId || chainId === '9007199254740991' || !account) {
                return;
            }
            this.RPCMethod.getBalance().then((balance) => this.handleBalanceChanged(balance));
        };

        getAndSetBalance();
        this.trackBalanceInterval = setInterval(getAndSetBalance, interval) as unknown as number;
    };

    public stopTrackBalance = () => {
        if (this.trackBalanceInterval !== undefined) {
            clearInterval(this.trackBalanceInterval);
            this.trackBalanceInterval = undefined;
        }
    };

    public trackBalanceChangeOnce = (callback: VoidFunction) => {
        if (typeof callback !== 'function') return;
        this.trackBalanceChangeOnceCallback.push(callback);
    };

    public connect = async () => {
        const currentStatus = this.state.status;
        if (currentStatus !== 'not-active') {
            if (currentStatus === 'active') return Promise.resolve(this.state.accounts);
            else throw new Error(`Current status ${currentStatus} is not allowed to connect.`);
        }
        this.handleStatusChanged('in-activating');
        const res = this.batchGetInfo({ isRequestConnect: true });
        res.catch(() => this.handleStatusChanged('not-active'));
        return res;
    };

    public sendTransaction: T['sendTransaction'] = (params: Record<string, string>) => {
        if (!this.RPCMethod.sendTransaction) {
            throw new Error(`Current Wallet does'nt have sendTransaction method.`);
        }

        const account = this.checkConnected('sendTransaction');
        return this.RPCMethod.sendTransaction({
            ...params,
            from: account,
            ...(params.value ? {} : { value: '0x0' }),
        });
    };

    public personalSign = (message: string) => {
        if (!this.RPCMethod.personalSign) {
            throw new Error(`Current Wallet does'nt have personalSign method.`);
        }

        this.checkConnected('personalSign');
        return this.RPCMethod.personalSign(message);
    };

    public typedSign: T['typedSign'] = (typedData: Record<string, unknown>) => {
        if (!this.RPCMethod.typedSign) {
            throw new Error(`Current Wallet does'nt have typedSign method.`);
        }

        this.checkConnected('typedSign');
        return this.RPCMethod.typedSign(typedData);
    };

    public addChain = (params: Parameters<T['addChain']>[0], needConnected = true) => {
        if (!this.RPCMethod.addChain) {
            throw new Error(`Current Wallet does'nt have addChain method.`);
        }

        needConnected && this.checkConnected('addChain');
        return this.RPCMethod.addChain(params) as ReturnType<T['addChain']>;
    };

    public switchChain: T['switchChain'] = (params: unknown) => {
        if (!this.RPCMethod.switchChain) {
            throw new Error(`Current Wallet does'nt have switchChain method.`);
        }

        this.checkConnected('switchChain');
        return this.RPCMethod.switchChain(params);
    };

    public watchAsset: T['watchAsset'] = (params: unknown) => {
        if (!this.RPCMethod.watchAsset) {
            throw new Error(`Current Wallet does'nt have watchAsset method.`);
        }

        this.checkConnected('watchAsset');
        return this.RPCMethod.watchAsset(params);
    };

    public requestPermissions: T['requestPermissions'] = (params: unknown) => {
        if (!this.RPCMethod.requestPermissions) {
            throw new Error(`Current Wallet does'nt have requestPermissions method.`);
        }

        return this.RPCMethod.requestPermissions(params);
    };

    public requestCrossNetworkPermission: T['requestCrossNetworkPermission'] = () => {
        if (!this.RPCMethod.requestCrossNetworkPermission) {
            throw new Error(`Current Wallet does'nt have requestCrossNetworkPermission method.`);
        }

        return this.RPCMethod.requestCrossNetworkPermission();
    };

    public setCrossNetworkChain = (chainId?: string) => {
        if (typeof chainId !== 'string' && chainId !== undefined) return;
        this.RPCMethod.crossNetworkChain = chainId;
        this.RPCMethod.getAccounts().then((accounts) => {
            this.RPCMethod.setAccounts(accounts);
            this.handleAccountsChanged(accounts);
        });
    };
}

export default Emitter;
