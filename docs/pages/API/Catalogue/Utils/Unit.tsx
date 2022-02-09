import React from 'react';
import Code from '@components/Code';
import useI18n from '@hooks/useI18n';

const transitions = {
    en: {
        step1: `The balance type returned by useBalance is Unit, which is used to facilitate the development of Dapp to handle the problem of inconsistency between the balance displayed to the user and the balance unit required for issuing a transaction in a uniform manner.`,
        step2: `The instance of Unit has a private member variable of value, meaning the smallest unit of the corresponding currency ('drip' in conflux | 'wei' in ethereum). It uses the library 'decimal.js' to perform calculations with sufficient precision.`,
        step3: `You should use the Unit's static methods to get/calculate the value of the currency. Use the Unit's instance methods to display the value of the currency in the user interface.`,
        step4: `MinUnit refers to 'drip' | 'wei', StandardUnit refers to 'cfx' | 'eth'. fromStandardUnit/MinUnit supports both hexadecimal strings starting with '0x' and decimal strings.`
    },
    zh: {
        step1: `useBalance 返回的余额类型为 Unit。这是为了方便开发 Dapp 的时候统一地处理显示给用户的余额与签发交易时需要的余额单位不一致的问题。`,
        step2: `Unit 的实例有一个 value 的私有成员变量，含义是 相应货币的最小单位('drip' in conflux | 'wei' in ethereum)。它使用了 'decimal.js' 这个库以进行足够精度的计算。`,
        step3: `你应该使用 Unit 的静态成员方法来 获取/计算 货币的值。用 Unit 的实例方法在用户界面上显示货币的值。`,
        step4: `MinUnit 指的是 'drip' | 'wei', StandardUnit 指的是 'cfx' | 'eth'。fromStandardUnit/MinUnit 的入参同时支持 '0x' 开头的16进制数字字符串和10进制字符串。`
    },
} as const;

const Unit: React.FC = () => {
    const i18n = useI18n(transitions);

    return (
        <section>
            <h3>Unit</h3>

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

const code = `declare class Unit {
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

export default Unit;