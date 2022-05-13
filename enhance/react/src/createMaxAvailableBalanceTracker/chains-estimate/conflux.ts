import { type store, Unit } from '@cfxjs/use-wallet-react/conflux';

const oneCFX = Unit.fromMinUnit('0xde0b6b3a7640000');
const oneDrip = Unit.fromMinUnit(1);
const zeroCFX = Unit.fromMinUnit(0);
const _1024Drip = Unit.fromMinUnit(1024);

async function cfxEstimateGasAndCollateralAdvance(rpcUrl: string, tx: any): Promise<any> {
    try {
        const estimateRst = await fetch(rpcUrl, {
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'cfx_estimateGasAndCollateral',
                params: [tx, 'latest_state'],
                id: 1,
            }),
            headers: { 'content-type': 'application/json' },
            method: 'POST',
        })
            .then((response) => response.json())
            .then((res: Record<string, any>) => res.result);
        return estimateRst;
    } catch (err: any) {
        if (err.message?.includes?.('nonce is too old')) {
            tx.nonce = Unit.fromMinUnit(tx.nonce).add(oneDrip).toHexMinUnit();
            return await cfxEstimateGasAndCollateralAdvance(rpcUrl, tx);
        } else {
            throw err;
        }
    }
}

interface GetFeeDataParams {
    gas?: string;
    gasPrice?: string;
    storageLimit?: string;
    value?: Unit;
    balance: Unit;
}

const cfxGetFeeData = ({ gas = '0x5208', gasPrice = '0x1', storageLimit = '0x0', value = zeroCFX, balance }: GetFeeDataParams) => {
    const gasFeeDrip = Unit.fromMinUnit(gas).mul(Unit.fromMinUnit(gasPrice));
    const storageFeeDrip = Unit.fromMinUnit(storageLimit).mul(oneCFX).div(_1024Drip);
    const txFeeDrip = gasFeeDrip.add(storageFeeDrip);
    const valueDrip = value;
    const wholeTxDrip = txFeeDrip.add(valueDrip);
    let nativeMaxDrip = balance.sub(txFeeDrip);
    let restNativeBalanceDrip = nativeMaxDrip.sub(valueDrip);
    const isBalanceEnough = restNativeBalanceDrip.greaterThanOrEqualTo(zeroCFX);
    nativeMaxDrip = nativeMaxDrip.greaterThanOrEqualTo(zeroCFX) ? nativeMaxDrip : zeroCFX;
    restNativeBalanceDrip = restNativeBalanceDrip.greaterThanOrEqualTo(zeroCFX) ? restNativeBalanceDrip : zeroCFX;

    return {
        gasFeeDrip: gasFeeDrip.toHexMinUnit(),
        storageFeeDrip: storageFeeDrip.toHexMinUnit(),
        txFeeDrip: txFeeDrip.toHexMinUnit(),
        wholeTxDrip: wholeTxDrip.toHexMinUnit(),
        nativeMaxDrip: nativeMaxDrip.toHexMinUnit(),
        isBalanceEnough,
        restNativeBalanceDrip: restNativeBalanceDrip.toHexMinUnit(),
    };
};

interface TransactionParameters {
    to?: string;
    value?: string;
    data?: string;
    gas?: string;
    gasPrice?: string;
    storageLimit?: string;
    nonce?: string;
}

interface EstimateConf {
    rpcUrl: string;
    store: typeof store;
    toAddressType?: 'user' | 'contract';
    tokensAmount?: any;
}

