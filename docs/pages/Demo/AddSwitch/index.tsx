import React, { useCallback } from 'react';
import cx from 'clsx';
import { useStatus, useAccount, useChainId, useBalance, connect, addChain, switchChain, watchAsset } from '@cfxjs/use-wallet';
import showToast from '@components/tools/Toast';
import styles from '../Connect/index.module.css';

const AddSwitchDemo: React.FC = () => {
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

    const handleClickAddChain = useCallback(async () => {
        addChain({
            chainId: '0x2ee0',
            chainName: '123Conflux',
            nativeCurrency: {
                name: 'Conflux',
                symbol: 'CFX',
                decimals: 18,
            },
            rpcUrls: ['http://47.104.89.179:12537'],
            blockExplorerUrls: ['https://confluxscan.io'],
        })
            .then(() => {
                showToast('Add 123Conflux chain success!');
            })
            .catch((err) => {
                if ((err as any)?.code === 4001) {
                    showToast('User rejected add 123Conflux chain.');
                }
                if ((err as any)?.code === -32602 && (err as any)?.message?.indexOf('Duplicate network endpoint') !== -1) {
                    showToast('Have added 123Conflux chain.');
                }
            });
    }, []);

    const handleClickSwitchChain = useCallback(async () => {
        switchChain(chainId === '12000' ? '0x1' : '0x2ee0')
            .then(() => {
                showToast(`Switch to ${chainId === '12000' ? 'Testnet' : '123Conflux'} chain success!`);
            })
            .catch((err) => {
                if ((err as any)?.code === 4001) {
                    showToast(`User rejected switch to ${chainId === '12000' ? 'Testnet' : '123Conflux'} chain.`);
                }
                if ((err as any)?.code === -32602 && (err as any)?.message?.indexOf('try add the network') !== -1) {
                    showToast(`${chainId === '12000' ? 'Testnet' : '123Conflux'} chain not added, try add first.`);
                }
            });
    }, [chainId]);

    const handleClickAddToken = useCallback(async () => {
        watchAsset({
            type: 'ERC20',
            options: {
                address: 'cfxtest:acepe88unk7fvs18436178up33hb4zkuf62a9dk1gv',
                symbol: 'cUSDT',
                decimals: 18,
                image:
                'https://scan-icons.oss-cn-hongkong.aliyuncs.com/testnet/cfxtest%3Aacepe88unk7fvs18436178up33hb4zkuf62a9dk1gv.png',
            },
        })
            .then((isSuccess) => {
                if (isSuccess) {
                    showToast('Add cUSTD success!');
                } else {
                    showToast(`Add cUSTD failed.`);
                }
            })
            .catch((err) => {
                if ((err as any)?.code === 4001) {
                    showToast('User rejected add cUSTD.');
                }
                if ((err as any)?.code === -32602) {
                    showToast(`Add cUSTD failed, please check your network.`);
                }
            });
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
                <div className="mt-[16px] p-[16px] rounded-[8px] border-[1px] border-[#EAECEF] dark:border-transparent shadow dark:shadow-none bg-white dark:bg-[#374151] transition-colors">
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

                    <div className="flex gap-4">
                        <button className="button w-[50%] my-4 h-[36px]" onClick={handleClickAddChain}>
                            Add 123Conflux Chain
                        </button>
                        <button
                            className="button w-[50%] my-4 h-[36px]"
                            onClick={handleClickSwitchChain}
                        >
                            {chainId !== '12000' ? 'Switch to 123Conflux' : 'Switch to Testnet'}
                        </button>
                        <button
                            className="button w-[50%] my-4 h-[36px]"
                            onClick={handleClickAddToken}
                            disabled={chainId !== '1'}
                        >
                            Add cUSTD to Testnet
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


export default AddSwitchDemo;
