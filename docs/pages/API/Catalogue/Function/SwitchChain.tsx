import React from 'react';
import Code from '@components/Code';
import useI18n from '@hooks/useI18n';

const transitions = {
    en: {
        step1: `The switchChain function return a Promise.calling switchChain when the status is 'active' will invoke a wallet confirmation. If it is not called when 'active', the Promise will simply reject.`,
        step2: `A successful switch will resolve null, a failed switch will reject.`,
    },
    zh: {
        step1: `switchChain 函数返回一个 Promise。在 status 为 'active' 时调用 switchChain，会调起钱包确认框。如果不在 'active' 时调用，Promise 会直接 reject。`,
        step2: `成功切换会 resolve null，失败则 reject。`,
    },
} as const;

const SwitchChain: React.FC = () => {
    const i18n = useI18n(transitions);

    return (
        <section>
            <h3>switchChain</h3>

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

const code = `declare const switchChain: const switchChain: (chainId: string) => Promise<null>;`;

export default SwitchChain;