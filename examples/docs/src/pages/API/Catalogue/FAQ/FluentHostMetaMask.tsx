import useI18n, { useLocale } from '@hooks/useI18n';
import React from 'react';
import FluentAdvanceImgZh1 from '@assets/fluentAdvance1.jpg';
import FluentAdvanceImgZh2 from '@assets/fluentAdvance2.jpg';
import FluentAdvanceImgEn1 from '@assets/fluentAdvanceEn1.jpg';
import FluentAdvanceImgEn2 from '@assets/fluentAdvanceEn2.jpg';
import Code from '@components/Code';
import useCurrentLib from '@hooks/useCurrentLib';

const transitions = {
    en: {
        title1: `Open hosting:`,
        title2: `Determine if MetaMask is hosted:`,
        step1: `Turn on <strong>"Priority Connection"</strong> in Fluent's <strong>Advanced Settings</strong> to enable hosting. When hosting is enabled, Fluent will be <strong>the default wallet</strong> connection in any DApp that uses MetaMask.`,
        step2: `In the browser, the Fluent wallet injects the <code>window.conflux</code> object in the global scope, while MetaMask injects the <code>window.ethereum</code> object. When Fluent hosting is enabled, Fluent will modify the <code>window.ethereum</code> object in the browser to use Fluent by default when it needs to connect to MetaMask, thus enabling hosting of MetaMask.`,
        step3: `You can use the <code>isFluent</code> field in the <code>provider</code> to determine if the current MetaMask is hosted, and return <code>true</code> if it is hosted, otherwise return <code>false</code>.`,
        step4: `Determining whether a MetaMask is hosted should be done after wallet detection is complete, since the <code>provider</code> is <code>undefined</code> until detection is complete.`,
    },
    zh: {
        title1: `开启托管：`,
        title2: `判断 MetaMask 是否被托管：`,
        step1: `在 Fluent 的<strong>高级选项</strong>中打开<strong>“优先连接”</strong>，即可启用托管。启用托管后，在任何使用 MetaMask 的 DApp 中， Fluent 将会作为<strong>默认钱包</strong>连接。`,
        step2: `在浏览器中，Fluent 钱包在全局作用域中注入了 <code>window.conflux</code> 对象，而 MetaMask 则注入了 <code>window.ethereum</code> 对象。当启用了 Fluent 的托管功能后，Fluent 将修改浏览器中的 <code>window.ethereum</code> 对象，以便在需要连接到 MetaMask 时默认使用 Fluent，从而实现对 MetaMask 的托管。`,
        step3: `可以通过 <code>provider</code> 中的 <code>isFluent</code> 字段判断当前 MetaMask 是否被托管，被托管则返回 <code>true</code>，否则返回 <code>false</code>。`,
        step4: `判断 MetaMask 是否被托管应在钱包探测完毕后进行，因为 <code>provider</code> 在探测完成前为 <code>undefined</code>。`,
    },
} as const;

const FluentHostMetaMask: React.FC = () => {
    const i18n = useI18n(transitions);
    const local = useLocale();
    const currentLib = useCurrentLib();
    const code = `import { provider, completeDetect } from '@cfxjs/use-wallet-${currentLib}/ethereum';

let isMetaMaskHostedByFluent = false;
completeDetect().then(() => {
    if (provider?.isFluent) {
        isMetaMaskHostedByFluent = true;
    }
});`;

    return (
        <section>
            <h3>Fluent host MetaMask</h3>

            <h4>{i18n.title1}</h4>
            {local == 'en' && (
                <div className="flex justify-center">
                    <img src={FluentAdvanceImgEn1} alt="fluent_advance" className="w-[30%] h-[30%] mr-[40px]" />
                    <img src={FluentAdvanceImgEn2} alt="fluent_advance" className="w-[30%] h-[30%]" />
                </div>
            )}
            {local == 'zh' && (
                <div className="flex justify-center">
                    <img src={FluentAdvanceImgZh1} alt="fluent_advance" className="w-[30%] h-[30%] mr-[40px]" />
                    <img src={FluentAdvanceImgZh2} alt="fluent_advance" className="w-[30%] h-[30%]" />
                </div>
            )}
            <p dangerouslySetInnerHTML={{ __html: i18n.step1 }} />
            <p dangerouslySetInnerHTML={{ __html: i18n.step2 }} />

            <h4>{i18n.title2}</h4>
            <Code language="ts">{code}</Code>
            <p dangerouslySetInnerHTML={{ __html: i18n.step3 }} />
            <p dangerouslySetInnerHTML={{ __html: i18n.step4 }} />
        </section>
    );
};

export default FluentHostMetaMask;
