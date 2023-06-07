import Code from '@components/Code';
import useCurrentLib from '@hooks/useCurrentLib';
import useI18n, { compiled } from '@hooks/useI18n';
import React from 'react';

const transitions = {
    en: {
        title1: `Import method:`,
        step1: `To use both Fluent and MetaMask in a DApp, simply import from different portals. Import Fluent from <code>"@cfxjs/use-wallet-{currentLib}/conflux/Fluent"</code> and import MetaMask from <code>"@cfxjs/use-wallet-{currentLib}/ethereum/MetaMask"</code>.`,
    },
    zh: {
        title1: `导入方式：`,
        step1: `如果要在 DApp 中同时使用 Fluent 和 MetaMask，只需从不同的入口导入即可。从 <code>"@cfxjs/use-wallet-{currentLib}/conflux/Fluent"</code> 中导入 Fluent，从 <code>"@cfxjs/use-wallet-{currentLib}/ethereum/MetaMask"</code> 中导入 MetaMask。`,
    },
};

const FluentAndMetaMask: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();

    const code = `import {
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
            <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step1, { currentLib: currentLib }) }} />

            <h4>{i18n.title1}</h4>
            <Code language="ts">{code}</Code>
        </section>
    );
};

export default FluentAndMetaMask;
