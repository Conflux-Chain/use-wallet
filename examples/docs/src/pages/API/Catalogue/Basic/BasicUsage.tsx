import React from 'react';
import Code from '@components/Code';
import useI18n, { compiled } from '@hooks/useI18n';
import useCurrentLib from '@hooks/useCurrentLib';

const transitions = {
    en: {
        step1: 'This example shows how a basic Dapp can be developed in SPA with \'use-wallet\', using the conflux chain as an example.',
        step2: 'First, you need to get the current status of the wallet with useStatus. A robust application should handle all statuses. the values of status are described later in the api, and the code in the example covers all statuses of the wallet from detection to connection completion.',
        step3: 'Once you have successfully connected to the wallet (and obtained authorization from the wallet for the current url), you can get the status of your current account and issue transactions.',
        step4: `'use-wallet' also provides some tool functions to facilitate development. For example, the <a href="#/api/{currentLib}/utils">Unit util</a> in the example is used for balance conversions and calculations with sufficient precision.`,
        step5: `The main portal '@cfxjs/use-wallet/{currentLib}/conflux' is connected to the conflux wallet (Fluent | Portal), to connect to the ethereum wallet just change the portal to '@cfxjs/use-wallet-{currentLib}/ethereum'.`,
        step6: 'The changes to account, chainId, and balance are batch-processed so that they always change together during the "initialization of the activated" / "authorized wallet connection" / "switching of accounts", so you can use them without worrying about page jitter.',
        ssr_step1: `In SSR/SSG, the 'in-detecting' status in useStatus should no longer be a concern because of the pre-rendering process. In other words, it should be assumed that the detecting process is complete and the connect button can be displayed directly.`
    },
    zh: {
        step1: '这个例子展示了 SPA中 如何用 \'use-wallet\' 开发一个基本的 Dapp，以 conflux链 为例。',
        step2: '首先，需要用 useStatus 获取钱包当前状态。一个健壮的应用理应处理所有的状态。status 的各个值会在后面的 api 中具体介绍，例子中的代码涵盖了钱包从 探测 到 连接完成 的所有 状态。',
        step3: '当成功连接到钱包（取得钱包对当前 url 的授权）后，就可以获取当前账户的状态，以及签发交易了。',
        step4: '\'use-wallet\' 也提供了一些工具函数方便开发。比如例子中的 <a href="#/api/{currentLib}/utils">Unit util</a>，用以足够精度的 balance 进制转换、计算。',
        step5: `主入口 '@cfxjs/use-wallet-{currentLib}/conflux' 连接的是 conflux 钱包（Fluent | Portal），连接 ethereum 钱包只需要把入口换成 '@cfxjs/use-wallet-{currentLib}/ethereum' 即可。`,
        step6: `account、chainId、balance 的变动做了批处理，它们在 初始化已激活/授权连接钱包/切换账户 的过程中永远是一起变化的，你可以放心的使用它们不用担心造成的页面的抖动。`,
        ssr_step1: `SSR/SSG中，因为预渲染过程的存在，useStatus 中的 'in-detecting'状态 应该不再被关注。换而言之，应该假设 detect过程 已经完成，可以直接显示连接按钮。`
    },
} as const;

const BasicUsage: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();

    return (
        <>
            <section>
                <h3>basic usage SPA</h3>
                <p>{i18n.step1}</p>
                <p>{i18n.step2}</p>
                <p>{i18n.step3}</p>
                <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step4, { currentLib: currentLib }) }}/>
                <p><strong>{compiled(i18n.step5, { currentLib: currentLib })}</strong></p>
                <p>{i18n.step6}</p>
                <Code className='mt-[16px]'>
                    {getCodeSPA(currentLib)}
                </Code>
            </section>

            <section>
                <h3>basic usage SSG</h3>
                <p>{i18n.ssr_step1}</p>
                <Code className='mt-[16px]'>
                    {getCodeSSR(currentLib)}
                </Code>
            </section>
        </>
    );
}

const reactCodeSPA = `import React, { memo, useCallback } from 'react';
import { useStatus, useAccount, useChainId, useBalance, connect, Unit } from '@cfxjs/use-wallet-react/conflux';

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
                balance: {\`\${balance?.toDecimalStandardUnit()} CFX\`}
            </p>

            <button onClick={handleClickSendTransaction}>
                Send 1 native token to self (connected account)
            </button>
        </div>
    );
});

export default BasicUsage;`

