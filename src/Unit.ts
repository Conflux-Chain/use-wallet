import Decimal from 'decimal.js';

const ratio = Decimal.pow(10, 18);

class Unit {
    private value: Decimal; // decimal min unit('drip' in conflux and 'wei' in eth).

    constructor(value: Decimal) {
        this.value = value;
    }

    static fromStandardUnit = (value: string | number) => {
        return new Unit(new Decimal(value).mul(ratio));
    };

    static fromMinUnit = (value: string | number) => {
        return new Unit(new Decimal(value));
    };
    
    static equals = (a: Unit, b: Unit) => {
        return a.value.eq(b.value);
    }

    static lessThan = (a: Unit, b: Unit) => {
        return a.value.lessThan(b.value);
    }

    static greaterThan = (a: Unit, b: Unit) => {
        return a.value.greaterThan(b.value);
    }

    static lessThanOrEqualTo = (a: Unit, b: Unit) => {
        return a.value.lessThanOrEqualTo(b.value);
    }

    static greaterThanOrEqualTo = (a: Unit, b: Unit) => {
        return a.value.greaterThanOrEqualTo(b.value);
    }

    static add = (a: Unit, b: Unit) => {
        return new Unit(a.value.add(b.value));
    }

    static sub = (a: Unit, b: Unit) => {
        return new Unit(a.value.sub(b.value));
    }

    static mul = (a: Unit, b: Unit) => {
        return new Unit(a.value.mul(b.value));
    }

    static div = (a: Unit, b: Unit) => {
        return new Unit(a.value.div(b.value));
    }

    equalsWith = (another: Unit) => {
        return this.value.eq(another.value);
    }

    toDecimalStandardUnit = (toFixed?: number) => {
        if (typeof toFixed === 'number' && toFixed > 0) {
            const strVal = this.value.div(ratio).toString();
            const dotIndex = strVal.indexOf('.');
            if (dotIndex === -1) return strVal + '.' + '0'.repeat(toFixed);
            if (strVal.length - dotIndex - 1 < toFixed) return strVal + '0'.repeat(toFixed - (strVal.length - dotIndex - 1));
            return strVal.slice(0, dotIndex) + '.' + strVal.slice(dotIndex + 1, dotIndex + toFixed + 1);
        }
        return this.value.div(ratio).toString();
    };

    toHexStandardUnit = () => {
        return this.value.div(ratio).toHex();
    };

    toDecimalMinUnit = () => {
        return this.value.toString();
    };

    toHexMinUnit = () => {
        return this.value.toHex();
    };

    [Symbol.toPrimitive](hint: 'string' | 'number' | 'default') {
        return hint == 'string' ? this.toDecimalStandardUnit() : this.value;
    }
}

export default Unit;