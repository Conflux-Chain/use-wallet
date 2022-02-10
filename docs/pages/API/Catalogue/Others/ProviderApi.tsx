import React from 'react';
import Code from '@components/Code';
import useI18n from '@hooks/useI18n';

const transitions = {
    en: {
        step1: `The 'provider' can be imported directly from use-wallet to use.It is the (conflux | ethereum) object in window. The difference is that it has a typescript declaration.`,
        step2: `Usually the functions wrapper by use-wallet are all that can be used in the development of a dapp. It is not recommended to use the provider directly.`,
    },
    zh: {
        step1: `可以从 use-wallet 中直接引入 provider 使用，它就是 window 中的(conflux | ethereum) 对象。区别是它带有 typescript 的声明。`,
        step2: `通常情况下 use-wallet 封装的这些功能，就是开发 dapp 中能用到的全部了。并不建议直接去使用 provider。`,
    },
} as const;

const Provider: React.FC = () => {
    const i18n = useI18n(transitions);

    return (
        <section>
            <h3>provider</h3>

            <h4>usage:</h4>
            <Code language='ts'>
                {code}
            </Code>

            <h4 className='mt-[16px]'>Description:</h4>
            <p>{i18n.step1}</p>
            <p>{i18n.step2}</p>
        </section>
    );
}

const code = `import { provider } from '@cfxjs/use-wallet';
// import { provider } from '@cfxjs/use-wallet/dist/ethereum';

// same as window.conflux | window.ethereum`

export default Provider;