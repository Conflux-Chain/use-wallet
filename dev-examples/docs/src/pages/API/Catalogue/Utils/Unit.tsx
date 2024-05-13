import React from 'react';
import Code from '@components/Code';
import useI18n from '@hooks/useI18n';
import useCurrentLib from '@hooks/useCurrentLib';

const transitions = {
    en: {
        step1: `The balance type returned by useBalance is Unit, which is used to facilitate the development of Dapp to handle the problem of inconsistency between the balance displayed to the user and the balance unit required for issuing a transaction in a uniform manner.`,
        step2: `<coed>value</code> is a private member variable of the <code>Unit</code> instance, meaning <strong>the smallest unit of the corresponding currency ('drip' in conflux | 'wei' in ethereum)</strong>. It uses the library 'decimal.js' to perform calculations with sufficient precision.`,
        step3: `StandardUnit refers to 'cfx' | 'eth'. <code>toDecimalStandardUnit</code> returns a decimal string in units of StandardUnit.`,
        step4: `StandardUnit refers to 'cfx' | 'eth'. <code>toHexStandardUnit</code> returns a hexadecimal string in units of StandardUnit.`,
        step5: `MinUnit refers to 'drip' | 'wei'. <code>toDecimalMinUnit</code> returns a decimal string in MinUnit.`,
        step6: `MinUnit refers to 'drip' | 'wei'. <code>toHexMinUnit</code> returns a hexadecimal string in MinUnit.`,
        step7: `<code>formStandardUnit</code> accepts hexadecimal numbers starting with '0x' and decimal numbers (in StandardUnit) and returns a standard <code>Unit</code> instance.`,
        step8: `<code>formMinUnit</code> accepts hexadecimal numbers starting with '0x' and decimal numbers (in MinUnit) and returns a standard <code>Unit</code> instance.`,
        step9: `You should use the Unit's static member methods to <strong>get/calculate the value of the currency</strong>. Use the Unit's instance methods to <strong>display the value of the currency</strong> in the user interface.`,
    },
    zh: {
        step1: `<code>useBalance</code> 返回的余额类型为 <code>Unit</code>。这是为了方便开发 Dapp 的时候统一地处理显示给用户的余额与签发交易时需要的余额单位不一致的问题。`,
        step2: `<code>value</code> 是 <code>Unit</code> 实例中的私有成员变量，含义是<strong>相应货币的最小单位 ('drip' in conflux | 'wei' in ethereum)</strong>。它使用了 'decimal.js' 这个库以进行足够精度的计算。`,
        step3: `StandardUnit 指的是 'cfx' | 'eth'。<code>toDecimalStandardUnit</code> 返回一个十进制字符串，单位为 StandardUnit。`,
        step4: `StandardUnit 指的是 'cfx' | 'eth'。<code>toHexStandardUnit</code> 返回一个十六进制字符串，单位为 StandardUnit。`,
        step5: `MinUnit 指的是 'drip' | 'wei'。<code>toDecimalMinUnit</code> 返回一个十进制字符串，单位为 MinUnit。`,
        step6: `MinUnit 指的是 'drip' | 'wei'。<code>toHexMinUnit</code> 返回一个十六进制字符串，单位为 MinUnit。`,
        step7: `<code>formStandardUnit</code> 接受以 '0x' 开头的十六进制数字和十进制数字（单位为 StandardUnit），返回一个标准的 <code>Unit</code> 实例。`,
        step8: `<code>formMinUnit</code> 接受以 '0x' 开头的十六进制数字和十进制数字（单位为 MinUnit），返回一个标准的 <code>Unit</code> 实例。`,
        step9: `你应该使用 Unit 的静态成员方法来<strong>获取/计算货币的值</strong>。用 Unit 的实例方法在用户界面上<strong>显示货币的值</strong>。`,
    },
} as const;

