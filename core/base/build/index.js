import esbuild from 'esbuild';
import path from 'path';
import { readdirSync, copyFile, statSync, existsSync, writeFile, mkdirSync } from 'fs';
import util from 'util';
import child_process from 'child_process';
const exec = util.promisify(child_process.exec);

const run = async (command) => {
    await exec(command);
};

export function buildUtils() {
    // build detect
    esbuild.build({
        entryPoints: ['../base/src/detect/index.ts'],
        outfile: 'dist/utils/detect.js',
        bundle: true,
        sourcemap: false,
        minify: false,
        format: 'esm',
        target: ['esnext'],
    });

    // build Unit
    esbuild
        .build({
            entryPoints: ['../base/src/unit/index.ts'],
            outfile: 'dist/utils/unit.js',
            bundle: true,
            sourcemap: false,
            minify: false,
            format: 'esm',
            target: ['esnext'],
            external: ['decimal.js'],
        })
        .then(() => {
            copyFile('../base/build/dts/unit.d.ts', './dist/utils/unit.d.ts', () => {});
        });

    // build Emitter
    esbuild
        .build({
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
                        build.onResolve({ filter: /^.*\/unit$/ }, () => {
                            return { path: './unit.js', external: true };
                        });
                    },
                },
            ],
        })
        .then(() => {
            copyFile('../base/build/dts/emitter.d.ts', './dist/utils/emitter.d.ts', () => {});
            copyFile('../base/build/dts/mitt.d.ts', './dist/utils/mitt.d.ts', () => {});
        });

    // build Emitter
    esbuild
        .build({
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
                        build.onResolve({ filter: /^.*\/unit$/ }, () => {
                            return { path: './unit.js', external: true };
                        });
                    },
                },
            ],
        })
        .then(() => {
            copyFile('../base/build/dts/emitter.d.ts', './dist/utils/emitter.d.ts', () => {});
            copyFile('../base/build/dts/mitt.d.ts', './dist/utils/mitt.d.ts', () => {});
        });

    // build RPCMethod
    esbuild.build({
        entryPoints: ['../base/src/emitter/RPCMethod.ts'],
        outfile: 'dist/utils/RPCMethod.js',
        bundle: true,
        sourcemap: false,
        minify: false,
        format: 'esm',
        target: ['esnext'],
    });
}

export const allChainAndWallets = readdirSync('../base/src/chains').reduce((pre, chain) => {
    if (statSync(`../base/src/chains/${chain}`).isDirectory()) {
        pre.push(chain);
        readdirSync(`../base/src/chains/${chain}`)
            .filter((file) => statSync(`../base/src/chains/${chain}/${file}`).isDirectory())
            .filter((file) => file !== '6963')
            .forEach((wallet) => {
                pre.push(`${chain}/${wallet}`);
            });
    }
    return pre;
}, []);

// build chain & wallet
export const createChainPlugin = (chainOrWallet) => {
    const isChain = chainOrWallet.indexOf('/') === -1;

    return {
        outdir: `dist/${chainOrWallet}/`,
        plugins: [
            {
                name: 'chain',
                setup(build) {
                    build.onResolve({ filter: /^base\/src\/chains\// }, (args) => {
                        return { path: path.join(args.resolveDir, '../../', args.path.split('/').slice(0, 4).join('/'), '../', `${chainOrWallet}/index.ts`) };
                    });

                    const prePath = !isChain ? '../../' : '../';
                    build.onResolve({ filter: /^.*\/unit$/ }, () => {
                        return { path: `${prePath}utils/unit.js`, external: true };
                    });
                    build.onResolve({ filter: /^.*\/emitter$/ }, () => {
                        return { path: `${prePath}utils/emitter.js`, external: true };
                    });
                    build.onResolve({ filter: /^.*\/detect$/ }, () => {
                        return { path: `${prePath}utils/detect.js`, external: true };
                    });
                    build.onResolve({ filter: /^.*\/RPCMethod$/ }, () => {
                        return { path: `${prePath}utils/RPCMethod.js`, external: true };
                    });
                    build.onResolve({ filter: /^.*\/helpers$/ }, () => {
                        return { path: `${prePath}utils/helpers.js`, external: true };
                    });

                    if (!isChain) {
                        build.onResolve({ filter: /^.*\/index$/ }, () => {
                            return { path: `../index.js`, external: true };
                        });
                    }
                },
            },
        ],
    };
};

export const copyDts = (chain) => {
    const isWallet = chain.indexOf('/') !== -1;
    if (!isWallet) {
        copyFile('./build/dts/chain.d.ts', `./dist/${chain}/index.d.ts`, () => {});
        if (existsSync(`../base/src/chains/${chain}/type.ts`)) {
            copyFile(`../base/src/chains/${chain}/type.ts`, `./dist/${chain}/type.d.ts`, () => {});
        }
    } else {
        copyFile('./build/dts/wallet.d.ts', `./dist/${chain}/index.d.ts`, () => {});
        if (existsSync(`../base/src/chains/${chain}/type.ts`)) {
            copyFile(`../base/src/chains/${chain}/type.ts`, `./dist/${chain}/type.d.ts`, () => {});
        }
    }
};

export const copyPkg = (pkg) => {
    try {
        statSync('./dist');
    } catch (_) {
        mkdirSync('./dist');
    }

    pkg.name = `@cfxjs/use-wallet-${pkg.name}`;
    delete pkg.scripts;
    writeFile('./dist/package.json', JSON.stringify(pkg), () => {
        run('npx prettier ./dist/package.json --write');
    });
};
