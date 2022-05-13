import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@cfxjs/use-wallet-react/conflux': path.resolve(__dirname, '../../core/react/src')
        },
    },
});
