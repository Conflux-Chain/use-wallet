import React, { useCallback } from 'react';
import cx from 'clsx';
import { useStatus, useAccount, useChainId, useBalance, connect } from '@cfxjs/use-wallet';
import showToast from '@components/tools/Toast';
import CFX from '@assets/cfx.svg';
import styles from './index.module.css';

const ConnectDemo: React.FC = () => {
    const status = useStatus();
    const account = useAccount();
    const chainId = useChainId();
    const balance = useBalance()!;

    const handleClickConnect = useCallback(async () => {
        try {
            await connect();
            showToast('Connect to Fluent Success!');
        } catch (err) {
            if ((err as any)?.code === 4001) {
                showToast('User rejected connection.', { key: 'user-rejected-connection' });
            }
        }
    }, []);
    console.log('render  status:', status, ' , account:', account, ' , chainId:', chainId);

    return (
        <div className="flex justify-center items-center">
            {status !== 'in-detecting' && status !== 'active' && (
                <button
                    className={cx('button w-[168px]', { ['error']: status === 'not-installed' })}
                    onClick={handleClickConnect}
                    disabled={status !== 'not-active'}
                >
                    {status === 'in-activating' && 'connecting...'}
                    {status === 'not-installed' && 'Fluent Not Install'}
                    {status === 'not-active' && 'Connect Fluent'}
                </button>
            )}
            {status === 'active' && (
                <div className="min-w-[440px] mt-[16px] p-[16px] rounded-[8px] border-[1px] border-[#EAECEF] dark:border-transparent shadow dark:shadow-none bg-white dark:bg-[#374151] transition-colors">
                    <p className="inline-flex items-center px-[10px] py-[4px] rounded-3xl text-[16px] text-primary bg-[#ecedf5] dark:text-[#f8f9fe] dark:bg-primary transition-colors">
                        <span className={`mr-[4px] ${styles['connected-spin']}`} />
                        Conflux Chain
                    </p>

                    <p className="mt-[16px] text-[16px] leading-[22px] text-text1 transition-colors">chainId:</p>
                    <p className="text-[14px] leading-[18px] text-text2 transition-colors">{chainId}</p>
                    <p className="mt-[6px] text-[16px] leading-[22px] text-text1 transition-colors">account address:</p>
                    <p className="text-[14px] leading-[18px] text-text2 transition-colors">{account}</p>
                    <p className="mt-[6px] text-[16px] leading-[22px] text-text1 transition-colors">balance:</p>
                    <p className="text-[14px] leading-[18px] text-text2 transition-colors">
                        {`${balance.toDecimalStandardUnit()} CFX`}
                    </p>
                    
                    <div className="mt-[16px] px-[12px] py-[10px] flex items-center text-[14px] text-[#3D3F4C] bg-[#F7F8FA] rounded-[2px]">
                        <img className="mr-[8px] w-[24px] h-[24px]" src={CFX} alt="cfx icon" />
                        CFX (Conflux Network)
                        <span className="ml-[8px] mt-[2px] inline-block px-[4px] text-[12px] text-white text-center bg-[#44D7B6] rounded-[2px]">
                            Connected
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};


export default ConnectDemo;
