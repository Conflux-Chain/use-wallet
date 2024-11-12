export interface DetectProviderConfig {
    silent?: boolean;
    interval?: number;
    timeout?: number;
    walletFlag?: string;
    isSingleWalletFlag?: boolean;
    injectFlag: string;
    defaultWalletFlag?: string;
}

export default function detectProvider<T extends Object>({
    silent = false,
    interval = 10,
    timeout = 200,
    walletFlag,
    isSingleWalletFlag,
    injectFlag = 'ethereum',
    defaultWalletFlag,
}: DetectProviderConfig): Promise<T> {
    return new Promise((resolve, reject) => {
        async function handleEthereum() {
            let provider = (await getProvider(injectFlag, interval, timeout)) as T;

            if (!provider) {
                return reject(`Unable to detect window.${injectFlag}.`);
            }

            let mustBeSpecifiedWallet = false;
            let isSpecifiedWallet = false;

            // edge case if e.g. metamask and coinbase wallet are both installed
            const providers = (provider as any).providers;
            if (providers?.length) {
                if (typeof walletFlag !== 'string' || !walletFlag) {
                    if (defaultWalletFlag) {
                        provider = providers.find((provider: any) => judgeIsSpecifiedWallet(provider, defaultWalletFlag, isSingleWalletFlag));
                    } else {
                        provider = providers[0];
                    }
                } else {
                    provider = providers.find((provider: any) => judgeIsSpecifiedWallet(provider, walletFlag!, isSingleWalletFlag));
                }
            } else {
                mustBeSpecifiedWallet = typeof walletFlag === 'string' && !!walletFlag;
                isSpecifiedWallet = mustBeSpecifiedWallet && judgeIsSpecifiedWallet(provider, walletFlag!, isSingleWalletFlag);
            }

            if ((provider && !mustBeSpecifiedWallet) || isSpecifiedWallet) {
                resolve(provider);
            } else {
                const message = `Non-${walletFlag} Wallet detected.`;
                !silent && console.error('detect-provider:', message);
                reject(message);
            }
        }
        handleEthereum();
    });
}

function judgeIsSpecifiedWallet(provider: any, walletFlag: string, isSingleWalletFlag: boolean = false) {
    const walletFlagKeys = provider ? Object.keys(provider).filter((key) => key?.startsWith('is')) : [];
    return !!provider && (isSingleWalletFlag ? walletFlagKeys.length === 1 && walletFlagKeys[0] === walletFlag : walletFlagKeys.includes(walletFlag));
}

const getProvider = async (injectFlag: string, interval: number, timeout: number) => {
    return new Promise((resolve) => {
        const _resolve = (res: unknown) => {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            resolve(res);
        };
        const timeoutId = setTimeout(() => {
            _resolve(null);
        }, timeout);
        const intervalId = setInterval(() => {
            if ((globalThis as any)[injectFlag]) {
                _resolve((globalThis as any)[injectFlag]);
            }
        }, interval);
    });
};
