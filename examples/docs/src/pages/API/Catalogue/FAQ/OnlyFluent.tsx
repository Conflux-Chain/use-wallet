import Code from '@components/Code';
import useCurrentLib from '@hooks/useCurrentLib';
import useI18n, { compiled } from '@hooks/useI18n';
import React from 'react';

const transitions = {
    en: {
        title1: `Import method:`,
        step1: `To manage both Core Space and eSpace in Fluent, simply import from different portals. Import Core Space from <code>"@cfxjs/use-wallet-{currentLib}/conflux/Fluent"</code> and eSpace from <code>"@cfxjs/use-wallet-{currentLib}/ethereum/Fluent"</code> to import eSpace.`,
    },
    zh: {
        title1: `导入方式：`,
        step1: `如果要在 Fluent 中同时管理 Core Space 和 eSpace，只需从不同的入口导入即可。从 <code>"@cfxjs/use-wallet-{currentLib}/conflux/Fluent"</code> 中导入 Core Space，从 <code>“@cfxjs/use-wallet-{currentLib}/ethereum/Fluent”</code> 中导入 eSpace。`,
    },
};

const OnlyFluent: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();

    const code = `import {
    useStatus as useCoreStatus,
    useAccount as useCoreAccount,
    useChainId as useCoreChainId,
    useBalance as useCoreBalance,
    connect as connectCore,
    sendTransaction as sendCoreTransaction,
    Unit as UnitCore,
    switchChain as switchCoreChain,
    addChain as addCoreChain,
    watchAsset as watchCoreAsset,
    personalSign as personalSignCore,
    typedSign as typedSignCore,
    trackBalanceChangeOnce as trackCoreBalanceChangeOnce,
    completeDetect as completeDetectCore,
} from "@cfxjs/use-wallet-${currentLib}/conflux/Fluent";
import {
    useStatus as useESapceStatus,
    useAccount as useESapceAccount,
    useChainId as useESapceChainId,
    useBalance as useESapceBalance,
    connect as connectESapce,
    sendTransaction as sendESapceTransaction,
    Unit as UnitESapce,
    switchChain as switchESapceChain,
    addChain as addESapceChain,
    watchAsset as watchESapceAsset,
    personalSign as personalSignESapce,
    typedSign as typedSignESapce,
    trackBalanceChangeOnce as trackESapceBalanceChangeOnce,
    completeDetect as completeDetectESapce,
} from "@cfxjs/use-wallet-${currentLib}/ethereum/Fluent";`;

    return (
        <section>
            <h3>Only Fluent</h3>
            <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step1, { currentLib: currentLib }) }} />

            <h4>{i18n.title1}</h4>
            <Code language="ts">{code}</Code>
        </section>
    );
};

export default OnlyFluent;
