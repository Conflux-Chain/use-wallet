import React from 'react';
import Code from '@components/Code';
import useI18n, { compiled } from '@hooks/useI18n';
import useCurrentLib from '@hooks/useCurrentLib';

const transitions = {
    en: {
        step1: `<code>useBalance</code> returns the balance of the account in the current wallet. The <code>useAccount</code> will only have a return value if the wallet is authorized to connect, i.e. the status is <code>'active'</code>, otherwise it returns <code>undefined</code>.`,
        step2: `The return of <code>useBalance</code> is an instance object of <code>Unit</code>, whose value unit is the smallest unit of the currency ('drip' in conflux | 'wei' in ethereum). The details of how to operate this can be found in the <a href="#/api/{currentLib}/utils">Unit description in Utils</a>.`,
    },
    zh: {
        step1: `<code>useBalance</code> 返回当前钱包中账户的余额。只有当钱包已授权连接，即 status 为 <code>'active'</code> 时，<code>useAccount</code> 才会有返回值，否则返回 <code>undefined</code>。`,
        step2: `<code>useBalance</code> 的返回单位为 <code>Unit</code> 的实例对象，其内的 value 单位为币种的最小单位（'drip' in conflux | 'wei' in ethereum）。具体的操作方法可以见 <a href="#/api/{currentLib}/utils">Utils 中 Unit</a> 的具体介绍。`,
    },
} as const;

const UseBalance: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();
    const code = `declare const useBalance: () => Unit | undefined;`;
    const usage = `import { useBalance } from '@cfxjs/use-wallet-${currentLib}/conflux';
    
const balance = useBalance();  // Your balance Unit | undefined`;

    return (
        <section>
            <h3>useBalance</h3>

            <h4>declare:</h4>
            <Code language="ts">{code}</Code>

            <h4>Usage:</h4>
            <Code language="ts">{usage}</Code>

            <h4>Description:</h4>
            <p dangerouslySetInnerHTML={{ __html: i18n.step1 }} />
            <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step2, { currentLib: currentLib }) }} />
        </section>
    );
};

export default UseBalance;
