import React from 'react';
import Code from '@components/Code';
import useI18n from '@hooks/useI18n';

const transitions = {
    en: {
        step1: `The default import of @cfxjs/use-wallet is conflux wallet (fluent | portal). The ethereum wallet (metamask) can simply import from @cfxjs/use-wallet/dist/ethereum. There is no difference in their usage and presentation.`,
    },
    zh: {
        step1: `@cfxjs/use-wallet 默认 import 的是 conflux 钱包(fluent | portal)。以太坊钱包(metamask) 从 @cfxjs/use-wallet/dist/ethereum 中引入即可。它们在使用和表现上没有任何区别。`,
    },
} as const;

const Install: React.FC = () => {
    const i18n = useI18n(transitions);

    return (
        <section>
            <h3>install</h3>
            <Code language='ts'>
                {codeInstall}
            </Code>

            <h3 className='mt-[40px]'>import</h3>
            <Code language='ts'>
                {codeImport}
            </Code>

            <h4 className='mt-[16px]'>Description:</h4>
            <p>{i18n.step1}</p>
        </section>
    );
}

const codeInstall = `npm install @cfxjs/use-wallet decimal.js --save
yarn add @cfxjs/use-wallet decimal.js`

const codeImport = `import { useStatus, useAccount, useChainId, useBalance, connect, ... } from '@cfxjs/use-wallet';
import { useStatus, useAccount, useChainId, useBalance, connect, ... } from '@cfxjs/use-wallet/dist/ethereum';`

export default Install;