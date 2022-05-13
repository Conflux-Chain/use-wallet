import React from 'react';
import Code from '@components/Code';
import useI18n, { compiled } from '@hooks/useI18n';
import useCurrentLib from '@hooks/useCurrentLib';

const transitions = {
    en: {
        step1: `useBalance return current account in the wallet. useBalance will only return a value if the status is 'active' for an authorized connection.`,
        step2: `The return of useBalance is an instance object of Unit, whose value unit is the smallest unit of the currency ('drip' in conflux | 'wei' in ethereum). The details of how to operate this can be found in the <a href="#/api/{currentLib}/utils">Unit description in Utils</a>.`
    },
    zh: {
        step1: `useBalance 返回当前钱包中账户的余额。只有当 status 为 'active' 的已授权连接状态，useBalance 才会有返回值。`,
        step2: `useBalance 的返回单位为 Unit 的实例对象，其内的 value 单位为币种的最小单位（'drip' in conflux | 'wei' in ethereum）。具体的操作方法可以见 <a href="#/api/{currentLib}/utils">Utils 中 Unit</a> 的具体介绍。`
    },
} as const;

const UseBalance: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();

    return (
        <section>
            <h3>useBalance</h3>

            <h4>declare:</h4>
            <Code language='ts'>
                {code}
            </Code>

            <h4 className='mt-[16px]'>Description:</h4>
            <p>{i18n.step1}</p>
            <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step2, { currentLib: currentLib }) }}/>
        </section>
    );
}

const code = `declare const useBalance: () => Unit | undefined;`

export default UseBalance;