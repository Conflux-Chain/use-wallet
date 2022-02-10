import React, { memo, useState, useCallback, useEffect, useMemo } from 'react';
import { useTransition, useSpring, useChain, config, a, useSpringRef } from '@react-spring/web';
import CustomScrollbar from 'custom-react-scrollbar';
import cx from 'clsx';
import Keyboard from 'custom-keyboard';
import useI18n from '@hooks/useI18n';
import useClickOutside from '@hooks/useClickOutside';
import useMeasure from '@hooks/useMeasure';
import ConnectDemo from './Connect';
import ConnectBothDemo from './ConnectBoth';
import ConnectSwitch from './ConnectSwitch';
import SendTransaction from './SendTransaction';
import Sign from './Sign';
import AddSwitch from './AddSwitch';
import Code from '@assets/code.svg';

const demos = [
    {
        title: 'demo_connect_title',
        introduce: 'demo_connect_introduce',
        Demo: ConnectDemo,
        code: 'https://github.com/Conflux-Chain/use-wallet/blob/main/docs/pages/Demo/Connect/index.tsx'
    },
    {
        title: 'demo_connect_both_title',
        introduce: 'demo_connect_both_introduce',
        Demo: ConnectBothDemo,
        code: 'https://github.com/Conflux-Chain/use-wallet/blob/main/docs/pages/Demo/ConnectBoth/index.tsx'
    },
    {
        title: 'demo_connect_switch_title',
        introduce: 'demo_connect_switch_introduce',
        Demo: ConnectSwitch,
        code: 'https://github.com/Conflux-Chain/use-wallet/blob/main/docs/pages/Demo/ConnectSwitch/index.tsx'
    },
    {
        title: 'demo_send_transaction_title',
        introduce: 'demo_send_transaction_introduce',
        Demo: SendTransaction,
        code: 'https://github.com/Conflux-Chain/use-wallet/blob/main/docs/pages/Demo/SendTransaction/index.tsx'
    },
    {
        title: 'demo_sign_title',
        introduce: 'demo_sign_introduce',
        Demo: Sign,
        code: 'https://github.com/Conflux-Chain/use-wallet/blob/main/docs/pages/Demo/Sign/index.tsx'
    },
    {
        title: 'demo_addSwitch_title',
        introduce: 'demo_addSwitch_introduce',
        Demo: AddSwitch,
        code: 'https://github.com/Conflux-Chain/use-wallet/blob/main/docs/pages/Demo/AddSwitch/index.tsx'
    },
] as const;

const demosMap = Object.fromEntries(demos.map((demo) => [demo.title, demo])) as Record<typeof demos[number]['title'], typeof demos[number]>;

const transitions = {
    en: {
        demo_connect_title: 'Connect fluent wallet',
        demo_connect_introduce: `The first step of Dapp, connect your wallet.Then you can get information about your current account.`,
        demo_connect_both_title: 'Connect both fluent and metamask',
        demo_connect_both_introduce:
            'A dapp that needs to cross-chain, or conflux cross-space, needs to connect to multiple wallets at the same time.',
        demo_connect_switch_title: 'Switch connect wallet with the same code',
        demo_connect_switch_introduce:
            `Maybe you need to make a dapp that supports both Conflux and Ethereum, and don't want to maintain two similar pieces of code.`,
        demo_send_transaction_title: 'Send Transaction',
        demo_send_transaction_introduce: `This example demonstrates how to send a transaction.`,
        demo_sign_title: 'Sign',
        demo_sign_introduce: 'Use use-wallet wrapped personalSign and typedSign method signatures.',
        demo_addSwitch_title: 'add/switch chain and watchAsset',
        demo_addSwitch_introduce: 'Add/switch chain and add token using use-wallet wrapper methods',
    },
    zh: {
        demo_connect_title: '连接 fluent 钱包',
        demo_connect_introduce: `Dapp 的第一步，连接你的钱包。然后可以获取当前账户的信息。`,
        demo_connect_both_title: '同时连接 fluent 和 metamask',
        demo_connect_both_introduce: '需要跨链的 dapp，或者是 conflux 跨space 的 dapp，需要同时连接多个钱包。',
        demo_connect_switch_title: '同一份代码切换连接的钱包',
        demo_connect_switch_introduce:
            '也许你需要做一个同时支持 Conflux 和 Ethereum 的 dapp，又不想维护两份相似的代码。',
        demo_send_transaction_title: '发起交易',
        demo_send_transaction_introduce: `这个例子演示了如何发起一笔交易。`,
        demo_sign_title: '签名',
        demo_sign_introduce: '使用 use-wallet 封装的 personalSign 和 typedSign 的方法签名。',
        demo_addSwitch_title: '添加/切换链 以及 添加token',
        demo_addSwitch_introduce: '使用 use-wallet 封装方法 添加/切换链 以及 添加token。',
    },
} as const;

