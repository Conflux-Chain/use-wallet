import esbuild from 'esbuild';
import { buildUtils, allChainAndWallets, createChainPlugin, copyDts, copyPkg } from '../../base/build/index.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('../package.json');

buildUtils();

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

allChainAndWallets.forEach((chain) => {
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
        .then(() => copyDts(chain));
});

copyPkg(pkg);