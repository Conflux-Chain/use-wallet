import react from '@vitejs/plugin-react';
import ts2 from 'rollup-plugin-typescript2';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        react(),
        {
            ...ts2({
                check: true,
                tsconfig: './tsconfig-lib.json',
                tsconfigOverride: {
                    compilerOptions: {
                        sourceMap: false,
                        declaration: true,
                        declarationMap: false,
                    },
                },
            }),
            enforce: 'pre',
        },
    ],
    build: {
        target: 'esnext',
        lib: {
            entry: 'src/index.ts',
            fileName: () => 'index.js',
            formats: ['es'],
        },
        rollupOptions: {
            plugins: [visualizer()],
            external: ['react', 'react-dom', 'decimal.js', 'zustand'],
        },
    },
});