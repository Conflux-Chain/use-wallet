import React from 'react';
import useI18n from '@hooks/useI18n';
import './index.css';

const transitions = {
    en: {
        useWallet: 'use-wallet',
        slogan: `A simpler way to 'use' wallet in web development`,
        introduce:
            '<code>use-wallet</code> is a front-end perspective wallet hooks library designed to provide rapid development support for lightweight dapps, it only encapsulates the provider that the wallet injects into the window. <code>js-conflux-sdk</code> or <code>web3.js</code> would be more suitable if you need more complete and powerful support.',
        feature1_title: 'Can support any chain/any wallet/any framework',
        feature1_text: `Currently, <code>use-wallet</code> already supports conflux chains (including Portal and Fluent) and ethereum chains (including MetaMask, Fluent, MetaX, Halo and Coinbase). We also provide integration support for React and Vue3 frameworks.`,
        feature2_title: 'Easy to use',
        feature2_text: `<code>use-wallet</code> is an advanced wrapper library for front-end developers that eliminates the need for users to pay attention to underlying provider and other specification concepts. You can easily integrate wallet functionality into your application by directly using hooks and func provided by <code>use-wallet</code>.`,
        feature3_title: 'Effective avoidance of duplicate rendering',
        feature3_text: `<code>use-wallet</code> subdivides related data into different hooks and uses batching techniques to handle changes to the data to avoid unnecessary re-rendering. Some similar hooks in the community have the habit of returning a lot of data wrapped up together, which tends to cause unnecessary re-rendering and is discouraged.`,
        feature4_title: 'Tiny',
        feature4_text: `<code>use-wallet</code> is a library that communicates with wallets only through a wallet-injected provider, while providing some lightweight tooling methods. For many dapp development scenarios, there is no need to introduce big and comprehensive libraries like <code>js-conflux-sdk</code> or <code>web3.js</code>. (gzip: 3.7kb - source, 20kb - includes decimal.js)`,
    },
    zh: {
        useWallet: 'use-wallet',
        slogan: `在前端开发过程中更简单地使用钱包`,
        introduce:
            '<code>use-wallet</code> 是一个前端视角的钱包 hooks 库，旨在为轻量级 dapp 提供快速开发支持，它仅仅封装了钱包注入在 window 中的 provider。如果你需要更完整强大的功能支持， <code>js-conflux-sdk</code> 或者 <code>web3.js</code> 会更适合。',
        feature1_title: '支持任意链/任意钱包/任意框架',
        feature1_text: `目前，<code>use-wallet</code> 已经支持 conflux 链（包括 Portal 和 Fluent）以及 ethereum 链（包括 MetaMask、Fluent、MetaX、Halo 和 Coinbase）。同时，我们还提供了对于 React 和 Vue3 框架的集成支持。`,
        feature2_title: '开箱即用',
        feature2_text: `<code>use-wallet</code> 是一个针对前端开发者的高级封装库，用户无需关注底层的 provider 等规范概念。可以直接使用 <code>use-wallet</code> 提供的 hooks 和 func，轻松集成钱包功能到你的应用中。`,
        feature3_title: '有效规避重复渲染',
        feature3_text: `<code>use-wallet</code> 将相关的数据细分为不同的 hooks 并使用批处理技术来处理数据的变动，以避免不必要的重复渲染。社区中的一些同类 hooks 习惯把很多数据封装在一起返回，这容易引起不必要的重复渲染，是不被提倡的。`,
        feature4_title: '体积小',
        feature4_text: `<code>use-wallet</code> 是一个仅通过钱包注入的 provider 来与钱包进行通信的库，同时提供了一些轻量级的工具方法。对于许多 dapp 开发场景来说，并不需要引入像 <code>js-conflux-sdk</code>、<code>web3.js</code> 这样的大而全的库。(gzip: 3.7kb - 源码, 20kb - 包含 decimal.js)`,
    },
} as const;

