import Decimal from 'decimal.js';
Decimal.set({ precision: 80 });

const calcDecimals = (decimals: number = 18) => {
    let _decimals: number = decimals;
    if (typeof decimals !== 'number' || decimals <= 0) {
        _decimals = 18;
    }

    return Decimal.pow(10, _decimals);
};

type ValidValue = string | number | Decimal | bigint | Unit;

const isBigint = (value: any): value is bigint => typeof value === 'bigint';

class Unit {
    public value: Decimal; // decimal min unit('drip' in conflux and 'wei' in eth).

    constructor(value: ValidValue) {
        if (Unit.isUnit(value)) {
            this.value = value.value;
        } else if (Decimal.isDecimal(value)) {
            this.value = value;
        } else {
            this.value = new Decimal(isBigint(value) ? value.toString() : value);
        }
    }
    static isUnit = (obj: any): obj is Unit => obj instanceof Unit;

    static fromStandardUnit = (value: ValidValue, decimals: number = 18) => {
        if (Decimal.isDecimal(value) || Unit.isUnit(value)) {
            return new Unit(value.mul(calcDecimals(decimals)));
        }
        return new Unit(new Decimal(isBigint(value) ? value.toString() : value).mul(calcDecimals(decimals)));
    };

    static fromMinUnit = (value: ValidValue) => {
        if (Decimal.isDecimal(value) || Unit.isUnit(value)) {
            return new Unit(value);
        }
        return new Unit(new Decimal(isBigint(value) ? value.toString() : value));
    };

    static fromDecimal = (value: ValidValue) => {
        return Unit.fromMinUnit(value);
    };

    static equals = (a: ValidValue, b: ValidValue) => {
        const _a = new Unit(a);
        const _b = new Unit(b);
        return _a.value.eq(_b.value);
    };

    static min = (a: ValidValue, b: ValidValue) => {
        const _a = new Unit(a);
        const _b = new Unit(b);
        return _a.greaterThan(_b) ? _b : _a;
    };

    static max = (a: ValidValue, b: ValidValue) => {
        const _a = new Unit(a);
        const _b = new Unit(b);
        return _a.greaterThan(_b) ? _a : _b;
    };

    static clamp = (value: ValidValue, min: ValidValue, max: ValidValue) => {
        const _value = new Unit(value);
        const _min = new Unit(min);
        const _max = new Unit(max);
        return _value.greaterThan(_max) ? _max : _value.lessThan(_min) ? _min : _value;
    }

    equals = (another: ValidValue) => {
        const _another = new Unit(another);
        return this.value.eq(_another.value);
    };

    static lessThan = (a: ValidValue, b: ValidValue) => {
        const _a = new Unit(a);
        const _b = new Unit(b);
        return _a.value.lessThan(_b.value);
    };

    lessThan = (another: ValidValue) => {
        const _another = new Unit(another);
        return this.value.lessThan(_another.value);
    };

    static greaterThan = (a: ValidValue, b: ValidValue) => {
        const _a = new Unit(a);
        const _b = new Unit(b);
        return _a.value.greaterThan(_b.value);
    };

    greaterThan = (another: ValidValue) => {
        const _another = new Unit(another);
        return this.value.greaterThan(_another.value);
    };

    static lessThanOrEqualTo = (a: ValidValue, b: ValidValue) => {
        const _a = new Unit(a);
        const _b = new Unit(b);
        return _a.value.lessThanOrEqualTo(_b.value);
    };

    lessThanOrEqualTo = (another: ValidValue) => {
        const _another = new Unit(another);
        return this.value.lessThanOrEqualTo(_another.value);
    };

    static greaterThanOrEqualTo = (a: ValidValue, b: ValidValue) => {
        const _a = new Unit(a);
        const _b = new Unit(b);
        return _a.value.greaterThanOrEqualTo(_b.value);
    };

    greaterThanOrEqualTo = (another: ValidValue) => {
        const _another = new Unit(another);
        return this.value.greaterThanOrEqualTo(_another.value);
    };

    static add = (a: ValidValue, b: ValidValue) => {
        const _a = new Unit(a);
        const _b = new Unit(b);
        return new Unit(_a.value.add(_b.value));
    };

    add = (another: ValidValue) => {
        const _another = new Unit(another);
        return new Unit(this.value.add(_another.value));
    };

    static sub = (a: ValidValue, b: ValidValue) => {
        const _a = new Unit(a);
        const _b = new Unit(b);
        return new Unit(_a.value.sub(_b.value));
    };

    sub = (another: ValidValue) => {
        const _another = new Unit(another);
        return new Unit(this.value.sub(_another.value));
    };

    static mul = (a: ValidValue, b: ValidValue) => {
        const _a = new Unit(a);
        const _b = new Unit(b);
        return new Unit(_a.value.mul(_b.value));
    };

