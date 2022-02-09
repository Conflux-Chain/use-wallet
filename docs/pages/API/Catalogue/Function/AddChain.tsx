import React from 'react';
import Code from '@components/Code';
import useI18n from '@hooks/useI18n';

const transitions = {
    en: {
        step1: `The addChain function return a Promise.calling addChain when the status is 'active' will invoke a wallet confirmation. If it is not called when 'active', the Promise will simply reject.`,
        step2: `A successful add will resolve null, a failed add will reject.`,
    },
    zh: {
        step1: `addChain 函数返回一个 Promise。在 status 为 'active' 时调用 addChain，会根据入参调起钱包确认框。如果不在 'active' 时调用，Promise 会直接 reject。`,
        step2: `成功添加会 resolve null，失败则 reject。`,
    },
} as const;

const AddChain: React.FC = () => {
    const i18n = useI18n(transitions);

    return (
        <section>
            <h3>addChain</h3>

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
interface AddChainParameter {
    chainId: string; // A 0x-prefixed hexadecimal string
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string; // 2-6 characters long
        decimals: 18;
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
    iconUrls?: string[]; // Currently ignored.
}

declare const addChain: (param: AddChainParameter) => Promise<null>;`;

export default AddChain;