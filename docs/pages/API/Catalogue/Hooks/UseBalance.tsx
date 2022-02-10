import React from 'react';
import Code from '@components/Code';
import useI18n from '@hooks/useI18n';

const transitions = {
    en: {
        step1: `useBalance return current account in the wallet. If the status is 'not-active' for unauthorized connection, the return value is undefined.`,
        step2: `The return of useBalance is an instance object of Unit, whose value unit is the smallest unit of the currency ('drip' in conflux | 'wei' in ethereum). The details of how to operate this can be found in the <a href="#/api/utils">Unit description in Utils</a>.`
    },
    zh: {
        step1: `useBalance 返回当前钱包中账户的余额。如果是 status 为 'not-active' 的未授权连接状态，返回值为 undefined。`,
        step2: `useBalance 的返回单位为 Unit 的实例对象，其内的 value 单位为币种的最小单位（'drip' in conflux | 'wei' in ethereum）。具体的操作方法可以见 <a href="#/api/utils">Utils 中 Unit</a> 的具体介绍。`
    },
} as const;

const UseBalance: React.FC = () => {
    const i18n = useI18n(transitions);

    return (
        <section>
            <h3>useBalance</h3>

            <h4>declare:</h4>
            <Code language='ts'>
                {code}
            </Code>

            <h4 className='mt-[16px]'>Description:</h4>
            <p>{i18n.step1}</p>
            <p dangerouslySetInnerHTML={{ __html: i18n.step2 }}/>
        </section>
    );
}

const code = `declare const useBalance: () => Unit | undefined;

declare class Unit {
    private value: Decimal;
    constructor(value: Decimal);
    static fromStandardUnit: (value: string | number) => Unit;
    static fromMinUnit: (value: string | number) => Unit;
    static equals: (a: Unit, b: Unit) => boolean;
    static add: (a: Unit, b: Unit) => Unit;
    static sub: (a: Unit, b: Unit) => Unit;
    static mul: (a: Unit, b: Unit) => Unit;
    static div: (a: Unit, b: Unit) => Unit;
    equalsWith: (another: Unit) => boolean;
    toDecimalStandardUnit: (toFixed?: number | undefined) => string;
    toHexStandardUnit: () => string;
    toDecimalMinUnit: () => string;
    toHexMinUnit: () => string;
    [Symbol.toPrimitive](hint: 'string' | 'number' | 'default'): string | Decimal;
}`

export default UseBalance;