import React from 'react';
import Code from '@components/Code';
import useI18n, { compiled } from '@hooks/useI18n';
import useCurrentLib from '@hooks/useCurrentLib';

const transitions = {
    en: {
        step1: `The <code>switchChain</code> function returns a Promise. Calling <code>switchChain</code> when the status is <code>'active'</code> raises the wallet confirmation box to switch the chain. If it is not called when <code>'active'</code>, the Promise will simply reject.`,
        step2: `A successful switch will resolve <code>null</code>, a failed switch will reject.`,
    },
    zh: {
        step1: `<code>switchChain</code> 函数返回一个 Promise。在 status 为 <code>'active'</code> 时调用 <code>switchChain</code>，会调起钱包确认框来切换链。如果不在 <code>'active'</code> 时调用，Promise 会直接 reject。`,
        step2: `成功切换会 resolve <code>null</code>，失败则 reject。`,
    },
} as const;

const SwitchChain: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();

    const code = `declare const switchChain: const switchChain: (chainId: string) => Promise<null>;`;

    const usage = `import { switchChain } from '@cfxjs/use-wallet-${currentLib}/conflux';

const handleSwitchChain = async() => {
    try {
        await switchChain(chainId: string);
    } catch (err) {
        console.log(err);
    }
}`;

    return (
        <section>
            <h3>switchChain</h3>

            <h4>declare:</h4>
            <Code language="ts">{code}</Code>

            <h4>Usage:</h4>
            <Code language="ts">{usage}</Code>

            <h4 className="mt-[16px]">Description:</h4>
            <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step1, {}) }} />
            <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step2, {}) }} />
        </section>
    );
};

export default SwitchChain;
