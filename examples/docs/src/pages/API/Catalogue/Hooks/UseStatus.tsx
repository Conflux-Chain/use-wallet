import React from 'react';
import Code from '@components/Code';
import useI18n, { compiled } from '@hooks/useI18n';
import useCurrentLib from '@hooks/useCurrentLib';

const transitions = {
    en: {
        step1: `<code>useStatus</code> return the current status of the wallet. There are <code>"in-detecting"</code> | <code>"not-installed"</code> | <code>"not-active"</code> | <code>"in-activating"</code> | <code>"active"</code>.`,
        step2: `Initially <code>'use-wallet'</code> needs to detect the wallet-injected Provider with the value <code>'in-detecting'</code>. This process takes very little time, just a few ms, so you don't need to pay attention to this phase or write transition state on the UI for this phase.`,
        step3: `As you can see in the example in <a href="#/api/{currentLib}/basic">basic usage SPA</a>, when the status is <code>'in-detecting'</code>, no content should be rendered, and it is a bad user experience to render transition content for a very short time. However, this may cause the content block to jitter when refreshing the page, so a <code>completeDetect</code> method is also provided to call ReactDOM.render after the detection is complete, see <a href="#/api/{currentLib}/others">Others</a> for details.`,
        step4: `<strong>In SSR, because of the pre-rendering process, <code>'in-detecting'</code> should be ignored, assuming that detection is complete and the connect button should display directly. Otherwise, the pre-rendered page is blank.</strong>`,
        step5: `After detection, if the corresponding wallet is not installed, the status value will change to <code>'not-installed'</code>. At this point you should use a library like <code>'@metamask/onboarding'</code> to guide the user to install the wallet.`,
        step6: `After detection, if the corresponding wallet is installed, <strong>user authorization has been obtained</strong> and <strong>is not currently locked</strong>, the status value will change to <code>"active"</code>. At this point the wallet's current account information can be obtained without any problems via other hooks.`,
        step7: `After detection, if the corresponding wallet is installed but <strong>>not authorized to connect</strong> or <strong>is locked</strong>, the status value will change to <code>'not-active'</code>. At this point the user should be directed to call the <code>connect</code> function to activate the wallet.`,
        step8: `When the <code>connect</code> function is called, the status changes to <code>'in-activating'</code>. It will change to <code>'active'</code> after successful <strong>authorization/unlocking</strong> and to <code>'not-active'</code> if it fails.`,
    },
    zh: {
        step1: `<code>useStatus</code> 返回当前钱包的状态。共有 <code>"in-detecting"</code> | <code>"not-installed"</code> | <code>"not-active"</code> | <code>"in-activating"</code> | <code>"active"</code> 这几种。`,
        step2: `初始时 <code>'use-wallet'</code> 需要探测钱包注入的 Provider 以及钱包的连接状态，此时 status 的值为 <code>'in-detecting'</code>。探测过程只耗时 50-100ms，所以你不需要关注这个阶段，也不需要为这个阶段写 UI 上的过渡状态。`,
        step3: `可以看到 <a href="#/api/{currentLib}/basic">basic usage SPA</a> 中的例子， status 为 'in-detecting' 的时候，理应不渲染任何内容，为极短的时间渲染过渡内容反而是一种不好的用户体验。但是这可能会导致刷新页面时内容块的抖动，所以也提供了一个 <code>completeDetect</code> 方法用以在 detect 完成后再去调用 ReactDOM.render，具体见 <a href="#/api/{currentLib}/others">Others</a>。`,
        step4: `<strong>在 SSR 中，因为预渲染过程的存在，应该忽略 <code>'in-detecting'</code>，假设已经 detect 完成并直接显示连接按钮。否则预渲染的页面就是一片空白。</strong>`,
        step5: `探测完毕后，如果对应钱包未安装，status 的值将变为 <code>'not-installed'</code>。此时你应该使用类似于 <code>'@metamask/onboarding'</code> 的库引导用户安装钱包。`,
        step6: `探测完毕后，如果对应钱包已安装、<strong>已取得用户授权</strong>且当前<strong>不处于锁屏状态</strong>，status 的值将变为 <code>'active'</code>。此时可以顺利通过其他 hooks 获取钱包当前账户信息。`,
        step7: `探测完毕后，如果对应钱包已安装，但是<strong>未授权连接</strong>或者<strong>处于锁屏状态</strong>，status 的值将变为 <code>'not-active'</code>。此时应该引导用户调用 <code>connect</code> 函数激活钱包。`,
        step8: `当 <code>connect</code> 函数被调用后，status 的值将变为 <code>'in-activating'</code>，并会在<strong>成功取得授权 / 解锁</strong>后变为 <code>'active'</code>，失败则变为 <code>'not-active'</code>。`,
    },
} as const;

const UseStatus: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();
    const code = `declare const useStatus: () => "in-detecting" | "not-installed" | "not-active" | "in-activating" | "active";`;
    const usage = `import { useStatus } from '@cfxjs/use-wallet-${currentLib}/conflux';

const status = useStatus(); //"in-detecting" | "not-installed" | "not-active" | "in-activating" | "active"`;

    return (
        <section>
            <h3>useStatus</h3>

            <h4>declare:</h4>
            <Code language="ts">{code}</Code>

            <h4>Usage:</h4>
            <Code language="ts">{usage}</Code>

            <h4>Description:</h4>
            <p dangerouslySetInnerHTML={{ __html: i18n.step1 }} />

            <p className="font-bold">
                <code>in-detecting:</code>
            </p>
            <p dangerouslySetInnerHTML={{ __html: i18n.step2 }} />
            <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step3, { currentLib: currentLib }) }} />
            <p dangerouslySetInnerHTML={{ __html: i18n.step4 }} />

            <p className="font-bold">
                <code>not-installed:</code>
            </p>
            <p dangerouslySetInnerHTML={{ __html: i18n.step5 }} />

            <p className="font-bold">
                <code>active:</code>
            </p>
            <p dangerouslySetInnerHTML={{ __html: i18n.step6 }} />

            <p className="font-bold">
                <code>not-active:</code>
            </p>
            <p dangerouslySetInnerHTML={{ __html: i18n.step7 }} />

            <p className="font-bold">
                <code>in-activating:</code>
            </p>
            <p dangerouslySetInnerHTML={{ __html: i18n.step8 }} />
        </section>
    );
};

export default UseStatus;
