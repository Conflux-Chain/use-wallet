import esbuild from 'esbuild';
import { buildUtils, allChainAndWallets, createChainPlugin, copyDts, copyPkg } from '../../base/build/index.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('../package.json');

buildUtils();

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
            external: ['vue'],
        })
        .then(() => copyDts(chain));
});

copyPkg(pkg);