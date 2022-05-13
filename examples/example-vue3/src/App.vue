<script setup lang="ts">
import { useStatus, useAccount, useChainId, useBalance, connect, Unit, sendTransaction } from '@cfxjs/use-wallet-vue3/conflux';
const status = useStatus();
const account = useAccount();
const chainId = useChainId();
const balance = useBalance();

// Send 1 native token to self (connected account)
const handleClickSendTransaction = async () => {
    // For ts Type Guards. when status turn to 'active', account|chainId|balance must be exist.
    if (!account.value) return;

    try {
        const TxnHash = await sendTransaction({
            to: account.value,
            value: Unit.fromStandardUnit('1').toHexMinUnit(),
        });
        console.log(TxnHash);
    } catch (err) {
        console.error(err);
    }
};
</script>

<template>
    <div>
        <button v-if="status !== 'in-detecting' && status !== 'active'" @click="connect" :disabled="status !== 'not-active'">
            <template v-if="status === 'in-activating'">Connecting...</template>
            <template v-if="status === 'not-installed'">Fluent Not Install</template>
            <template v-if="status === 'not-active'">Connect Fluent</template>
        </button>
        <div v-else-if="status === 'active'">
            <p>account: {{ account }}</p>
            <p>chainId: {{ chainId }}</p>
            <p>balance: {{ `${balance?.toDecimalStandardUnit()} CFX` }}</p>

            <button @click="handleClickSendTransaction">Send 1 native token to self (connected account)</button>
        </div>
    </div>
</template>
