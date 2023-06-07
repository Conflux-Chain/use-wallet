import React from 'react';
import Code from '@components/Code';
import useI18n, { compiled } from '@hooks/useI18n';
import useCurrentLib from '@hooks/useCurrentLib';

const transitions = {
    en: {
        step1: 'This example shows how to develop a basic Dapp in SPA (Single-Page Application) with <code>use-wallet</code>, using the conflux chain as an example.',
        title1: '1. Import wallet',
        step2: `In the main portal <code>'@cfxjs/use-wallet-{currentLib}/conflux'</code> import the conflux wallet (Fluent | Portal), to connect to the ethereum wallet just change the portal to <code>'@cfxjs/use-wallet-{currentLib}/ethereum'</code>.`,
        title2: '2. Get the current status of the wallet',
        step3: 'Use <code>useStatus</code> to get the current status of the wallet. The value of status is described later in the api, and a robust application should handle all the status. The code in the example covers all the status of the wallet from <strong>detection</strong> to <strong>connection completion</strong>.',
        step4: `Once you have successfully connected to the wallet (and obtained authorization from the wallet for the current url), you will be able to access information about your current account and issue transactions.`,
        title3: '3. Display wallet information and issue transactions',
        step5: `Use <code>useAccount</code>、<code>useChainId</code>、<code>useBalance</code>、<code>sendTransaction</code> to display wallet information and issue transactions.`,
        step6: '<code>use-wallet</code> does batch processing of account, chainId, and balance changes, they always change together during <strong>initialization of activated/authorized wallet connection/switching accounts</strong>, so you can use them without worrying about page jitter.',
        step7: '<code>use-wallet</code> also provides some utility functions to facilitate development. For example, the <a href="#/api/{currentLib}/utils">Unit util</a> in the example is used to convert and calculate the balance to binary values with sufficient precision.',
        ssr_step1: `In SSR (Server Side Render) / SSG (Static Site Generation), the <code>'in-detecting'</code> status in <code>useStatus</code> should no longer be a concern because of the pre-rendering process. In other words, it should be assumed that <strong>the detecting process is complete</strong> and the connect button can be displayed directly.`,
    },
    zh: {
        step1: '这个例子展示了在 SPA（Single-Page Application，单页应用）中如何用 <code>use-wallet</code> 开发一个基本的 Dapp，以 conflux 链为例。',
        title1: '1. 导入钱包',
        step2: `在主入口 <code>'@cfxjs/use-wallet-{currentLib}/conflux'</code> 导入 conflux 钱包（Fluent | Portal），连接 ethereum 钱包只需要把入口换成 <code>'@cfxjs/use-wallet-{currentLib}/ethereum'</code> 即可。`,
        title2: '2. 获取钱包当前状态',
        step3: '使用 <code>useStatus</code> 获取钱包当前状态，status 的取值会在后面的 api 中具体介绍，一个健壮的应用理应处理所有的状态。例子中的代码涵盖了钱包从<strong>探测</strong>到<strong>连接完成</strong>的所有状态。',
        step4: '当成功连接到钱包（取得钱包对当前 url 的授权）后，就可以获取当前账户的信息，以及签发交易了。',
        title3: '3. 展示钱包信息及签发交易',
        step5: `使用 <code>useAccount</code>、<code>useChainId</code>、<code>useBalance</code>、<code>sendTransaction</code> 展示钱包信息及签发交易。`,
        step6: `<code>use-wallet</code> 对 account、chainId、balance 的变动做了批处理,它们在<strong>初始化已激活/授权连接钱包/切换账户</strong>的过程中永远是一起变化的，你可以放心的使用它们而不用担心造成页面的抖动。`,
        step7: `<code>use-wallet</code> 也提供了一些工具函数方便开发。比如例子中的 <a href="#/api/{currentLib}/utils">Unit util</a>，用以对 balance 进行足够精度的进制转换、计算。`,
        ssr_step1: `SSR（Server Side Render，服务端渲染）/ SSG（Static Site Generation，静态页面生成）中，因为预渲染过程的存在，<code>useStatus</code> 中的 <code>'in-detecting'</code> 状态应该不再被关注。换而言之，应该假设<strong> detect 过程已经完成</strong>，可以直接显示连接按钮。`,
    },
} as const;

const BasicUsage: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();

    return (
        <>
            <section>
                <h3>basic usage SPA</h3>
                <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step1, {}) }} />
                <h4 className="my-[16px]">{i18n.title1}</h4>
                <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step2, { currentLib: currentLib }) }} />
                <h4 className="my-[16px]">{i18n.title2}</h4>
                <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step3, {}) }} />
                <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step4, { currentLib: currentLib }) }} />
                <h4 className="my-[16px">{i18n.title3}</h4>
                <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step5, {}) }} />
                <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step6, {}) }} />
                <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step7, { currentLib: currentLib }) }} />

                <Code className="mt-[16px]">{getCodeSPA(currentLib)}</Code>
            </section>

            <section>
                <h3>basic usage SSG</h3>
                <p dangerouslySetInnerHTML={{ __html: compiled(i18n.ssr_step1, {}) }} />
                <Code className="mt-[16px]">{getCodeSSR(currentLib)}</Code>
            </section>
        </>
    );
};

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

export default BasicUsage;`;

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
`;

const getCodeSPA = (lib: 'react' | 'vue3' | 'svelte') => {
    if (lib === 'vue3') return vue3CodeSPA;
    if (lib === 'svelte') return vue3CodeSPA;
    return reactCodeSPA;
};

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

export default BasicUsage;`;

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
`;

const getCodeSSR = (lib: 'react' | 'vue3' | 'svelte') => {
    if (lib === 'vue3') return vue3CodeSSR;
    if (lib === 'svelte') return vue3CodeSSR;
    return reactCodeSSR;
};

export default BasicUsage;
