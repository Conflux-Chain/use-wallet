import React, { useCallback, useState } from 'react';
import cx from 'clsx';
import {
    useStatus as useFluentStatus,
    useAccount as useFluentAccount,
    useChainId as useFluentChainId,
    useBalance as useFluentBalance,
    connect as connectFluent,
} from '@cfxjs/use-wallet';
import {
    useStatus as useMetaMaskStatus,
    useAccount as useMetaMaskAccount,
    useChainId as useMetaMaskChainId,
    useBalance as useMetaMaskBalance,
    connect as connectMetaMask,
} from '@cfxjs/use-wallet/dist/ethereum';

import WalletCard from '../ConnectBoth/WalletCard';

const ConnectBothDemo: React.FC = () => {
    const [wallet, setWallet] = useState<'Fluent' | 'MetaMask'>(() => {
        const last = localStorage.getItem('wallet');
        if (last !== 'Fluent' && last !== 'MetaMask') return 'Fluent';
        return last;
    });

    const handleChangeWallet = useCallback(() => {
        setWallet((pre) => {
            const wallet = pre === 'Fluent' ? 'MetaMask' : 'Fluent';
            localStorage.setItem('wallet', wallet);
            return wallet;
        });
    }, []);

    return (
        <>
            <WalletCard
                useStatus={wallet === 'Fluent' ? useFluentStatus : useMetaMaskStatus}
                useAccount={wallet === 'Fluent' ? useFluentAccount : useMetaMaskAccount}
                useChainId={wallet === 'Fluent' ? useFluentChainId : useMetaMaskChainId}
                useBalance={wallet === 'Fluent' ? useFluentBalance : useMetaMaskBalance}
                connect={wallet === 'Fluent' ? connectFluent : connectMetaMask}
                type={wallet}
            />
            <button
                className={cx('mt-6 inline-flex mx-auto button w-[188px] h-[36px]', { ['metamask']: wallet === 'Fluent' })}
                onClick={handleChangeWallet}
            >
                Switch to {wallet === 'Fluent' ? 'MetaMask' : 'Fluent'}
            </button>
        </>
    );
};

export default ConnectBothDemo;
