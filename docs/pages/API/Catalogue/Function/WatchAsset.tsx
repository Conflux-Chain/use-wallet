import React from 'react';
import Code from '@components/Code';
import useI18n from '@hooks/useI18n';

const transitions = {
    en: {
        step1: `The watchAsset function return a Promise.calling watchAsset when the status is 'active' will invoke a wallet confirmation. If it is not called when 'active', the Promise will simply reject.`,
        step2: `A successful add will resolve true, a failed add may resolve false or reject.The behavior depends on the wallet.`,
    },
    zh: {
        step1: `watchAsset 函数返回一个 Promise。在 status 为 'active' 时调用 watchAsset，会根据入参调起钱包确认框。如果不在 'active' 时调用，Promise 会直接 reject。`,
        step2: `成功添加会 resolve true，失败可能会 resolve false， 也可能 reject。具体行为取决于钱包。`,
    },
} as const;

const WatchAsset: React.FC = () => {
    const i18n = useI18n(transitions);

    return (
        <section>
            <h3>watchAsset</h3>

            <h4>declare:</h4>
            <Code language='ts'>
                {code}
            </Code>

            <h4 className='mt-[16px]'>Description:</h4>
            <p>{i18n.step1}</p>
            <p>{i18n.step2}</p>
        </section>
    );
}

const code = `
interface WatchAssetParams {
    type: 'ERC20'; // In the future, other standards will be supported
    options: {
        address: string; // The address of the token contract
        symbol: string; // A ticker symbol or shorthand, up to 5 characters
        decimals: number; // The number of token decimals
        image: string; // A string url of the token logo
    };
}

declare const watchAsset: (param: WatchAssetParams) => Promise<boolean>;`;

export default WatchAsset;