const vue3CodeSPA = `//<script setup lang="ts">
import { useStatus, useAccount, useChainId, useBalance, connect, Unit, sendTransaction } from '@cfxjs/use-wallet-vue3/conflux';
const status = useStatus();
const account = useAccount();
const chainId = useChainId();
const balance = useBalance();

// Send 1 native token to self (connected account)
const handleClickSendTransaction = async () => {
    // For ts Type Guards. when status turn to 'active', account|chainId|balance must be exist.
    if (!account.value) return;

    try {
        const TxnHash = await sendTransaction({
            to: account.value,
            value: Unit.fromStandardUnit('1').toHexMinUnit(),
        });
        console.log(TxnHash);
    } catch (err) {
        console.error(err);
    }
};
</script>

<template>
    <div>
        <button v-if="status !== 'in-detecting' && status !== 'active'" @click="connect" :disabled="status !== 'not-active'">
            <template v-if="status === 'in-activating'">Connecting...</template>
            <template v-if="status === 'not-installed'">Fluent Not Install</template>
            <template v-if="status === 'not-active'">Connect Fluent</template>
        </button>
        <div v-else-if="status === 'active'">
            <p>account: {{ account }}</p>
            <p>chainId: {{ chainId }}</p>
            <p>balance: {{ \`\${balance?.toDecimalStandardUnit()} CFX\` }}</p>

            <button @click="handleClickSendTransaction">Send 1 native token to self (connected account)</button>
        </div>
    </div>
</template>
`

const getCodeSPA = (lib: 'react' | 'vue3' | 'svelte') => {
    if (lib === 'vue3') return vue3CodeSPA;
    if (lib === 'svelte') return vue3CodeSPA;
    return reactCodeSPA;
}

const reactCodeSSR = `import React, { memo, useCallback } from 'react';
import { useStatus, useAccount, useChainId, useBalance, connect, Unit } from '@cfxjs/use-wallet-react/conflux';

const BasicUsage: React.FC = () => {
    const status = useStatus();

    return (
        <div>
            {status !== 'active' && (
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
                balance: {\`\${balance?.toDecimalStandardUnit()} CFX\`}
            </p>

            <button onClick={handleClickSendTransaction}>
                Send 1 native token to self (connected account)
            </button>
        </div>
    );
});

export default BasicUsage;`

const vue3CodeSSR = `//<script setup lang="ts">
import { useStatus, useAccount, useChainId, useBalance, connect, Unit, sendTransaction } from '@cfxjs/use-wallet-vue3/conflux';
const status = useStatus();
const account = useAccount();
const chainId = useChainId();
const balance = useBalance();

// Send 1 native token to self (connected account)
const handleClickSendTransaction = async () => {
    // For ts Type Guards. when status turn to 'active', account|chainId|balance must be exist.
    if (!account.value) return;

    try {
        const TxnHash = await sendTransaction({
            to: account.value,
            value: Unit.fromStandardUnit('1').toHexMinUnit(),
        });
        console.log(TxnHash);
    } catch (err) {
        console.error(err);
    }
};
</script>

<template>
    <div>
        <button v-if="status !== 'active'" @click="connect" :disabled="status !== 'not-active'">
            <template v-if="status === 'in-activating'">Connecting...</template>
            <template v-if="status === 'not-installed'">Fluent Not Install</template>
            <template v-if="status === 'not-active'">Connect Fluent</template>
        </button>
        <div v-else-if="status === 'active'">
            <p>account: {{ account }}</p>
            <p>chainId: {{ chainId }}</p>
            <p>balance: {{ \`\${balance?.toDecimalStandardUnit()} CFX\` }}</p>

            <button @click="handleClickSendTransaction">Send 1 native token to self (connected account)</button>
        </div>
    </div>
</template>
`

const getCodeSSR = (lib: 'react' | 'vue3' | 'svelte') => {
    if (lib === 'vue3') return vue3CodeSSR;
    if (lib === 'svelte') return vue3CodeSSR;
    return reactCodeSSR;
}

export default BasicUsage;