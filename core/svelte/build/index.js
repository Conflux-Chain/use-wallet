import esbuild from 'esbuild';
import path from 'path';
import { readdirSync, copyFile } from 'fs';

// build Unit
esbuild.build({
    entryPoints: ['../base/src/unit/index.ts'],
    outfile: 'dist/utils/unit.js',
    bundle: true,
    sourcemap: false,
    minify: false,
    format: 'esm',
    target: ['esnext'],
    external: ['decimal.js'],
}).then(() => {
    copyFile('./build/dts/utils/unit.d.ts', './dist/utils/unit.d.ts', () => {});
});

// build Emitter
esbuild.build({
    entryPoints: ['../base/src/emitter/index.ts'],
    outfile: 'dist/utils/emitter.js',
    bundle: true,
    sourcemap: false,
    minify: false,
    format: 'esm',
    target: ['esnext'],
    plugins: [
        {
            name: 'util',
            setup(build) {
                build.onResolve({ filter: /^.*\/unit/ }, () => {
                    return { path: './unit.js', external: true };
                });
            },
        },
    ],
}).then(() => {
    copyFile('./build/dts/utils/emitter.d.ts', './dist/utils/emitter.d.ts', () => {});
    copyFile('./build/dts/utils/mitt.d.ts', './dist/utils/mitt.d.ts', () => {});
});

// build helpers
esbuild.build({
    entryPoints: ['./src/helpers'],
    outfile: 'dist/utils/helpers.js',
    bundle: true,
    sourcemap: false,
    minify: false,
    format: 'esm',
    target: ['esnext'],
    external: ['react-dom'],
});

// build chain & wallet
const createChainPlugin = (chain) => {
    return {
        outdir: `dist/${chain}/`,
        plugins: [
            {
                name: 'chain',
                setup(build) {
                    build.onResolve({ filter: /^base\/src\/chains\// }, (args) => {
                        return { path: path.join(args.resolveDir, '../../', args.path, '../', `${chain}/index.ts`) };
                    });
                    build.onResolve({ filter: /^.*\/unit/ }, () => {
                        return { path: '../utils/unit.js', external: true };
                    });
                    build.onResolve({ filter: /^.*\/emitter/ }, () => {
                        return { path: '../utils/emitter.js', external: true };
                    });
                    build.onResolve({ filter: /^.*\/helpers/ }, () => {
                        return { path: '../utils/helpers.js', external: true };
                    });
                },
            },
        ],
    };
};

const allChains = readdirSync('../base/src/chains');
allChains.forEach((chain) => {
    esbuild
        .build({
            entryPoints: ['./src/index.ts'],
            bundle: true,
            sourcemap: false,
            minify: false,
            format: 'esm',
            target: ['esnext'],
            ...createChainPlugin(chain),
            external: ['react', 'react-dom', 'zustand'],
        })
        .then(() => {
            copyFile('./build/dts/index.d.ts', `./dist/${chain}/index.d.ts`, () => {});
            copyFile(`../base/src/chains/${chain}/type.ts`, `./dist/${chain}/type.d.ts`, () => {});
        });
});
