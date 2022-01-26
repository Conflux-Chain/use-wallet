import { type Provider, type ProviderType } from './types'

/**
 * Returns a Promise that resolves to the value of window.ethereum | window.conflux if it is
 * set within the given timeout, or null.
 * The Promise will not reject, but an error will be thrown if invalid options
 * are provided.
 *
 * @param options - Options bag.
 * @param options.mustBeMetaMask - Whether to only look for MetaMask providers.
 * @param options.mustBeFluent - Whether to only look for Fluent providers.
 * Default: false
 * @param options.silent - Whether to silence console errors. Does not affect
 * thrown errors. Default: false
 * @param options.timeout - Milliseconds to wait for 'conflux#initialized' to
 * be dispatched. Default: 1500
 * @returns A Promise that resolves with the Provider if it is detected within
 * given timeout, otherwise null.
 */
export default function detectProvider(providerType: 'conflux', params?: { mustBeFluent?: boolean; silent?: boolean; timeout?: number }): Promise<Provider<'conflux'>>;
export default function detectProvider(providerType: 'ethereum', params?: { mustBeMetaMask?: boolean; silent?: boolean; timeout?: number }): Promise<Provider<'ethereum'>>;
export default function detectProvider<T extends ProviderType>(): Promise<Provider<T>> {
    const providerType = arguments[0] as ProviderType;
    const { mustBeMetaMask = false, mustBeFluent = false, silent = false , timeout = 0 } = arguments[1] ?? {};
    _validateInputs();

    let handled = false;

    return new Promise((resolve, reject) => {
        if ((window as any)[providerType]) {
            handleEthereum();
        } else {
            window.addEventListener(`${providerType}#initialized`, handleEthereum, { once: true });

            if (timeout > 0) {
                setTimeout(() => {
                    handleEthereum();
                }, timeout);
            } else {
                handleEthereum();
            }
        }

        function handleEthereum() {
            if (handled) {
                return;
            }
            handled = true;

            window.removeEventListener(`${providerType}#initialized`, handleEthereum);

            const provider = (window as any)[providerType] as Provider<T>;

            const mustBeOfficalWallet = providerType === 'conflux' ? mustBeFluent : mustBeMetaMask;
            let isOfficalWallet = !!provider;
            if (provider && mustBeOfficalWallet) {
                isOfficalWallet = providerType === 'conflux' ? !!provider.isFluent : !!provider.isMetaMask;
            }

            if (provider && (!mustBeOfficalWallet || isOfficalWallet)) {
                resolve(provider);
            } else {
                const message = mustBeOfficalWallet && provider ? `Non-${providerType === 'conflux' ? 'Fluent' : 'MetaMask'} window.${providerType} detected.` : `Unable to detect window.${providerType}.`;

                !silent && console.error('detect-provider:', message);
                reject(message);
            }
        }
    });

    function _validateInputs() {
        if (typeof mustBeFluent !== 'boolean') {
            throw new Error(`detect-provider: Expected option 'mustBeFluent' to be a boolean.`);
        }
        if (typeof mustBeMetaMask !== 'boolean') {
            throw new Error(`detect-provider: Expected option 'mustBeMetaMask' to be a boolean.`);
        }
        if (typeof silent !== 'boolean') {
            throw new Error(`detect-provider: Expected option 'silent' to be a boolean.`);
        }
        if (typeof timeout !== 'number') {
            throw new Error(`detect-provider: Expected option 'timeout' to be a number.`);
        }
    }
}