    mul = (another: ValidValue) => {
        const _another = new Unit(another);
        return new Unit(this.value.mul(_another.value));
    };

    static div = (a: ValidValue, b: ValidValue) => {
        const _a = new Unit(a);
        const _b = new Unit(b);
        return new Unit(_a.value.div(_b.value));
    };

    div = (another: ValidValue) => {
        const _another = new Unit(another);
        return new Unit(this.value.div(_another.value));
    };

    static pow = (a: ValidValue, b: ValidValue) => {
        const _a = new Unit(a);
        const _b = new Unit(b);
        return new Unit(_a.value.pow(_b.value));
    };

    pow = (another: ValidValue) => {
        const _another = new Unit(another);
        return new Unit(this.value.pow(_another.value));
    };

    static log = (a: ValidValue, b: ValidValue) => {
        const _a = new Unit(a);
        const _b = new Unit(b);
        return new Unit(_a.value.log(_b.value));
    };

    log = (another: ValidValue) => {
        const _another = new Unit(another);
        return new Unit(this.value.log(_another.value));
    };

    static sqrt = (target: ValidValue) => {
        const _target = new Unit(target);
        return new Unit(_target.value.sqrt());
    };

    sqrt = () => {
        return new Unit(this.value.sqrt());
    };

    static mod = (a: ValidValue, b: ValidValue) => {
        const _a = new Unit(a);
        const _b = new Unit(b);
        return new Unit(_a.value.mod(_b.value));
    };

    mod = (another: ValidValue) => {
        const _another = new Unit(another);
        return new Unit(this.value.mod(_another.value));
    };

    equalsWith = (another: ValidValue) => {
        const _another = new Unit(another);
        return this.value.eq(_another.value);
    };

    isNaN = () => {
        return this.value.isNaN();
    };

    static isNaN = (target: ValidValue) => {
        if (typeof target !== 'object') {
            return Number.isNaN(Number(target));
        }
        if (Decimal.isDecimal(target)) return target.isNaN();
        if (Unit.isUnit(target)) return target.isNaN();
        return false;
    };

    isFinite = () => {
        return this.value.isFinite();
    };

    static isFinite = (target: ValidValue) => {
        if (typeof target !== 'object') {
            return Number.isFinite(Number(target));
        }
        if (Decimal.isDecimal(target)) return target.isFinite();
        if (Unit.isUnit(target)) return target.isFinite();
        return false;
    };

    toDecimalStandardUnit = (toFixed?: number, decimals: number = 18) => {
        if (typeof toFixed === 'number' && toFixed >= 0) {
            const strVal = this.value.div(calcDecimals(decimals)).toFixed();
            if (strVal === 'NaN') return strVal;
            if (strVal.indexOf('Infinity') !== -1) return strVal;
            if (strVal.indexOf('e') !== -1) return strVal;
            const dotIndex = strVal.indexOf('.');
            if (toFixed === 0) return strVal.slice(0, dotIndex);
            if (dotIndex === -1) return strVal + '.' + '0'.repeat(toFixed);
            if (strVal.length - dotIndex - 1 < toFixed) return strVal + '0'.repeat(toFixed - (strVal.length - dotIndex - 1));
            return strVal.slice(0, dotIndex) + '.' + strVal.slice(dotIndex + 1, dotIndex + toFixed + 1);
        }
        return this.value.div(calcDecimals(decimals)).toFixed();
    };

    toHexStandardUnit = (decimals: number = 18) => {
        return this.value.div(calcDecimals(decimals)).toHex();
    };

    toDecimalMinUnit = (toFixed?: number) => {
        if (typeof toFixed === 'number' && toFixed >= 0) {
            const strVal = this.value.toFixed();
            if (strVal === 'NaN') return strVal;
            if (strVal.indexOf('Infinity') !== -1) return strVal;
            if (strVal.indexOf('e') !== -1) return strVal;
            const dotIndex = strVal.indexOf('.');
            if (toFixed === 0) return dotIndex === -1 ? strVal : strVal.slice(0, dotIndex);
            if (dotIndex === -1) return strVal + '.' + '0'.repeat(toFixed);
            if (strVal.length - dotIndex - 1 < toFixed) return strVal + '0'.repeat(toFixed - (strVal.length - dotIndex - 1));
            return strVal.slice(0, dotIndex) + '.' + strVal.slice(dotIndex + 1, dotIndex + toFixed + 1);
        }
        return this.value.toFixed();
    };

    toHexMinUnit = () => {
        return this.value.toHex();
    };

    toString = () => {
        return this.toDecimalStandardUnit();
    };

    toDecimal = () => {
        return this.value;
    };

    [Symbol.toPrimitive](hint: 'string' | 'number' | 'default') {
        return hint == 'string' ? this.toDecimalStandardUnit() : this.value;
    }
}

export default Unit;
