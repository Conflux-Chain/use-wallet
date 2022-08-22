import Decimal from 'decimal.js';
Decimal.set({ precision: 50  });

const calcDecimals = (decimals: number = 18) => {
    let _decimals: number = decimals;;
    if (typeof decimals !== 'number' || decimals <= 0) {
        _decimals = 18;
    }

    return Decimal.pow(10, _decimals);
}

class Unit {
    private value: Decimal; // decimal min unit('drip' in conflux and 'wei' in eth).

    constructor(value: Decimal) {
        this.value = value;
    }

    static fromStandardUnit = (value: string | number, decimals: number = 18) => {
        return new Unit(new Decimal(value).mul(calcDecimals(decimals)));
    };

    static fromMinUnit = (value: string | number) => {
        return new Unit(new Decimal(value));
    };
    
    static equals = (a: Unit, b: Unit) => {
        return a.value.eq(b.value);
    }

    equals = (another: Unit) => {
        return this.value.eq(another.value);
    }

    static lessThan = (a: Unit, b: Unit) => {
        return a.value.lessThan(b.value);
    }

    lessThan = (another: Unit) => {
        return this.value.lessThan(another.value);
    }

    static greaterThan = (a: Unit, b: Unit) => {
        return a.value.greaterThan(b.value);
    }

    greaterThan = (another: Unit) => {
        return this.value.greaterThan(another.value);
    }

    static lessThanOrEqualTo = (a: Unit, b: Unit) => {
        return a.value.lessThanOrEqualTo(b.value);
    }

    lessThanOrEqualTo = (another: Unit) => {
        return this.value.lessThanOrEqualTo(another.value);
    }

    static greaterThanOrEqualTo = (a: Unit, b: Unit) => {
        return a.value.greaterThanOrEqualTo(b.value);
    }

    greaterThanOrEqualTo = (another: Unit) => {
        return this.value.greaterThanOrEqualTo(another.value);
    }


    static add = (a: Unit, b: Unit) => {
        return new Unit(a.value.add(b.value));
    }

    add = (another: Unit) => {
        return new Unit(this.value.add(another.value));
    }


    static sub = (a: Unit, b: Unit) => {
        return new Unit(a.value.sub(b.value));
    }

    sub = (another: Unit) => {
        return new Unit(this.value.sub(another.value));
    }

    static mul = (a: Unit, b: Unit) => {
        return new Unit(a.value.mul(b.value));
    }

    mul = (another: Unit) => {
        return new Unit(this.value.mul(another.value));
    }

    static div = (a: Unit, b: Unit) => {
        return new Unit(a.value.div(b.value));
    }

    div = (another: Unit) => {
        return new Unit(this.value.div(another.value));
    }

    static pow = (a: Unit, b: Unit) => {
        return new Unit(a.value.pow(b.value));
    }

    pow = (another: Unit) => {
        return new Unit(this.value.pow(another.value));
    }

    equalsWith = (another: Unit) => {
        return this.value.eq(another.value);
    }

    toDecimalStandardUnit = (toFixed?: number, decimals: number = 18) => {
        if (typeof toFixed === 'number' && toFixed > 0) {
            const strVal = this.value.div(calcDecimals(decimals)).toString();
            const dotIndex = strVal.indexOf('.');
            if (dotIndex === -1) return strVal + '.' + '0'.repeat(toFixed);
            if (strVal.length - dotIndex - 1 < toFixed) return strVal + '0'.repeat(toFixed - (strVal.length - dotIndex - 1));
            return strVal.slice(0, dotIndex) + '.' + strVal.slice(dotIndex + 1, dotIndex + toFixed + 1);
        }
        return this.value.div(calcDecimals(decimals)).toString();
    };

    toHexStandardUnit = (decimals: number = 18) => {
        return this.value.div(calcDecimals(decimals)).toHex();
    };

    toDecimalMinUnit = (toFixed?: number) => {
        if (typeof toFixed === 'number' && toFixed > 0) {
            const strVal = this.value.toString();
            const dotIndex = strVal.indexOf('.');
            if (dotIndex === -1) return strVal + '.' + '0'.repeat(toFixed);
            if (strVal.length - dotIndex - 1 < toFixed) return strVal + '0'.repeat(toFixed - (strVal.length - dotIndex - 1));
            return strVal.slice(0, dotIndex) + '.' + strVal.slice(dotIndex + 1, dotIndex + toFixed + 1);
        }
        return this.value.toString();
    };

    toHexMinUnit = () => {
        return this.value.toHex();
    };

    toString = () => {
        return this.toDecimalStandardUnit();
    }

    [Symbol.toPrimitive](hint: 'string' | 'number' | 'default') {
        return hint == 'string' ? this.toDecimalStandardUnit() : this.value;
    }
}

export default Unit;