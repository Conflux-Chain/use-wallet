import esbuild from 'esbuild';
import { createRequire } from 'module';
import { copyPkg, generateDts } from '../../base/build/index.js';
const require = createRequire(import.meta.url);
const pkg = require('../package.json');

esbuild.build({
    entryPoints: ['./src/index'],
    outfile: 'dist/index.js',
    bundle: true,
    sourcemap: false,
    minify: false,
    format: 'esm',
    target: ['esnext'],
    external: ['react', 'react-dom', '@cfxjs/use-wallet-react', 'decimal.js', 'zustand', 'lodash-es'],
})

copyPkg(pkg);
generateDts();