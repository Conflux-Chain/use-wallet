import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    build: {
        target: 'es2015',
        outDir: 'site'
    },
    base: './',
    resolve: {
        alias: {
            '@base': path.resolve(__dirname, 'node_modules'),
            '@hooks': path.resolve(__dirname, 'docs/hooks'),
            '@assets': path.resolve(__dirname, 'docs/assets'),
            '@pages': path.resolve(__dirname, 'docs/pages'),
            '@utils': path.resolve(__dirname, 'docs/utils'),
            '@components': path.resolve(__dirname, 'docs/components'),
            '@router': path.resolve(__dirname, 'docs/router'),
            '@cfxjs/use-wallet': path.resolve(__dirname, 'src')
        },
    },
});
