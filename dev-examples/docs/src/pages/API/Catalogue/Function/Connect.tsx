import React from 'react';
import Code from '@components/Code';
import useI18n, { compiled } from '@hooks/useI18n';
import useCurrentLib from '@hooks/useCurrentLib';

const transitions = {
    en: {
        step1: `The <code>connect</code> function return a Promise. when the status is <code>'not-active'</code>, calling <code>connect</code> brings up the wallet's authorization popup and the status changes to <code>'in-activating'</code>.`,
        step2: `After agreeing to the authorization, the status will change to <code>'active'</code> and the return value in hooks such as <code>useAccount</code> will change from <code>undefined</code> to the corresponding value of the current account, and the returned Promise will resolve.`,
        step3: `If the authorization is denied, or if <code>connect</code> is called when status is not <code>'not-active'</code>, Promise will be rejected; `,
        step4: `if <code>connect</code> function is called when status is already <code>'active'</code>, Promise will be resolved.`,
        step5: `<strong>You should only allow users to call <code>connect</code> when the status is <code>'not-active'</code> by clicking on the button.</strong>`,
    },
    zh: {
        step1: `<code>connect</code> 函数返回一个 Promise。当 status 为 <code>'not-active'</code> 时，调用 <code>connect</code> 函数会调起钱包的授权弹框，同时 status 的状态变为 <code>'in-activating'</code>。`,
        step2: `同意授权后，status 会变为 <code>'active'</code>，同时 <code>useAccount</code> 等 hooks 中的返回值会从 <code>undefined</code> 变为当前账户相应的值，返回的 Promise 会 resolve。`,
        step3: `如果拒绝了授权，或者在 status 不为 <code>'not-active'</code> 时调用 <code>connect</code>，Promise 会 reject。`,
        step4: `如果在 status 已经是 <code>'active'</code> 时调用 <code>conect</code>，Promise 会直接 resolve。`,
        step5: `<strong>你应该只允许用户在 status 为 <code>'not-active'</code> 时点击按钮调用 <code>connect</code>。</strong>`,
    },
} as const;

const Connect: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();
    const code = `declare const connect: () => Promise<void>;`;
    const usage = `import { useStatus, connect } from '@cfxjs/use-wallet-${currentLib}/conflux';
    
const ConnectButton: React.FC = () =>{
    const status = useStatus();
    
    return (
        <div>
            {status !== 'in-detecting' && status !== 'active' && (
                <button
                    onClick={connect}
                    disabled={status !== 'not-active'}
                >
                    {status === 'in-activating' && 'connecting...'}
                    {status === 'not-installed' && 'Fluent Not Install'}
                    {status === 'not-active' && 'Connect Fluent'}
                </button>
            )}
        </div>
    )
}`;

    return (
        <section>
            <h3>connect</h3>

            <h4>declare:</h4>
            <Code language="ts">{code}</Code>

            <h4>Usage:</h4>
            <Code language="ts">{usage}</Code>

            <h4 className="mt-[16px]">Description:</h4>
            <p dangerouslySetInnerHTML={{ __html: i18n.step1 }} />
            <p dangerouslySetInnerHTML={{ __html: i18n.step2 }} />
            <p dangerouslySetInnerHTML={{ __html: i18n.step3 }} />
            <p dangerouslySetInnerHTML={{ __html: i18n.step4 }} />
            <p dangerouslySetInnerHTML={{ __html: i18n.step5 }} />
        </section>
    );
};

export default Connect;
