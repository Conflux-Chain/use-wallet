import { statSync, writeFile, mkdirSync } from 'fs';
import util from 'util';
import child_process from 'child_process';
const exec = util.promisify(child_process.exec);

const run = async (command) => {
    await exec(command);
};

export const copyPkg = (pkg) => {
    console.log('copyPkg')
    console.log(pkg)
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
}

export const generateDts = () => {
    run('tsc --emitDeclarationOnly --declaration --outDir dist');
}