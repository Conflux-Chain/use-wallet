import Code from '@components/Code';
import useCurrentLib from '@hooks/useCurrentLib';
import useI18n, { compiled } from '@hooks/useI18n';
import React from 'react';

const transitions = {
    en: {
        title1: `Fluent and MetaMask for eSpace:`,
        title2: `Fluent is used for Core Space and MetaMask is used for eSpace:`,
        step1: `Using both Fluent and MetaMask in a DApp is divided into two cases: 1. Fluent and MetaMask are used as eSpace parallel wallets. 2. Fluent is used for Core Space and MetaMask is used for eSpace (used in cross-chain scenarios).`,
        step2: `To use both Fluent and MetaMask in eSpace, you need to import from different portals. Import Fluent from <code>"@cfxjs/use-wallet-{currentLib}/ethereum/Fluent"</code> and MetaMask from <code>"@cfxjs/use-wallet-{currentLib}/ethereum/MetaMask"</code>.`,
        step3: `To use Fluent in Core Space, and MetaMask in eSpace, you need to import from different portals. Import Fluent from <code>"@cfxjs/use-wallet-{currentLib}/conflux/Fluent"</code> and import MetaMask from <code>"@cfxjs/use-wallet-{currentLib}/ethereum/MetaMask"</code>.`,
    },
    zh: {
        title1: `Fluent 和 MetaMask 用于 eSpace：`,
        title2: `Fluent 用于 Core Space，MetaMask 用于 eSpace:`,
        step1: `在 DApp 中同时使用 Fluent 和 MetaMask 分为两种情况：1、Fluent 和 MetaMask 作为 eSpace 并列钱包使用。2、Fluent 用于 Core Space，MetaMask 用于 eSpace（在跨链场景中使用）。`,
        step2: `在 eSpace 中同时使用 Fluent 和 MetaMask，需从不同的入口导入。从 <code>"@cfxjs/use-wallet-{currentLib}/ethereum/Fluent"</code> 中导入 Fluent，从 <code>"@cfxjs/use-wallet-{currentLib}/ethereum/MetaMask"</code> 中导入 MetaMask。`,
        step3: `在 Core Space 中使用 Fluent, 在 eSpace 中使用 MetaMask，需从不同的入口导入。从 <code>"@cfxjs/use-wallet-{currentLib}/conflux/Fluent"</code> 中导入 Fluent，从 <code>"@cfxjs/use-wallet-{currentLib}/ethereum/MetaMask"</code> 中导入 MetaMask。`,
    },
};

const FluentAndMetaMask: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();

    const code1 = `import {
    useStatus as useFluentStatus,
    useAccount as useFluentAccount,
    useChainId as useFluentChainId,
    useBalance as useFluentBalance,
    connect as connectFluent,
    sendTransaction as sendFluentTransaction,
    Unit as UnitFluent,
    switchChain as switchFluentChain,
    addChain as addFluentChain,
    watchAsset as watchFluentAsset,
    personalSign as personalSignFluent,
    typedSign as typedSignFluent,
    trackBalanceChangeOnce as trackFluentBalanceChangeOnce,
    completeDetect as completeDetectFluent,
    provider as fluentProvider,
} from "@cfxjs/use-wallet-${currentLib}/ethereum/Fluent";
import {
    useStatus as useMetaMaskStatus,
    useAccount as useMetaMaskAccount,
    useChainId as useMetaMaskChainId,
    useBalance as useMetaMaskBalance,
    connect as connectMetaMask,
    sendTransaction as sendMetaMaskTransaction,
    Unit as UnitMetaMask,
    switchChain as switchMetaMaskChain,
    addChain as addMetaMaskChain,
    watchAsset as watchMetaMaskAsset,
    personalSign as personalSignMetaMask,
    typedSign as typedSignMetaMask,
    trackBalanceChangeOnce as trackMetaMaskBalanceChangeOnce,
    completeDetect as completeDetectMetaMask,
    provider as metaMaskProvider,
} from "@cfxjs/use-wallet-${currentLib}/ethereum/MetaMask";`;

    const code2 = `import {
    useStatus as useFluentStatus,
    useAccount as useFluentAccount,
    useChainId as useFluentChainId,
    useBalance as useFluentBalance,
    connect as connectFluent,
    sendTransaction as sendFluentTransaction,
    Unit as UnitFluent,
    switchChain as switchFluentChain,
    addChain as addFluentChain,
    watchAsset as watchFluentAsset,
    personalSign as personalSignFluent,
    typedSign as typedSignFluent,
    trackBalanceChangeOnce as trackFluentBalanceChangeOnce,
    completeDetect as completeDetectFluent,
    provider as fluentProvider,
} from "@cfxjs/use-wallet-${currentLib}/conflux/Fluent";
import {
    useStatus as useMetaMaskStatus,
    useAccount as useMetaMaskAccount,
    useChainId as useMetaMaskChainId,
    useBalance as useMetaMaskBalance,
    connect as connectMetaMask,
    sendTransaction as sendMetaMaskTransaction,
    Unit as UnitMetaMask,
    switchChain as switchMetaMaskChain,
    addChain as addMetaMaskChain,
    watchAsset as watchMetaMaskAsset,
    personalSign as personalSignMetaMask,
    typedSign as typedSignMetaMask,
    trackBalanceChangeOnce as trackMetaMaskBalanceChangeOnce,
    completeDetect as completeDetectMetaMask,
    provider as metaMaskProvider,
} from "@cfxjs/use-wallet-${currentLib}/ethereum/MetaMask";`;

    return (
        <section>
            <h3>Fluent and MetaMask</h3>
            <p dangerouslySetInnerHTML={{ __html: i18n.step1 }} />

            <h4>{i18n.title1}</h4>
            <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step2, { currentLib: currentLib }) }} />
            <Code language="ts">{code1}</Code>

            <h4>{i18n.title2}</h4>
            <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step3, { currentLib: currentLib }) }} />
            <Code language="ts">{code2}</Code>
        </section>
    );
};

export default FluentAndMetaMask;
