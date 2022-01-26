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
            return this.value.div(ratio).toFixed(toFixed);
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