const DemoPage: React.FC = () => {
    const i18n = useI18n(transitions);

    const [currentDemoTitle, setCurrentDemoTitle] = useState<keyof typeof demosMap>(
        () => {
            const last = localStorage.getItem('current-demo') as keyof typeof demosMap;
            if (!last || !demosMap[last]) return 'demo_connect_title';
            return last;
        }
    );
    const [currentRef, rect] = useMeasure();
    const currentDemo = useMemo(() => demosMap[currentDemoTitle], [currentDemoTitle]);
    const handleChangeDemo = useCallback((demoTitle: keyof typeof demosMap) => {
        setCurrentDemoTitle(demoTitle);
        setOpen(false);
        localStorage.setItem('current-demo', demoTitle);
    }, []);

    const [open, setOpen] = useState(false);
    const openPanel = useCallback(() => setOpen(true), []);
    const closePanel = useCallback(() => setOpen(false), []);
    const panelRef = useClickOutside(closePanel);
    useEffect(() => {
        Keyboard.mount();
        const listener = Keyboard.bind('esc', closePanel);

        return () => {
            Keyboard.unmount();
            if (!listener) return;
            Keyboard.unbind(listener);
        };
    }, []);

    const currentDemoSpringRef = useSpringRef();
    const currentDemoStyle = useSpring({
        ref: currentDemoSpringRef,
        config: { duration: 150, clamp: true },
        from: { opacity: 1 },
        to: {
            opacity: open ? 0 : 1,
        },
    });

    const panelSpringRef = useSpringRef();
    const panelStyle = useSpring({
        ref: panelSpringRef,
        config: { ...config.stiff, clamp: true },
        from: { borderColor: 'transparent', translateX: '-50%', width: 480, height: rect.height },
        to: {
            translateX: '-50%',
            width: open ? Math.min(window.innerWidth * .8, 1024) : 480,
            height: open ? 460: rect.height,
            borderColor: open ? 'var(--color-primary)' : 'transparent',
        },
    });

    const transApi = useSpringRef();
    const transition = useTransition(open ? demos : [], {
        keys: (demo) => demo.title,
        ref: transApi,
        trail: 300 / demos.length,
        config: { clamp: true },
        from: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0 },
    });

    useChain(
        open ? [currentDemoSpringRef, panelSpringRef, transApi] : [transApi, panelSpringRef, currentDemoSpringRef],
        open ? [0, 0.1, 0.2] : [0, 0.48, 0.57],
    );
    
    return (
        <>
            <a.dl
                ref={panelRef}
                className={cx(
                    'absolute top-12 left-1/2 translate-x-[-50%] max-w-[1024px] rounded-md bg-primarytrans dark:bg-[#4b5563] border-4 border-transparent contain-strict transition-colors not-transition-border-color z-10',
                    !open && 'pointer-events-none',
                )}
                style={panelStyle}
            >   
                <CustomScrollbar  className='h-[460px]' contentClassName='w-full pt-4 pb-5 flex flex-wrap justify-center items-stretch gap-4'>
                    {transition(
                        (style, demo) =>
                            demo && (
                                <a.div
                                    className={cx(
                                        'w-[480px] max-w-[100%] px-6 py-4 rounded-md shadow-md border-2 border-transparent transition-colors hover:border-primary bg-white dark:bg-[#374151]',
                                        demo.title === currentDemo.title ? 'border-primary pointer-events-none' : 'hover:border-dashed cursor-pointer',
                                    )}
                                    style={style}
                                    onClick={() => handleChangeDemo(demo.title)}
                                >
                                    <div className="text-lg font-semibold text-text1 transition-colors">{i18n[demo.title]}</div>
                                    <div className="mt-4 text-base text-text2 transition-colors">{i18n[demo.introduce]}</div>
                                </a.div>
                            ),
                    )}
                </CustomScrollbar>
            </a.dl>
            <a.div
                ref={currentRef}
                className={cx(
                    'absolute top-12 left-1/2 translate-x-[-50%] w-[480px] max-w-[100%] px-6 py-4 rounded-md bg-primarytrans dark:bg-[#4b5563] shadow-md dark:shadow-none contain-content transition-colors z-20',
                    open && 'pointer-events-none',
                )}
                style={currentDemoStyle}
            >
                <div className="relative text-lg font-semibold text-text1 transition-colors">
                    <p className='w-[55%]'>{i18n[currentDemo.title]}</p>
                    <a className="button absolute w-10 p-0 h-8 text-sm top-0 right-[7.5rem]" href={currentDemo.code} target="_blank" rel="nofollow noopener noreferrer" title={currentDemo.code}><img className="w-5 h-5 max-w-none" src={Code} alt="code" /></a>
                    <button className="button absolute px-2 h-8 text-sm top-0 right-0" onClick={openPanel}>More Demo</button>
                </div>
                <div className="relative mt-4 text-base text-text2 transition-colors">{i18n[currentDemo.introduce]}</div>
            </a.div>
            <DemoContainer Demo={currentDemo.Demo} mt={Math.max(280, rect.height + 100)} />
        </>
    );
};

const DemoContainer: React.FC<{ Demo: React.FC; mt: number; }> = memo(({ Demo, mt = 280 }) => {
    return (
        <div className="mx-auto w-[600px] flex flex-col justify-center" style={{ marginTop: mt }}>
            <Demo />
        </div>
    );
});

export default DemoPage;