const cfxEstimate = async (
    tx: TransactionParameters = {},
    {
        store,
        rpcUrl,
        toAddressType, // networkId,
    }: EstimateConf
) => {
    let newTx = { ...tx };
    let { to, gasPrice: customGasPrice, gas: customGasLimit, storageLimit: customStorageLimit, nonce: customNonce, data } = newTx;
    let gasPrice, nonce;
    const { accounts, balance } = store.getState();
    const from = accounts?.[0];
    if (!from || !balance) throw new Error(`Invalid from or balance`);
    const value = Unit.lessThan(balance, Unit.fromStandardUnit('16e-12')) ? Unit.fromStandardUnit(0) : Unit.sub(balance, Unit.fromStandardUnit('16e-12'));
    if (!to && !data) throw new Error(`Invalid tx, to and data are both undefined`);

    const promises = [];
    // check if to is a contract address if to exits and its type is not provided
    if (to && !toAddressType) {
        promises.push(
            fetch(rpcUrl, {
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'wallet_detectAddressType',
                    params: [{ address: to }, 'latest'],
                    id: 1,
                }),
                headers: { 'content-type': 'application/json' },
                method: 'POST',
            })
                .then((response) => response.json())
                .then((res: Record<string, string>) => {
                    toAddressType = res.result as EstimateConf['toAddressType'];
                })
        );
    }

    // get gasPrice
    await fetch(rpcUrl, {
        body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'cfx_gasPrice',
            id: 1,
        }),
        headers: { 'content-type': 'application/json' },
        method: 'POST',
    })
        .then((response) => response.json())
        .then((res: Record<string, string>) => {
            gasPrice = res.result;
        });

    // get nonce, since it may affect estimateGasAndCollateral result
    if (!nonce) {
        promises.push(
            fetch(rpcUrl, {
                body: JSON.stringify({
                    jsonrpc: '2.0',
                    method: 'cfx_getNextUsableNonce',
                    params: [from, 'latest_state'],
                    id: 1,
                }),
                headers: { 'content-type': 'application/json' },
                method: 'POST',
            })
                .then((response) => response.json())
                .then((res: Record<string, string>) => {
                    nonce = res.result;
                })
        );
    }

    // wait for all those values
    await Promise.all(promises);

    // simple send tx, gas is 21000, storageLimit is 0
    if (to && (!data || data === '0x')) {
        const clcGasPrice = customGasPrice || gasPrice;
        const clcGasLimit = customGasLimit || '0x5208'; /* 21000 */
        const clcStorageLimit = customStorageLimit || '0x0';
        const cfxFeeData = cfxGetFeeData({
            gasPrice: clcGasPrice,
            gas: clcGasLimit,
            storageLimit: clcStorageLimit,
            value,
            balance,
        });
        if (toAddressType === 'user')
            return {
                ...cfxFeeData,
                gasPrice,
                gasUsed: '0x5208',
                gasLimit: '0x5208',
                storageCollateralized: '0x0',
                nonce,
                customGasPrice,
                customGasLimit,
                customStorageLimit,
                customNonce,
                willPayCollateral: true,
                willPayTxFee: true,
            };
    }

    // delete passed in gas/storage data, since they may affect
    // estimateGasAndCollateral result
    delete newTx.gas;
    delete newTx.storageLimit;
    delete newTx.gasPrice;
    newTx.nonce = nonce;

    // run estimate
    let rst = await cfxEstimateGasAndCollateralAdvance(rpcUrl, newTx);
    const { gasLimit, storageCollateralized } = rst;
    const clcGasPrice = customGasPrice || gasPrice;
    const clcGasLimit = customGasLimit || gasLimit;
    const clcStorageLimit = customStorageLimit || storageCollateralized;

    rst = {
        ...rst,
    };

    if (toAddressType === 'contract') {
        // check sponsor info if is contract interaction
        const { isBalanceEnough, willPayCollateral, willPayTxFee } = await fetch(rpcUrl, {
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'cfx_checkBalanceAgainstTransaction',
                params: [
                    from,
                    to,
                    // prioritiz custom value so that user can adjust them for sponsorship
                    clcGasLimit,
                    clcGasPrice,
                    clcStorageLimit,
                    'latest_state',
                ],
                id: 1,
            }),
            headers: { 'content-type': 'application/json' },
            method: 'POST',
        })
            .then((response) => response.json())
            .then((res: Record<string, any>) => (toAddressType = res.result));
        const cfxFeeData = cfxGetFeeData({
            gasPrice: clcGasPrice,
            gas: clcGasLimit,
            storageLimit: clcStorageLimit,
            value,
            balance,
        });
        rst = {
            ...rst,
            ...cfxFeeData,
            isBalanceEnough,
            willPayCollateral,
            willPayTxFee,
        };
    } else {
        const cfxFeeData = cfxGetFeeData({
            gasPrice: clcGasPrice,
            gas: clcGasLimit,
            storageLimit: clcStorageLimit,
            value,
            balance,
        });
        rst = {
            ...rst,
            ...cfxFeeData,
            willPayCollateral: true,
            willPayTxFee: true,
        };
    }

    rst.gasPrice = gasPrice;
    rst.nonce = newTx.nonce;
    rst.customGasPrice = customGasPrice;
    rst.customGasLimit = customGasLimit;
    rst.customStorageLimit = customStorageLimit;
    rst.customNonce = customNonce;

    return rst;
};

export default async function estimate(...params: Parameters<typeof cfxEstimate>) {
    const res = await cfxEstimate(...params)
    return res.nativeMaxDrip;
}
