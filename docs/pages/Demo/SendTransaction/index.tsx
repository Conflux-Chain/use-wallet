import React, { useCallback } from 'react';
import cx from 'clsx';
import { useStatus, useAccount, useChainId, useBalance, connect, sendTransaction, trackBalanceChangeOnce, Unit } from '@cfxjs/use-wallet';
import showToast from '@components/tools/Toast';
import { showWaitFluent, showActionSubmitted, hideWaitFluent, hideTransactionSubmitted } from '@components/tools/Modal';
import styles from '../Connect/index.module.css';

const SendTransactionDemo: React.FC = () => {
    const status = useStatus();
    const account = useAccount();
    const chainId = useChainId();
    const balance = useBalance()!;

    const handleClickConnect = useCallback(async () => {
        try {
            await connect();
            showToast('Connect to Fluent Success!');
        } catch (err) {
            console.log(err);
            if ((err as any)?.code === 4001) {
                showToast('User rejected connection.', { key: 'user-rejected-connection' });
            }
        }
    }, []);

    const handleClickSendTransaction = useCallback(async () => {
        if (!account) return;

        let waitFluentKey: string | number = null!;
        let transactionSubmittedKey: string | number = null!;
        try {
            waitFluentKey = showWaitFluent()
            const TxnHash = await sendTransaction({
                to: account,
                value: Unit.fromStandardUnit('1').toHexMinUnit(),
            });
            transactionSubmittedKey = showActionSubmitted(TxnHash);
            trackBalanceChangeOnce(() => {
                hideTransactionSubmitted(transactionSubmittedKey)
                showToast('It seems the transaction is complete')
            });
        } catch (err) {
            hideWaitFluent(waitFluentKey)
            if ((err as any)?.code === 4001) {
                showToast('User canceled transaction.');
            }
        }
    }, [account]);

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
                    
                    <button className="button w-full my-4 h-[36px]" onClick={handleClickSendTransaction}>
                        Send 1 native token to self (connected account)
                    </button>
                </div>
            )}
        </div>
    );
};


export default SendTransactionDemo;
