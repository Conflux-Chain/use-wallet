import React from 'react';
import Code from '@components/Code';
import useI18n from '@hooks/useI18n';
import useCurrentLib from '@hooks/useCurrentLib';

const transitions = {
    en: {
        step1: `The <code>'provider'</code> can be imported directly from <code>use-wallet</code> to use. It is the (conflux | ethereum) object in window. The difference is that it has a <code>typescript</code> declaration.`,
        step2: `Note that the value of the imported <code>provider</code> object is <code>undefined</code> until the detect process is completed.`,
    },
    zh: {
        step1: `可以从 <code>use-wallet</code> 中直接引入 <code>provider</code> 使用，它就是 window 中的 (conflux | ethereum) 对象。区别是它带有 <code>typescript</code> 的声明。`,
        step2: `需要注意的是在 detect 过程完成之前，import 的 <code>provider</code> 对象值是 <code>undefined</code>。`,
    },
} as const;

const Provider: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();

    const declare = `declare const provider: Provider | undefined;`;

    const usage = `import { provider } from '@cfxjs/use-wallet-${currentLib}/conflux';
// same as window.conflux`;

    return (
        <section>
            <h3>provider</h3>

            <h4>declare:</h4>
            <Code language="ts">{declare}</Code>

            <h4>Usage:</h4>
            <Code language="ts">{usage}</Code>

            <h4>Description:</h4>
            <p dangerouslySetInnerHTML={{ __html: i18n.step1 }} />
            <p dangerouslySetInnerHTML={{ __html: i18n.step2 }} />
        </section>
    );
};

export default Provider;
