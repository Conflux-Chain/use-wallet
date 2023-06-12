import React from 'react';
import Code from '@components/Code';
import useI18n, { compiled } from '@hooks/useI18n';
import useCurrentLib from '@hooks/useCurrentLib';

const transitions = {
    en: {
        step1: `<code>useAccount</code> returns the account in the current wallet. <code>useAccount</code> will only have a return value if the wallet is authorized to connect, i.e. the status is <code>'active'</code>, otherwise it returns <code>undefined</code>.`,
    },
    zh: {
        step1: `<code>useAccount</code> 返回当前钱包中的账户。只有当钱包已授权连接，即 status 为 <code>'active'</code> 时，<code>useAccount</code> 才会有返回值，否则返回 <code>undefined</code>。`,
    },
} as const;

const UseAccount: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();
    const code = `declare const useAccount: () => string | undefined;`;
    const usage = `import { useAccount } from '@cfxjs/use-wallet-${currentLib}/conflux';
    
const account = useAccount(); // your account | undefined`;

    return (
        <section>
            <h3>useAccount</h3>

            <h4>declare:</h4>
            <Code language="ts">{code}</Code>

            <h4>Usage</h4>
            <Code language="ts">{usage}</Code>

            <h4 className="mt-[16px]">Description:</h4>
            <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step1, {}) }} />
        </section>
    );
};

export default UseAccount;
