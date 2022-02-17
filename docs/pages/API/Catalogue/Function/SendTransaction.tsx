import React from 'react';
import Code from '@components/Code';
import useI18n from '@hooks/useI18n';

const transitions = {
    en: {
        step1: `The sendTransaction function return a Promise. calling sendTransaction when the status is 'active' will raise the wallet to issue a transaction based on the input parameters. If it is not called when 'active', Promise will be rejected.`,
        step2: `Unlike transactions initiated via RPC, sendTransaction only requires three parameters: to, value, and data (if any), and the from parameter is built into the current account.`,
        step3: `The value should be a hexadecimal string starting with '0x', indicating the smallest unit of the corresponding currency ('drip' in conflux | 'wei' in ethereum). 'Undefined' value is equivalent to filling in '0x0'.`,
        step4: `A successful transaction will resolve hash-string, a failed transaction will reject.`,
    },
    zh: {
        step1: `sendTransaction 函数返回一个 Promise。在 status 为 'active' 时调用 sendTransaction，会根据入参调起钱包签发一笔交易。如果不在 'active' 时调用，Promise 会直接 reject。`,
        step2: `不同于通过 RPC 发起的交易，sendTransaction 只需要填 to、value、data(如果有) 这三个参数，from 参数内置为 当前账户。`,
        step3: `value 应该为 '0x' 开头的 16进制数字字符串，表示对应货币的最小单位（'drip' in conflux | 'wei' in ethereum）。不填 value 等效于填 '0x0'。`,
        step4: `成功交易会 resolve hash-string，失败则 reject。`,
    },
} as const;

const SendTransaction: React.FC = () => {
    const i18n = useI18n(transitions);

    return (
        <section>
            <h3>sendTransaction</h3>

            <h4>declare:</h4>
            <Code language='ts'>
                {code}
            </Code>

            <h4 className='mt-[16px]'>Description:</h4>
            <p>{i18n.step1}</p>
            <p>{i18n.step2}</p>
            <p>{i18n.step3}</p>
            <p>{i18n.step4}</p>
        </section>
    );
}

const code = `declare const sendTransaction: ({ from, to, value, data }: {
    to: string;
    value?: string;
    data?: string | undefined;
}) => Promise<string>;`

export default SendTransaction;