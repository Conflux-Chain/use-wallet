import React from 'react';
import Code from '@components/Code';
import useI18n from '@hooks/useI18n';

const transitions = {
    en: {
        step1: `The Promise returned by the completeDetect function is resolved after the completion of the detect process and can be used to skip the 'in-detecting' phase.`,
        step2: `In other words, the entire page is not loaded until the detection process is completed in about 50-100ms, displaying a full page blank to prevent content block jitter caused by the 'in-detecting' phase.`,
    },
    zh: {
        step1: `completeDetect 函数返回的 Promise 在 detect 过程完成后被 resolve。可以用来整体地跳过 status 为 'in-detecting' 阶段。`,
        step2: `换而言之，在大约 50-100ms 的 detect 过程完成前，不去加载整个页面显示整页的空白，来防止 'in-detecting' 阶段造成的内容块抖动。`,
    },
} as const;

const CompleteDetect: React.FC = () => {
    const i18n = useI18n(transitions);

    return (
        <section>
            <h3>completeDetect</h3>

            <h4>declare & usage:</h4>
            <Code language='ts'>
                {code}
            </Code>

            <h4 className='mt-[16px]'>Description:</h4>
            <p>{i18n.step1}</p>
            <p>{i18n.step2}</p>
        </section>
    );
}

const code = `declare const completeDetect: () => Promise<void>;
import { completeDetect } from '@cfxjs/use-wallet';
import { completeDetect as completeDetectEthereum } from '@cfxjs/use-wallet/dist/ethereum';

completeDetect().then(() => {
    ReactDOM.render(
        <React.StrictMode>
            <Router />
        </React.StrictMode>,
        document.getElementById('root'),
    );
});

Promise.all([completeDetect(), completeDetectEthereum()]).then(() => {
    ReactDOM.render(
        <React.StrictMode>
            <Router />
        </React.StrictMode>,
        document.getElementById('root'),
    );
});`

export default CompleteDetect;