import { store, connect, Unit, sendTransaction, typedSign, switchChain } from '@cfxjs/use-wallet-react/ethereum/Fluent';
// import { useStatus, useAccount, useChainId, useBalance, connect, Unit, sendTransaction, typedSign } from '@cfxjs/use-wallet-react/ethereum';

enum TargetChains {
    eSpaceMainnet = '1030',
    eSpaceTestnet = '71',
}
const targetChainName = "eSpaceMainnet"
const typedSignDomainName = "EIP712Domain"

// uncomment to use Core Space setting
// import { store, connect, Unit, sendTransaction, typedSign, switchChain } from '@cfxjs/use-wallet-react/conflux/Fluent';
// enum TargetChains {
//     coreSpaceMainnet = '1029',
//     coreSpaceTestnet = '1',
// }
// const targetChainName = "coreSpaceMainnet"
// const typedSignDomainName = "CIP23Domain"


const targetChain = TargetChains[targetChainName];

let unsubWallState: ReturnType<(typeof store)['subscribe']> | null = null;
store.subscribe(
    (state) => state.status,
    (status) => {
        if (status !== 'in-detecting' && status !== 'active') {
            unsubWallState?.();
            document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
              <button id="connect">
                Connect Fluent
              </button>
          `;
            const connectBtn = document.querySelector<HTMLButtonElement>('#connect')!;
            connectBtn.disabled = status !== 'not-active';
            connectBtn!.innerText = status === 'not-installed' ? 'Fluent Not Install' : status === 'not-active' ? 'Connect Fluent' : 'connecting...';
            connectBtn.addEventListener('click', () => connect());
        } else if (status === 'active') {
            unsubWallState?.();
            unsubWallState = store.subscribe(
                (state) => [state.accounts, state.chainId, state.balance] as const,
                ([accounts, chainId, balance]) => {
                    const isChainMatch = chainId === targetChain;
                    if (isChainMatch) {
                        const account = accounts?.[0];
                        document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
                            <p>account: ${account}</p>
                            <p>chainId: ${chainId}</p>
                            <p>balance: ${balance?.toDecimalStandardUnit()} CFX</p>
                            <button id="sendTransaction">Send 1 native token to self (connected account)</button>
                            <button id="typedSign">typed sign</button>
                        `;
                        const sendTransactionBtn = document.querySelector<HTMLButtonElement>('#sendTransaction')!;
                        const typedSignBtn = document.querySelector<HTMLButtonElement>('#typedSign')!;
                        sendTransactionBtn.addEventListener('click', async () => {
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
                        });
                        typedSignBtn.addEventListener('click', async () => {
                            if (!account) return;
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
                                        [typedSignDomainName]: [
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
                        });
                    } else {
                        document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
                            <p>Current Chain is not Target Chain -- ${targetChainName} </p>
                            <button id="switch">Switch to Target Chain</button>
                        `;
                        const switchBtn = document.querySelector<HTMLButtonElement>('#switch')!;
                        switchBtn.addEventListener('click', () => switchChain(`0x${(+targetChain).toString(16)}`));
                    }
                },
                {
                    equalityFn: ([accountsA, chainIdA, balanceA], [accountsB, chainIdB, balanceB]) =>
                        accountsA?.[0] === accountsB?.[0] && chainIdA === chainIdB && (balanceA && balanceB ? balanceA?.equalsWith(balanceB) : false),
                },
            );
        }
    },
);
