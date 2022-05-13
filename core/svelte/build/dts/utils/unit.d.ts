import Decimal from 'decimal.js';
declare class Unit {
    private value;
    constructor(value: Decimal);
    static fromStandardUnit: (value: string | number, decimals?: number) => Unit;
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
    equalsWith: (another: Unit) => boolean;
    toDecimalStandardUnit: (toFixed?: number | undefined, decimals?: number) => string;
    toHexStandardUnit: (decimals?: number | undefined) => string;
    toDecimalMinUnit: () => string;
    toHexMinUnit: () => string;
    [Symbol.toPrimitive](hint: 'string' | 'number' | 'default'): string | Decimal;
}
export default Unit;
