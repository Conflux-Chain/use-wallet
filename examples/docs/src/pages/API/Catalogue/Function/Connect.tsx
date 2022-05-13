import React from 'react';
import Code from '@components/Code';
import useI18n from '@hooks/useI18n';

const transitions = {
    en: {
        step1: `The connect function return a Promise. when the status is 'not-active', calling connect brings up the wallet's authorization popup and the status changes to 'in-activating'.`,
        step2: `After agreeing to the authorization, the status will change to 'active' and the return value in hooks such as useAccount will change from undefined to the corresponding value of the current account, and the returned Promise will resolve.`,
        step3: `If the authorization is denied, or if connect is called when status is not 'not-active', Promise will be rejected; if it is called when status is already 'active', Promise will be resolved.`,
        step4: `You should only allow users to call connect when the status is 'not-active' by clicking on the button.`
    },
    zh: {
        step1: `connect 函数返回一个 Promise。status 为 'not-active' 状态时，调用 connect 函数会调起钱包的授权弹框，同时 status 的状态变为 'in-activating'。`,
        step2: `同意授权后，status 会变为 'active'，同时 useAccount 等 hooks 中的返回值 会从 undefined 变为当前账户相应的值，返回的 Promise 会 resolve。`,
        step3: `如果拒绝了授权，或者在 status 不为 'not-active'时调用 connect，Promise 会 reject。status已经是 'active' 时调用，Promise 会直接 resolve。`,
        step4: `你应该只允许用户在 status 为 'not-active' 时点击按钮调用 connect。`
    },
} as const;

const Connect: React.FC = () => {
    const i18n = useI18n(transitions);

    return (
        <section>
            <h3>connect</h3>

            <h4>declare:</h4>
            <Code language='ts'>
                {code}
            </Code>

            <h4 className='mt-[16px]'>Description:</h4>
            <p>{i18n.step1}</p>
            <p>{i18n.step2}</p>
            <p>{i18n.step3}</p>
            <p><strong>{i18n.step4}</strong></p>
        </section>
    );
}

const code = `declare const connect: () => Promise<void>;`

export default Connect;