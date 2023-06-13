import React from 'react';
import Code from '@components/Code';
import useI18n, { compiled } from '@hooks/useI18n';
import useCurrentLib from '@hooks/useCurrentLib';

const transitions = {
    en: {
        step1: `The <code>typedSign</code> function return a Promise. Calling <code>typedSign</code> when the status is <code>'active'</code> will invoke a wallet confirmation. If it is not called when <code>'active'</code>, the Promise will simply reject.`,
        step2: `A successful sign will resolve <code>hash-string</code>, a failed sign will reject.`,
    },
    zh: {
        step1: `<code>typedSign</code> 函数返回一个 Promise。在 status 为 <code>'active'</code> 时调用 <code>typedSign</code>，会根据入参调起钱包确认签名。如果不在 <code>'active'</code> 时调用，Promise 会直接 reject。`,
        step2: `成功签名会 resolve <code>hash-string</code>，失败则 reject。`,
    },
} as const;

const TypedSign: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();

    const code = `export interface TypedSignParams {
    domain: {
        chainId?: number | string;
        name?: string; // A user-friendly name to the specific contract you're signing for.
        verifyingContract?: string; // A verifying contract.
        version?: string; // This identifies the latest version.
    };
    message: {};
    primaryType: string; // This refers to the keys of the following types object.
    types: {
        // This refers to the domain the contract is hosted on.
        // In conflux it is CIP23Domain, in ethereum it is EIP712Domain.
        CIP23Domain: Array<{ name: string; type: string }>; 
    } & Record<string, Array<{ name: string; type: string }>>;
}

declare const typedSign: (typedData: Record<string, any>) => Promise<string>;`;

    const usage = `import { typedSign } from '@cfxjs/use-wallet-${currentLib}/conflux';
    
const handleTypedSign = async() => {
    try {
        const hash = await typedSign({
            domain: {
                // This defines the network, in this case, Mainnet.
                chainId: 1,
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
                    wallets: [
                        '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826', 
                        '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
                    ],
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
                // In conflux it is CIP23Domain, in ethereum it is EIP712Domain.
                CIP23Domain: [
                    { name: 'name', type: 'string' },
                    { name: 'version', type: 'string' },
                    { name: 'chainId', type: 'uint256' },
                    { name: 'verifyingContract', type: 'address' },
                ],
                // Not an CIP23Domain definition.
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
                // Not an CIP23Domain definition.
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
}`;
    return (
        <section>
            <h3>typedSign</h3>

            <h4>declare:</h4>
            <Code language="ts">{code}</Code>

            <h4>Usage:</h4>
            <Code language="ts">{usage}</Code>

            <h4 className="mt-[16px]">Description:</h4>
            <p dangerouslySetInnerHTML={{ __html: i18n.step1 }} />
            <p dangerouslySetInnerHTML={{ __html: i18n.step2 }} />
        </section>
    );
};

export default TypedSign;
