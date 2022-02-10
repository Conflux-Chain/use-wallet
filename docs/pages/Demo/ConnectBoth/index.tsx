import type React from 'react';
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

import WalletCard from './WalletCard';

const ConnectBothDemo: React.FC = () => {
    return (
        <div className='flex justify-center gap-8'>
            <WalletCard
                useStatus={useFluentStatus}
                useAccount={useFluentAccount}
                useChainId={useFluentChainId}
                useBalance={useFluentBalance}
                connect={connectFluent}
                type="Fluent"
            />
            <WalletCard
                useStatus={useMetaMaskStatus}
                useAccount={useMetaMaskAccount}
                useChainId={useMetaMaskChainId}
                useBalance={useMetaMaskBalance}
                connect={connectMetaMask}
                type="MetaMask"
            />
        </div>
    );
};

export default ConnectBothDemo;
