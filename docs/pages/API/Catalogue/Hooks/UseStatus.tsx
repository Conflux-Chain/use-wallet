import React from 'react';
import Code from '@components/Code';
import useI18n from '@hooks/useI18n';

const transitions = {
    en: {
        step1: `useStatus return the current status of the wallet. There are "in-detecting" | "not-installed" | "not-active" | "in-activating" | "active".`,
        step2: `Initially 'use-wallet' needs to detect the wallet-injected Provider with the value 'in-detecting'. This process takes very little time, just a few ms, so you don't need to pay attention to this phase or write transition state on the UI for this phase.`,
        step3: `After detection, if the corresponding wallet is not installed, the value will be 'not-installed'. At this point you should use something like @metamask/onboarding to guide the user to install the wallet.`,
        step4: `After detection, if the corresponding wallet is installed, authorized and not locked, its value will be 'active'. At this point you can get the wallet's current account information through other hooks without any problems.`,
        step5: `After detection, if the corresponding wallet is installed but not authorized to connect or is locked, the value will be 'not-active'. At this point you should direct the user to click the button to call the connect function to activate the wallet.`,
        step6: `When the connect function is called, the status changes to 'in-activating'. It will change to 'active' after successful authorization/unlocking and to 'not-active' if it fails.`
    },
    zh: {
        step1: `useStatus 返回当前钱包的状态。共有 "in-detecting" | "not-installed" | "not-active" | "in-activating" | "active" 这几种。`,
        step2: `初始时 'use-wallet' 需要探测钱包注入的 Provider，其值为 'in-detecting'。这一过程耗时极短，只需要几ms。所以你不需要关注这个阶段，也不需要为这个阶段写 UI 上的过渡状态。`,
        step3: `探测完毕后， 如果对应钱包未安装，其值变为 'not-installed'。此时你应该使用 @metamask/onboarding 这样的东西来引导用户安装钱包。`,
        step4: `探测完毕后， 如果对应钱包已安装，并且已取得过授权、也没有锁屏，其值变为 'active'。这时候你可以顺利通过其他 hooks 拿到钱包当前账户信息。`,
        step5: `探测完毕后， 如果对应钱包已安装，但是 未授权连接 或者 处于锁屏状态，其值变为 'not-active'。这时候你应该引导用户点击按钮来发起 connect 函数的调用以激活钱包，`,
        step6: `connect 函数被调用后，status 变为 'in-activating'。并会在 成功取得授权 / 解锁 后变为 'active'，失败则变为 'not-active'。`
    },
} as const;

const UseStatus: React.FC = () => {
    const i18n = useI18n(transitions);

    return (
        <dt>
            <h3>useStatus</h3>

            <h4>declare:</h4>
            <Code language='ts'>
                {code}
            </Code>

            <h4 className='mt-[16px]'>Description:</h4>
            <p>{i18n.step1}</p>
            <p>{i18n.step2}</p>
            <p>{i18n.step3}</p>
            <p>{i18n.step4}</p>
            <p>{i18n.step5}</p>
            <p>{i18n.step6}</p>
        </dt>
    );
}

const code = `declare const useStatus: () => "in-detecting" | "not-installed" | "not-active" | "in-activating" | "active";`

export default UseStatus;