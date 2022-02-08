import React, { useCallback } from 'react';
import cx from 'clsx';
import { type useStatus, type useAccount, type useChainId, type useBalance, type connect } from '@hooks/useFluent';
import showToast from '@components/tools/Toast';
import CFX from '@assets/cfx.svg';
import MetaMask from '@assets/metamask-fox.svg';
import styles from '../Connect/index.module.css';

interface Props {
    useStatus: typeof useStatus;
    useAccount: typeof useAccount;
    useChainId: typeof useChainId;
    useBalance: typeof useBalance;
    connect: typeof connect;
    type: "Fluent" | "MetaMask";
}

const WalletCard: React.FC<Props> = ({ useStatus, useAccount, useChainId, useBalance, connect, type }) => {
    const status = useStatus();
    const account = useAccount();
    const chainId = useChainId();
    const balance = useBalance()!;

    const handleClickConnect = useCallback(async () => {
        try {
            await connect();
            showToast(`Connect to ${type} Success!`);
        } catch (err) {
            if ((err as any)?.code === 4001) {
                showToast(`User rejected ${type} connection.`,  { key: `user-rejected-connection-${type}` });
            }
        }
    }, []);
    console.log(`render ${type} status:`, status, ' , account:', account, ' , chainId:', chainId);

    return (
        <div className="flex justify-center items-center">
            {status !== 'in-detecting' && status !== 'active' && (
                <button
                    className={cx('button w-[168px]', { ['error']: status === 'not-installed', ['metamask']: type === 'MetaMask' })}
                    onClick={handleClickConnect}
                    disabled={status !== 'not-active'}
                >
                    {status === 'in-activating' && 'connecting...'}
                    {status === 'not-installed' && `${type} Not Install`}
                    {status === 'not-active' && `Connect ${type}`}
                </button>
            )}
            {status === 'active' && (
                <div className="min-w-[440px] mt-[16px] p-[16px] rounded-[8px] border-[1px] border-[#EAECEF] dark:border-transparent shadow dark:shadow-none bg-white dark:bg-[#374151] transition-colors">
                    <p
                        className={cx(
                            "inline-flex items-center px-[10px] py-[4px] rounded-3xl text-[16px] bg-[#ecedf5] dark:text-[#f8f9fe] transition-colors",
                            type === 'Fluent' ? 'text-primary dark:bg-primary' : 'text-metamask dark:bg-metamask'
                        )}
                    >
                        <span className={`mr-[4px] ${styles['connected-spin']}`} />
                        {`${type === 'Fluent' ? 'Conflux' : 'Ethereum'}`} Chain
                    </p>

                    <p className="mt-[16px] text-[16px] leading-[22px] text-text1 transition-colors">chainId:</p>
                    <p className="text-[14px] leading-[18px] text-text2 transition-colors">{chainId}</p>
                    <p className="mt-[6px] text-[16px] leading-[22px] text-text1 transition-colors">account address:</p>
                    <p className="text-[14px] leading-[18px] text-text2 transition-colors">{account}</p>
                    <p className="mt-[6px] text-[16px] leading-[22px] text-text1 transition-colors">balance:</p>
                    <p className="text-[14px] leading-[18px] text-text2 transition-colors">{`${balance.toDecimalStandardUnit()} ${type === 'Fluent' ? 'CFX' : 'ETH'}`}</p>

                    <div className="mt-[16px] px-[12px] py-[10px] flex items-center text-[14px] text-[#3D3F4C] bg-[#F7F8FA] rounded-[2px]">
                        <img className="mr-[8px] w-[24px] h-[24px]" src={type === 'Fluent' ? CFX : MetaMask} alt="cfx icon" />
                        {type === 'Fluent' ? 'CFX (Conflux Network)' : 'ETH (Ethereum Network)'}
                        <span className="ml-[8px] mt-[2px] inline-block px-[4px] text-[12px] text-white text-center bg-[#44D7B6] rounded-[2px]">
                            Connected
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WalletCard;
