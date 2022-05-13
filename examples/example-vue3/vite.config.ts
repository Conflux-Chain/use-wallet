import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@cfxjs/use-wallet-vue3/conflux': path.resolve(__dirname, '../../core/vue3/src')
        },
    },
});
