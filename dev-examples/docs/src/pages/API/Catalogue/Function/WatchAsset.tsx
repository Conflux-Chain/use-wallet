import React from 'react';
import Code from '@components/Code';
import useI18n, { compiled } from '@hooks/useI18n';
import useCurrentLib from '@hooks/useCurrentLib';

const transitions = {
    en: {
        step1: `The <code>watchAsset</code> function returns a Promise. Calling <code>watchAsset</code> when the status is <code>'active'</code> raises a confirmation box to allow the user to track the appropriate token in the wallet based on the input. If not called when <code>'active'</code>, the Promise will simply reject.`,
        step2: `A successful add will resolve <code>true</code>, a failed add may resolve <code>false</code> or reject. The behavior depends on the wallet.`,
    },
    zh: {
        step1: `<code>watchAsset</code> 函数返回一个 Promise。在 status 为 <code>'active'</code> 时调用 <code>watchAsset</code>，会根据入参调起确认框来允许用户在钱包中追踪相应的 token。如果不在 <code>'active'</code> 时调用，Promise 会直接 reject。`,
        step2: `成功添加会 resolve <code>true</code>，失败可能会 resolve <code>false</code>， 也可能 reject。具体行为取决于钱包。`,
    },
} as const;

const WatchAsset: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();
    const code = `interface WatchAssetParams {
    type: 'ERC20'; // In the future, other standards will be supported
    options: {
        address: string; // The address of the token contract
        symbol: string; // A ticker symbol or shorthand, up to 5 characters
        decimals: number; // The number of token decimals
        image: string; // A string url of the token logo
    };
}

declare const watchAsset: (param: WatchAssetParams) => Promise<boolean>;`;

    const usage = `import { watchAsset } from '@cfxjs/use-wallet-${currentLib}/conflux';

const handleWatchAsset = async() => {
    try {
        const res = await watchAsset(assetParams: WatchAssetParams);
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}`;

    return (
        <section>
            <h3>watchAsset</h3>

            <h4>declare:</h4>
            <Code language="ts">{code}</Code>

            <h4>Usage:</h4>
            <Code language="ts">{usage}</Code>

            <h4 className="mt-[16px]">Description:</h4>
            <p dangerouslySetInnerHTML={{ __html: i18n.step1 }} />
            <p dangerouslySetInnerHTML={{ __html: i18n.step2 }} />
        </section>
    );
};

export default WatchAsset;