const Unit: React.FC = () => {
    const i18n = useI18n(transitions);
    const currentLib = useCurrentLib();
    const usage = `import { Unit, useBalance } from '@cfxjs/use-wallet-${currentLib}/conflux/Fluent';
    
const UnitDemo: React.FC = () => {
    const balance = useBalance();
    //An instance of Uint on user balance
    console.log(balance);  

    //A Uint instance on inputting numbers in StandardUnit
    console.log(Unit.fromStandardUnit(0x123));  

    //A Uint instance on inputting numbers in MinUnit
    console.log(Unit.fromMinUnit(123));  
      
    return (
        <>
            //Decimal representation of user balance in StandardUnit
            <p>{balance?.toDecimalStandardUnit()}</p>

            //Hexadecimal representation of the user balance in StandardUnit
            <p>{balance?.toHexStandardUnit()}</p>

            //Decimal representation of user balance in MinUnit
            <p>{balance?.toDecimalMinUnit()}</p>

            //Hexadecimal representation of the user balance in MinUnit
            <p>{balance?.toHexMinUnit()}</p>
        </>
    );
};`;

    return (
        <section>
            <h3>Unit</h3>

            <h4>declare:</h4>
            <Code language="ts">{code}</Code>

            <h4>Usage:</h4>
            <Code language="ts">{usage}</Code>

            <h4 className="mt-[16px]">Description:</h4>
            <p dangerouslySetInnerHTML={{ __html: i18n.step1 }} />

            <p>
                <strong>
                    <code>value:</code>
                </strong>
            </p>
            <p dangerouslySetInnerHTML={{ __html: i18n.step2 }} />

            <p>
                <strong>
                    <code>toDecimalStandardUnit:</code>
                </strong>
            </p>
            <p dangerouslySetInnerHTML={{ __html: i18n.step3 }} />

            <p>
                <strong>
                    <code>toHexStandardUnit:</code>
                </strong>
            </p>
            <p dangerouslySetInnerHTML={{ __html: i18n.step4 }} />

            <p>
                <strong>
                    <code>toDecimalMinUnit:</code>
                </strong>
            </p>
            <p dangerouslySetInnerHTML={{ __html: i18n.step5 }} />

            <p>
                <strong>
                    <code>toHexMinUnit:</code>
                </strong>
            </p>
            <p dangerouslySetInnerHTML={{ __html: i18n.step6 }} />

            <p>
                <strong>
                    <code>fromStandardUnit:</code>
                </strong>
            </p>
            <p dangerouslySetInnerHTML={{ __html: i18n.step7 }} />

            <p>
                <strong>
                    <code>fromMinUnit:</code>
                </strong>
            </p>
            <p dangerouslySetInnerHTML={{ __html: i18n.step8 }} />
            <p dangerouslySetInnerHTML={{ __html: i18n.step9 }} />
        </section>
    );
};

const code = `declare class Unit {
    private value: Decimal;
    constructor(value: Decimal);
    equalsWith: (another: Unit) => boolean;
    toDecimalStandardUnit: (toFixed?: number | undefined, decimals: number = 18) => string;
    toHexStandardUnit: (decimals: number = 18) => string;
    toDecimalMinUnit: () => string;
    toHexMinUnit: () => string;
    static fromStandardUnit: (value: string | number, decimals: number = 18) => Unit;
    static fromMinUnit: (value: string | number) => Unit;
    static equals: (a: Unit, b: Unit) => boolean;
    static lessThan: (a: Unit, b: Unit) => boolean;
    static greaterThan: (a: Unit, b: Unit) => boolean;
    static lessThanOrEqualTo: (a: Unit, b: Unit) => boolean;
    static greaterThanOrEqualTo: (a: Unit, b: Unit) => boolean;
    static add: (a: Unit, b: Unit) => Unit;
    static sub: (a: Unit, b: Unit) => Unit;
    static mul: (a: Unit, b: Unit) => Unit;
    static div: (a: Unit, b: Unit) => Unit;
    equals: (another: Unit) => boolean;
    lessThan: (another: Unit) => boolean;
    greaterThan: (another: Unit) => boolean;
    lessThanOrEqualTo: (another: Unit) => boolean;
    greaterThanOrEqualTo: (another: Unit) => boolean;
    add: (another: Unit) => Unit;
    sub: (another: Unit) => Unit;
    mul: (another: Unit) => Unit;
    div: (another: Unit) => Unit;
    [Symbol.toPrimitive](hint: 'string' | 'number' | 'default'): string | Decimal;
}`;

export default Unit;
