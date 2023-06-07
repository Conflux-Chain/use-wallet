import React from 'react';
import Code from '@components/Code';
import useI18n from '@hooks/useI18n';
import useCurrentLib from '@hooks/useCurrentLib';

const transitions = {
    en: {
        step1: `The Promise returned by the <code>completeDetect</code> function is resolved after the completion of the detect process and can be used to skip the <code>'in-detecting'</code> phase.`,
        step2: `In other words, instead of loading the entire page until the detection process is completed in about 50-100ms, the entire page is displayed blank to prevent content block jitter caused by the <code>'in-detecting'</code> phase.`,
    },
    zh: {
        step1: `<code>completeDetect</code> 函数返回的 Promise 在 detect 过程完成后被 resolve。可以用来整体地跳过 status 为 <code>'in-detecting'</code> 的阶段。`,
        step2: `换而言之，在大约 50-100ms 的 detect 过程完成前不去加载整个页面，而是显示整页的空白来防止 <code>'in-detecting'</code> 阶段造成的内容块抖动。`,
    },
} as const;

const CompleteDetect: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();

    return (
        <section>
            <h3>completeDetect</h3>

            <h4>declare:</h4>
            <Code language="ts">{declare}</Code>

            <h4>Usage:</h4>
            <Code language="ts">{getCode(currentLib)}</Code>

            <h4 className="mt-[16px]">Description:</h4>
            <p dangerouslySetInnerHTML={{ __html: i18n.step1 }} />
            <p dangerouslySetInnerHTML={{ __html: i18n.step2 }} />
        </section>
    );
};

const declare = `declare const completeDetect: () => Promise<void>;`;

const reactCode = `import ReactDOM from 'react-dom/client';
import App from './App';
import { completeDetect as completeDetectConflux } from '@cfxjs/use-wallet-react/conflux';
import { completeDetect as completeDetectEthereum } from '@cfxjs/use-wallet-react/ethereum';

Promise.all([completeDetectConflux(), completeDetectEthereum()]).then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
});
`;

const vueCode = `import { createApp } from 'vue';
import App from './App.vue';
import { completeDetect as completeDetectConflux } from '@cfxjs/use-wallet-vue3/conflux';
import { completeDetect as completeDetectEthereum } from '@cfxjs/use-wallet-vue3/ethereum';

Promise.all([completeDetectConflux(), completeDetectEthereum()]).then(() => {
    createApp(App).mount('#app');
});
`;

const getCode = (lib: 'react' | 'vue3' | 'svelte') => {
    if (lib === 'vue3') return vueCode;
    if (lib === 'svelte') return vueCode;
    return reactCode;
};
export default CompleteDetect;
