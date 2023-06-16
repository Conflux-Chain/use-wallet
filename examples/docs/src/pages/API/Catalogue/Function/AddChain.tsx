import React from 'react';
import Code from '@components/Code';
import useI18n, { compiled } from '@hooks/useI18n';
import useCurrentLib from '@hooks/useCurrentLib';

const transitions = {
    en: {
        step1: `The <code>addChain</code> function return a Promise. Calling <code>addChain</code> when the status is <code>'active'</code> will add a new chain by invoking the wallet confirmation box based on the input parameters. If it is not called when <code>'active'</code>, the Promise will simply reject.`,
        step2: `A successful add will resolve <code>null</code>, a failed add will reject.`,
    },
    zh: {
        step1: `<code>addChain</code> 函数返回一个 Promise。在 status 为 <code>'active'</code> 时调用 <code>addChain</code>，会根据入参调起钱包确认框来添加一条新链。如果不在 <code>'active'</code> 时调用，Promise 会直接 reject。`,
        step2: `成功添加会 resolve <code>null</code>，失败则 reject。`,
    },
} as const;

const AddChain: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();

    const code = `interface AddChainParameter {
    chainId: string; // A 0x-prefixed hexadecimal string
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string; // 2-6 characters long
        decimals: number;
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
    iconUrls?: string[]; // Currently ignored.
}
    
declare const addChain: (param: AddChainParameter) => Promise<null>;`;

    const usage = `import { addChain } from '@cfxjs/use-wallet-${currentLib}/conflux';
    
const handleAddChain = async() => {
    try {
        await addChain(chainParams: AddChainParameter);
    } catch (err) {
        console.log(err);
    }
}`;

    return (
        <section>
            <h3>addChain</h3>

            <h4>declare:</h4>
            <Code language="ts">{code}</Code>

            <h4>Usage:</h4>
            <Code language="ts">{usage}</Code>

            <h4>Description:</h4>
            <p dangerouslySetInnerHTML={{ __html: i18n.step1 }} />
            <p dangerouslySetInnerHTML={{ __html: i18n.step2 }} />
        </section>
    );
};

export default AddChain;
