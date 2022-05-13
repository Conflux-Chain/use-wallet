# @cfxjs/use-wallet
### [Docs & Demo Site](https://use-wallet.fluentwallet.dev/)

#### [Old Version Here](https://github.com/Conflux-Chain/use-wallet/tree/old)

## What is @cfxjs/use-wallet

It's a front-end-view wallet hooks library for lightweight dapp rapid development use, only encapsulating the wallet injection in the window provider.If you need more complete and powerful support, js-conflux-sdk or web3.js will be more suitable.

A simpler way to 'use' wallet in web development

## Features

- **Can support any chain/any wallet/any framework.**
currently has support for react/vue3 framework; conflux chain (Portal, Fluent) | ethereum chain (MetaMask, Fluent, MetaX, CoinBase)

- **Easy to use.**
use-wallet has a high level encapsulation, without the need to pay attention to the provider and other specification-oriented concepts. From a front-end developer's perspective, focus on hooks and func and just use them.

- **Fine-grained hooks to avoid duplicate render.**
Some similar hooks wrappers in the community have a habit of returning a lot of data wrapped together, which causes unnecessary render and is not advocated.

- **Tiny**
use-wallet only communicates with the wallet through the wallet-injected provider, as well as providing some lightweight tooling methods. In many cases, developing a dapp doesn't require importing a large and comprehensive library like js-conflux-sdk, web3.js.(gzip: 3.7kb - source code, 20kb - include decimal.js)

## Install

```bash
yarn add @cfxjs/use-wallet-react
// yarn add @cfxjs/use-wallet-vue
```

## Basic Usage

```tsx
import React, { memo, useCallback } from 'react';
import { useStatus, useAccount, useChainId, useBalance, connect, Unit } from '@cfxjs/use-wallet-react/conflux';
// import { useStatus, ... } from '@cfxjs/use-wallet-react/ethereum/MetaMask;

const BasicUsage: React.FC = () => {
    const status = useStatus();

    return (
        <div>
            {status !== 'in-detecting' && status !== 'active' && (
                <button
                    onClick={connect}
                    disabled={status !== 'not-active'}
                >
                    {status === 'in-activating' && 'connecting...'}
                    {status === 'not-installed' && 'Fluent Not Install'}
                    {status === 'not-active' && 'Connect Fluent'}
                </button>
            )}
            {status === 'active' && <WalletInfo />}
        </div>
    );
};

const WalletInfo: React.FC = memo(() => {
    const account = useAccount();
    const chainId = useChainId()!;
    const balance = useBalance()!;

    // Send 1 native token to self (connected account)
    const handleClickSendTransaction = useCallback(async () => {
        // For ts Type Guards. when status turn to 'active', account|chainId|balance must be exist.
        if (!account) return;

        try {
            const TxnHash = await sendTransaction({
                to: account,
                value: Unit.fromStandardUnit('1').toHexMinUnit(),
            });
            console.log(TxnHash)
        } catch (err) {
            console.error(err)
        }
    }, [account]);

    return (
        <div>
            <p>account: {account}</p>
            <p>chainId: {chainId}</p>
            <p>
                balance: {`${balance?.toDecimalStandardUnit()} CFX`}
            </p>

            <button onClick={handleClickSendTransaction}>
                Send 1 native token to self (connected account)
            </button>
        </div>
    );
});

export default BasicUsage;
```

## More API & Demo

[See Docs](https://use-wallet.fluentwallet.dev/)

## Run Dev

```bash
yarn install
yarn dev:react
yarn dev:vue3
```

## Run Docs

```bash
yarn install
yarn dev:docs
```

## Build Docs

```bash
yarn install
yarn build:docs
```

## Build Lib

```bash
yarn install
yarn build:react
yarn build:vue3
```

### license

MIT