const features = [
    {
        title: 'feature1_title',
        text: 'feature1_text',
        icon: (
            <svg className="h-6 w-6" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
                <path
                    d="M0 204.8c0-56.32 46.08-102.4 102.4-102.4h768a51.2 51.2 0 0 1 51.2 51.2v51.2H102.4V256h870.4a51.2 51.2 0 0 1 51.2 51.2v512a102.4 102.4 0 0 1-102.4 102.4H102.4A102.4 102.4 0 0 1 0 819.2V204.8zm844.8 460.8a76.8 76.8 0 1 0 0-153.6 76.8 76.8 0 0 0 0 153.6z"
                    fill="currentColor"
                />
            </svg>
        ),
    },
    {
        title: 'feature2_title',
        text: 'feature2_text',
        icon: (
            <svg className="h-6 w-6" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path
                    d="M512 32C246.912 32 32 246.848 32 512s214.912 480 480 480c265.152 0 480-214.848 480-480S777.152 32 512 32zm0 896a416 416 0 1 1 0-832 416 416 0 0 1 0 832zm-20.224-192.704a44.224 44.224 0 0 0-32.64 13.888 47.232 47.232 0 0 0-13.76 34.496c0 13.952 4.608 25.472 13.888 34.624S479.296 832 491.776 832c12.864 0 23.936-4.608 33.216-13.888s13.888-20.736 13.888-34.432a46.912 46.912 0 0 0-13.888-34.304 44.992 44.992 0 0 0-33.216-14.08zm25.088-511.552c-47.616 0-91.904 13.312-132.736 39.936v77.696c35.264-36.8 76.096-55.168 122.56-55.168 29.44 0 52.672 8.128 69.888 24.32 17.152 16.192 25.664 36.928 25.664 62.016 0 23.616-5.504 44.48-16.576 62.656s-29.504 37.632-55.296 58.432c-26.24 21.312-44.48 41.536-54.656 60.672-10.176 19.2-15.296 42.048-15.296 68.736v32.704h63.488v-29.696c0-22.784 4.224-40.576 12.736-53.248s25.152-29.824 49.984-51.456c30.848-26.624 52.864-51.968 65.984-76.096 13.12-24.064 19.776-50.88 19.776-80.32 0-42.112-14.08-76.16-42.176-102.208-28.096-25.984-65.856-38.976-113.344-38.976z"
                    fill="currentColor"
                />
            </svg>
        ),
    },
    {
        title: 'feature3_title',
        text: 'feature3_text',
        icon: (
            <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        title: 'feature4_title',
        text: 'feature4_text',
        icon: (
            <svg className="h-7 w-7" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
                <path
                    d="M704 224H512a32 32 0 0 0 0 64h192a64 64 0 0 1 0 128H224a32 32 0 0 0 0 64h480a128 128 0 0 0 0-256zm128 576h-96a32 32 0 0 1 0-64h96a64 64 0 0 0 0-128H96a32 32 0 0 1 0-64h736a128 128 0 0 1 0 256z"
                    fill="currentColor"
                />
                <path d="M608 736H224a32 32 0 0 0 0 64h384a32 32 0 0 0 0-64z" fill="currentColor" />
            </svg>
        ),
    },
] as const;

const GuidePage: React.FC = () => {
    const i18n = useI18n(transitions);

    return (
        <div className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
                <h2 className="text-base text-primary font-semibold tracking-wide transition-colors">{i18n.useWallet}</h2>
                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-text1 sm:text-4xl transition-colors">{i18n.slogan}</p>
                <p className="mt-4 max-w-4xl text-xl text-text2 lg:mx-auto transition-colors" dangerouslySetInnerHTML={{ __html: i18n.introduce }} />
            </div>

            <div className="mt-14">
                <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                    {features.map((feature) => (
                        <div className="relative" key={feature.title}>
                            <div>
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white transition-colors">
                                    {feature.icon}
                                </div>
                                <p
                                    className="ml-16 text-lg leading-6 font-medium text-text1 transition-colors"
                                    dangerouslySetInnerHTML={{ __html: i18n[feature.title] }}
                                />
                            </div>
                            <dd className="mt-2 ml-16 text-base text-text2 transition-colors" dangerouslySetInnerHTML={{ __html: i18n[feature.text] }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GuidePage;
