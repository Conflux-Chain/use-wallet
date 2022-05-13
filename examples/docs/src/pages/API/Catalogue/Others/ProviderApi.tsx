import React from 'react';
import Code from '@components/Code';
import useI18n from '@hooks/useI18n';
import useCurrentLib from '@hooks/useCurrentLib';

const transitions = {
    en: {
        step1: `The 'provider' can be imported directly from use-wallet to use.It is the (conflux | ethereum) object in window. The difference is that it has a typescript declaration.`,
        step2: `Note that the value of the imported provider object is undefined until the detect process is completed.`,
    },
    zh: {
        step1: `可以从 use-wallet 中直接引入 provider 使用，它就是 window 中的(conflux | ethereum) 对象。区别是它带有 typescript 的声明。`,
        step2: `需要注意的是 import 的 provider对象，在 detect 过程完成之前，其值是 undefined。`,
    },
} as const;

const Provider: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();

    return (
        <section>
            <h3>provider</h3>

            <h4>declare:</h4>
            <Code language='ts'>
                {declare}
            </Code>

            <h4>usage:</h4>
            <Code language='ts'>
                {`import { provider } from '@cfxjs/use-wallet-${currentLib}/conflux';
// same as window.conflux`
                }
            </Code>

            <h4 className='mt-[16px]'>Description:</h4>
            <p>{i18n.step1}</p>
            <p>{i18n.step2}</p>
        </section>
    );
}

const declare = `declare const provider: Provider | undefined;`

export default Provider;