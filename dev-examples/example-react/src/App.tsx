import React, { memo, useCallback } from 'react';
import { useStatus, useAccount, useChainId, useBalance, connect, Unit, sendTransaction, typedSign } from '../../../core/react/src';

const BasicUsage: React.FC = () => {
    const status = useStatus();

    return (
        <div>
            {status !== 'in-detecting' && status !== 'active' && (
                <button onClick={connect} disabled={status !== 'not-active'}>
                    {status === 'in-activating' && 'connecting...'}
                    {status === 'not-installed' && 'Fluent Not Install'}
                    {status === 'not-active' && 'Connect Fluent'}
                </button>
            )}
            {status === 'active' && <WalletInfo />}
        </div>
    );
};

const WalletInfo: React.FC = memo(() => {
    const account = useAccount();
    const chainId = useChainId();
    const balance = useBalance();
    console.log('render once: ', account, chainId, balance?.toDecimalStandardUnit());

    // Send 1 native token to self (connected account)
    const handleClickSendTransaction = useCallback(async () => {
        // For ts Type Guards. when status turn to 'active', account|chainId|balance must be exist.
        if (!account) return;

        try {
            const TxnHash = await sendTransaction({
                to: account,
                value: Unit.fromStandardUnit('1').toHexMinUnit(),
            });
            console.log(TxnHash);
        } catch (err) {
            console.error(err);
        }
    }, [account]);

    const handleTypedSign = useCallback(async () => {
        if (!account) return;
        try {
            const hash = await typedSign({
                domain: {
                    // This defines the network, in this case, Mainnet.
                    chainId: chainId,
                    // Give a user-friendly name to the specific contract you're signing for.
                    name: 'Ether Mail',
                    // Add a verifying contract to make sure you're establishing contracts with the proper entity.
                    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
                    // This identifies the latest version.
                    version: '1',
                },

                // This defines the message you're proposing the user to sign, is dapp-specific, and contains
                // anything you want. There are no required fields. Be as explicit as possible when building out
                // the message schema.
                message: {
                    contents: 'Hello, Bob!',
                    attachedMoneyInEth: 4.2,
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
                },
                // This refers to the keys of the following types object.
                primaryType: 'Mail',
                types: {
                    // This refers to the domain the contract is hosted on.
                    EIP712Domain: [
                        { name: 'name', type: 'string' },
                        { name: 'version', type: 'string' },
                        { name: 'chainId', type: 'uint256' },
                        { name: 'verifyingContract', type: 'address' },
                    ],
                    // Not an EIP712Domain definition.
                    Group: [
                        { name: 'name', type: 'string' },
                        { name: 'members', type: 'Person[]' },
                    ],
                    // Refer to primaryType.
                    Mail: [
                        { name: 'from', type: 'Person' },
                        { name: 'to', type: 'Person[]' },
                        { name: 'contents', type: 'string' },
                    ],
                    // Not an EIP712Domain definition.
                    Person: [
                        { name: 'name', type: 'string' },
                        { name: 'wallets', type: 'address[]' },
                    ],
                },
            });
            console.log(hash);
        } catch (err) {
            console.log(err);
        }
    }, [account, chainId]);

    return (
        <div>
            <p>account: {account}</p>
            <p>chainId: {chainId}</p>
            <p>balance: {`${balance?.toDecimalStandardUnit()} CFX`}</p>

            <button onClick={handleClickSendTransaction}>Send 1 native token to self (connected account)</button>
            <button onClick={handleTypedSign}>typed sign</button>
        </div>
    );
});

export default BasicUsage;
