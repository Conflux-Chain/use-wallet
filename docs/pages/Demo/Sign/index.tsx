import React, { useCallback } from 'react';
import cx from 'clsx';
import { useStatus, useAccount, useChainId, useBalance, connect, personalSign, typedSign } from '@cfxjs/use-wallet';
import showToast from '@components/tools/Toast';
import { showWaitFluent, showActionSubmitted, hideWaitFluent } from '@components/tools/Modal';
import styles from '../Connect/index.module.css';

const SignDemo: React.FC = () => {
    const status = useStatus();
    const account = useAccount();
    const chainId = useChainId()!;
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

    const handleClickPersonalSign = useCallback(async () => {
        let waitFluentKey: string | number = null!;
        try {
            waitFluentKey = showWaitFluent();
            const TxnHash = await personalSign('Personal Sign message example');
            showActionSubmitted(TxnHash, 'Personal Sign');
        } catch (err) {
            hideWaitFluent(waitFluentKey);
            if ((err as any)?.code === 4001) {
                showToast('User canceled Personal Sign.');
            }
        }
    }, []);

    const handleClickTypedSign = useCallback(async () => {
        let waitFluentKey: string | number = null!;
        try {
            waitFluentKey = showWaitFluent();
            const TxnHash = await typedSign(typedData);
            showActionSubmitted(TxnHash, 'Typed Sign');
        } catch (err) {
            hideWaitFluent(waitFluentKey);
            if ((err as any)?.code === 4001) {
                showToast('User canceled Typed Sign.');
            }
        }
    }, []);

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
                    <p className="text-[14px] leading-[18px] text-text2 transition-colors">{`${balance.toDecimalStandardUnit()} CFX`}</p>

                    <div className="flex gap-8">
                        <button className="button w-[50%] my-4 h-[36px]" onClick={handleClickPersonalSign}>
                            Personal Sign
                        </button>
                        <button className="button w-[50%] my-4 h-[36px]" onClick={handleClickTypedSign}>
                            Typed Sign
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const typedData = {
    types: {
        CIP23Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
        ],
        Person: [
            { name: 'name', type: 'string' },
            { name: 'wallets', type: 'address[]' },
        ],
        Mail: [
            { name: 'from', type: 'Person' },
            { name: 'to', type: 'Person[]' },
            { name: 'contents', type: 'string' },
        ],
        Group: [
            { name: 'name', type: 'string' },
            { name: 'members', type: 'Person[]' },
        ],
    },
    domain: {
        name: 'Ether Mail',
        version: '1',
        chainId: 1,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
    },
    primaryType: 'Mail',
    message: {
        from: {
            name: 'Cow',
            wallets: ['0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826', '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF'],
        },
        to: [
            {
                name: 'Bob',
                wallets: [
                    '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                    '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
                    '0xB0B0b0b0b0b0B000000000000000000000000000',
                ],
            },
        ],
        contents: 'Hello, Bob!',
    },
};

export default SignDemo;
