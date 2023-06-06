import React, { useState, useMemo, useEffect } from 'react';
import Code from '@components/Code';
import useI18n from '@hooks/useI18n';
import useCurrentLib from '@hooks/useCurrentLib';
import Select from 'react-select';

const transitions = {
    en: {
        step1: `Way 1: Import the default wallet of a chain (usually the most popular wallet that occupies window.\${chainName}, e.g. MetamMask in ethereum, Fluent in conflux) via '@cfxjs/use-wallet/\${chainName}'.`,
        step2: `Taking the ethereum chain as an example, this import can support the default MetaMask wallet, as well as other wallets (e.g. Fluent, OKX) with hosting turned on.`,
        step3: `Way 2: Import a specific wallet of the chain via '@cfxjs/use-wallet/\${chainName}/\${walletName}'.`,
        step4: `Take the ethereum chain as an example: if you use import { useStatus } from '@cfxjs/use-wallet/ethereum/MetaMask', the status of useStatus is 'not-installed' when MetaMask is hosted.`,
        step5: `This import method of specifying wallets makes it easy to implement such functions as multi-wallet login.`,
    },
    zh: {
        step1: `方式一：通过 '@cfxjs/use-wallet/\${chainName}' 导入 某条链默认钱包 (通常是占据了 window.\${chainName} 的最流行的钱包，如 ethereum 下的 MetamMask, conflux 下的 Fluent)。`,
        step2: `以 ethereum链 为例，这种导入方式可以支持默认的 MetaMask 钱包，也可以支持其他钱包(如 Fluent、OKX)开启托管的情况。`,
        step3: `方式二：通过 '@cfxjs/use-wallet/\${chainName}/\${walletName}' 导入 某条链特定钱包。`,
        step4: `以 ethereum链 为例：如果使用 import { useStatus } from '@cfxjs/use-wallet/ethereum/MetaMask'，当MetaMask被托管时，useStatus的状态就是 'not-installed'。`,
        step5: `这种指定钱包的导入方式，可以很方便的实现 多钱包登陆 这类功能。`,
    }} as const;

const supports = [
    {
        name: 'conflux',
        wallet: ['Fluent', 'Portal'],
    },
    {
        name: 'ethereum',
        wallet: ['MetaMask', 'Fluent', 'Coinbase', 'OKX', 'TokenPocket'],
    },
];
const chainOptions = supports.map(chain => ({ value: chain.name, label: chain.name }))

const Install: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();
    const [currentChain, setCurrentChain] = useState(chainOptions[0]);
    const wallets = useMemo(() => [{ value: 'default', label: 'default' }].concat(supports.find(chain => chain.name === currentChain.value)!.wallet.map(walletName => ({ value: walletName, label: walletName }))), [currentChain]);
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
                <div className='flex items-center'>
                    <p>Select Chain: </p>
                    <Select className="ml-[8px]" options={chainOptions} value={currentChain} onChange={setCurrentChain as any} />
                </div>
                <div className='flex items-center'>
                    <p>Select Wallet: </p>
                    <Select className="ml-[8px]" options={wallets} value={currentWallet} onChange={setCurrentWallet as any} />
                </div>
            </div>
            <Code language="ts">{codeImport(currentLib, currentChain.value, currentWallet.value)}</Code>

            <h4 className="mt-[16px]">Description:</h4>
            <p>{i18n.step1}</p>
            <p>{i18n.step2}</p>
            <p>{i18n.step3}</p>
            <p>{i18n.step4}</p>
            <p>{i18n.step5}</p>
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
