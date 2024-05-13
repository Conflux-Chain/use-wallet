import React from 'react';
import Code from '@components/Code';
import useI18n from '@hooks/useI18n';
import useCurrentLib from '@hooks/useCurrentLib';

const transitions = {
    en: {
        step1: `The <code>trackBalanceChangeOnce</code> function tracks changes to <strong>the current account balance at one time</strong> and executes the incoming callback function when the balance has changed.`,
        step2: `This tool function can be used to <strong>simply and inexactly</strong> track whether a transaction has been on-chain or not.`,
    },
    zh: {
        step1: `<code>trackBalanceChangeOnce</code> 函数可以跟踪<strong>当前账户一次余额的变化</strong>，当余额发生变化后便会执行传入的回调函数。`,
        step2: `这个工具函数可以用来<strong>简单地、不确切地</strong>跟踪一笔交易是否已经达成。`,
    },
} as const;

const TrackBalanceChangeOnce: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();
    const code = `declare const trackBalanceChangeOnce: (callback: () => void) => void;`;

    const usage = `import { sendTransaction, trackBalanceChangeOnce } from '@cfxjs/use-wallet-${currentLib}/conflux';
    
const handleSendTransaction = async() => {
    try {
        const TxnHash = await sendTransaction({
            // Replace 'to' with the account you want to send to and 'value' with the amount you want to send
            to: to,  
            value: Unit.fromStandardUnit(value).toHexMinUnit(), 
        });

        trackBalanceChangeOnce(() => {
            console.log("transaction complete");
        })
    } catch (err) {
        console.error(err);
    }
}`;

    return (
        <section>
            <h3>trackBalanceChangeOnce</h3>

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

export default TrackBalanceChangeOnce;
