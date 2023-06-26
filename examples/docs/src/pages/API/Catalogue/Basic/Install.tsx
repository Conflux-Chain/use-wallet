import React, { useState, useMemo, useEffect } from 'react';
import Code from '@components/Code';
import useI18n, { compiled } from '@hooks/useI18n';
import useCurrentLib from '@hooks/useCurrentLib';
import Select from 'react-select';

const transitions = {
    en: {
        title1: 'Import the default wallet:',
        step1: `Import the default wallet for a chain (usually the most popular wallet that occupies <code>window.\${chainName}</code>, e.g. MetaMask under ethereum, Fluent under conflux) via <code>'@cfxjs/use-wallet/\${chainName}'</code>.`,
        step2: `Take the ethereum chain as an example, this import can support the default MetaMask wallet, as well as other wallets (e.g. Fluent, OKX, Halo) with hosting turned on.`,
        title2: 'Import a specified wallet',
        step3: `Import a chain-specific wallet via <code>'@cfxjs/use-wallet/\${chainName}/\${walletName}'</code>.`,
        step4: `Take the ethereum chain for example: if you use <code>import { useStatus } from '@cfxjs/use-wallet/ethereum/MetaMask'</code>, when MetaMask is hosted, the status of useStatus is <code>'not-installed'</code>.`,
        step5: `This specified wallet import makes it easy to implement features like <strong>multi-wallet login</strong>.`,
    },
    zh: {
        title1: `默认钱包导入:`,
        step1: `通过 <code>'@cfxjs/use-wallet/\${chainName}'</code> 导入某条链的默认钱包 (通常是占据了 <code>window.\${chainName}</code> 的最流行的钱包，如 ethereum 下的 MetaMask， conflux 下的 Fluent)。`,
        step2: `以 ethereum 链为例，这种导入方式可以支持默认的 MetaMask 钱包，也可以支持其他钱包 (如 Fluent、OKX、Halo) 开启托管的情况。`,
        title2: `指定钱包导入:`,
        step3: `通过 <code>'@cfxjs/use-wallet/\${chainName}/\${walletName}'</code> 导入某条链特定钱包。`,
        step4: `以 ethereum 链为例：如果使用 <code>import { useStatus } from '@cfxjs/use-wallet/ethereum/MetaMask'</code> 导入，当 MetaMask 被托管时，useStatus 的状态就是 <code>'not-installed'</code>。`,
        step5: `这种指定钱包的导入方式，可以很方便的实现<strong>多钱包登陆</strong>这类功能。`,
    },
} as const;

const supports = [
    {
        name: 'conflux',
        wallet: ['Fluent', 'Portal'],
    },
    {
        name: 'ethereum',
        wallet: ['MetaMask', 'Fluent', 'Coinbase', 'OKX', 'TokenPocket', 'Halo'],
    },
];
const chainOptions = supports.map((chain) => ({ value: chain.name, label: chain.name }));

const Install: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();
    const [currentChain, setCurrentChain] = useState(chainOptions[0]);
    const wallets = useMemo(
        () =>
            [{ value: 'default', label: 'default' }].concat(
                supports.find((chain) => chain.name === currentChain.value)!.wallet.map((walletName) => ({ value: walletName, label: walletName }))
            ),
        [currentChain]
    );
    const [currentWallet, setCurrentWallet] = useState({ value: 'default', label: 'default' });

    useEffect(() => {
        setCurrentWallet({ value: 'default', label: 'default' });
    }, [currentChain]);

    return (
        <section>
            <h3>install</h3>
            <Code language="ts">{codeInstall(currentLib)}</Code>

            <div className="mt-[40px] mb-[16px] flex items-center gap-[12px]">
                <h3 style={{ marginBottom: 0 }}>import</h3>
                <div className="flex items-center">
                    <p>Select Chain: </p>
                    <Select className="ml-[8px]" options={chainOptions} value={currentChain} onChange={setCurrentChain as any} />
                </div>
                <div className="flex items-center">
                    <p>Select Wallet: </p>
                    <Select className="ml-[8px]" options={wallets} value={currentWallet} onChange={setCurrentWallet as any} />
                </div>
            </div>
            <Code language="ts">{codeImport(currentLib, currentChain.value, currentWallet.value)}</Code>

            <h4 className="my-[16px]">{i18n.title1}</h4>
            <p dangerouslySetInnerHTML={{ __html: i18n.step1 }} />
            <p>{i18n.step2}</p>
            <h4 className="my-[16px]">{i18n.title2}</h4>
            <p dangerouslySetInnerHTML={{ __html: i18n.step3 }} />
            <p dangerouslySetInnerHTML={{ __html: i18n.step4 }} />
            <p dangerouslySetInnerHTML={{ __html: i18n.step5 }} />
        </section>
    );
};

const codeInstall = (currentLib: string) => `npm install @cfxjs/use-wallet-${currentLib} decimal.js${currentLib === 'react' ? ' zustand' : ''} --save
yarn/pnpm add @cfxjs/use-wallet-${currentLib} decimal.js${currentLib === 'react' ? ' zustand' : ''}`;

const codeImport = (currentLib: string, currentChain: string, currentWallet: string) =>
    `import { useStatus, useAccount, useChainId, useBalance, connect, ... } from '@cfxjs/use-wallet-${currentLib}/${currentChain}${
        currentWallet !== 'default' ? `/${currentWallet}` : ''
    }'`;

export default Install;
