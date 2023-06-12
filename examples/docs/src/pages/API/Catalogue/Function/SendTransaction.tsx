import React from 'react';
import Code from '@components/Code';
import useI18n, { compiled } from '@hooks/useI18n';
import useCurrentLib from '@hooks/useCurrentLib';

const transitions = {
    en: {
        step1: `The <code>sendTransaction</code> function return a Promise. Calling <code>sendTransaction</code> when the status is <code>'active'</code> will raise the wallet to issue a transaction based on the input parameters. If it is not called when <code>'active'</code>, Promise will be rejected.`,
        step2: `Unlike transactions initiated via RPC, <code>sendTransaction</code> only requires three parameters: <code>to</code>, <code>value</code>, and <code>data</code> (if any), and the <code>from</code> parameter is built into the <strong>current account</strong>.`,
        step3: `The <code>value</code> should be a hexadecimal string starting with '0x', indicating the smallest unit of the corresponding currency ('drip' in conflux | 'wei' in ethereum). 'Undefined' <code>value</code> is equivalent to filling in '0x0'.`,
        step4: `A successful transaction will resolve <code>hash-string</code>, a failed transaction will reject.`,
    },
    zh: {
        step1: `<code>sendTransaction</code> 函数返回一个 Promise。在 status 为 <code>'active'</code> 时调用 <code>sendTransaction</code>，会根据入参调起钱包签发一笔交易。如果不在 <code>'active'</code> 时调用，Promise 会直接 reject。`,
        step2: `不同于通过 RPC 发起的交易，<code>sendTransaction</code> 只需要填 <code>to</code>、<code>value</code>、<code>data</code> (如果有) 这三个参数，<code>from</code> 参数内置为<strong>当前账户</strong>。`,
        step3: `<code>value</code> 应该为 '0x' 开头的 16 进制数字字符串，表示对应货币的最小单位（'drip' in conflux | 'wei' in ethereum）。不填 <code>value</code> 等效于填 '0x0'。`,
        step4: `成功交易会 resolve <code>hash-string</code>，失败则 reject。`,
    },
} as const;

const SendTransaction: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();
    const code = `declare const sendTransaction: ({ from, to, value, data }: {
        to: string;
        value?: string;
        data?: string | undefined;
    }) => Promise<string>;`;
    const usage = `import { sendTransaction } from '@cfxjs/use-wallet-${currentLib}/conflux';
    
const handleSendTransaction = async() => {
    try {
        const TxnHash = await sendTransaction({
            // Replace 'to' with the account you want to send to and 'value' with the amount you want to send
            to: to,  
            value: Unit.fromStandardUnit(value).toHexMinUnit(), 
        });
        console.log(TxnHash);
    } catch (err) {
        console.error(err);
    }
}`;

    return (
        <section>
            <h3>sendTransaction</h3>

            <h4>declare:</h4>
            <Code language="ts">{code}</Code>

            <h4>Usage:</h4>
            <Code language="ts">{usage}</Code>

            <h4>Description:</h4>
            <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step1, {}) }} />
            <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step2, {}) }} />
            <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step3, {}) }} />
            <p dangerouslySetInnerHTML={{ __html: compiled(i18n.step4, {}) }} />
        </section>
    );
};

export default SendTransaction;
