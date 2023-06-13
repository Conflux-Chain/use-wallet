import React from 'react';
import Code from '@components/Code';
import useI18n, { compiled } from '@hooks/useI18n';
import useCurrentLib from '@hooks/useCurrentLib';

const transitions = {
    en: {
        step1: `The <code>personalSign</code> function return a Promise. Calling <code>personalSign</code> when the status is <code>'active'</code> will invoke a wallet confirmation. If it is not called when <code>'active'</code>, the Promise will simply reject.`,
        step2: `A successful sign will resolve <code>hash-string</code>, a failed sign will reject.`,
    },
    zh: {
        step1: `<code>personalSign</code> 函数返回一个 Promise。在 status 为 <code>'active'</code> 时调用 <code>personalSign</code>，会根据入参调起钱包确认签名。如果不在 <code>'active'</code> 时调用，Promise 会直接 reject。`,
        step2: `成功签名会 resolve <code>hash-string</code>，失败则 reject。`,
    },
} as const;

const PersonalSign: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();

    const code = `declare const personalSign: (message: string) => Promise<string>;`;

    const usage = `import { personalSign } from '@cfxjs/use-wallet-${currentLib}/conflux';
    
const handlePersonalSign = async() =>{
    try {
        const signHash = await personalSign(message: string);
        console.log(signHash);
    } catch (err) {
        console.log(err);
    }
}`;

    return (
        <section>
            <h3>personalSign</h3>

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

export default PersonalSign;
