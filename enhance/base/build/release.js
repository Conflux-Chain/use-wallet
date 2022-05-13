import inquirer from 'inquirer';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import child_process from 'child_process';
import util from 'util';
import { platform } from 'os';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const semverInc = require('semver/functions/inc.js');

export default function(lib, pkg) {
    const exec = util.promisify(child_process.exec);
    
    const run = async (command, params) => {
        console.log(chalk.green(command));
        await exec(command, params);
    };

    const currentVersion = pkg.version;
    
    const getNextVersions = () => ({
        major: semverInc(currentVersion, 'major'),
        minor: semverInc(currentVersion, 'minor'),
        patch: semverInc(currentVersion, 'patch'),
        premajor: semverInc(currentVersion, 'premajor'),
        preminor: semverInc(currentVersion, 'preminor'),
        prepatch: semverInc(currentVersion, 'prepatch'),
        prerelease: semverInc(currentVersion, 'prerelease'),
    });
    
    const timeLog = (logInfo, type) => {
        let info = '';
        if (type === 'start') {
            info = `=> Start Task: ${logInfo}`;
        } else {
            info = `✨ End Task: ${logInfo}`;
        }
        const nowDate = new Date();
        console.log(`[${nowDate.toLocaleString()}.${nowDate.getMilliseconds().toString().padStart(3, '0')}] ${info}`);
    };
    
    async function prompt() {
        const nextVersions = getNextVersions();
        const { nextVersion } = await inquirer.prompt([
            {
                type: 'list',
                name: 'nextVersion',
                message: `Please select the version to be released (Current Version: ${currentVersion})`,
                choices: Object.keys(nextVersions).map((level) => ({
                    name: `${level} => ${nextVersions[level]}`,
                    value: nextVersions[level],
                })),
            },
        ]);
        return nextVersion;
    }
    
    async function updateVersion(nextVersion) {
        pkg.version = nextVersion;
        timeLog('Modify package.json version', 'start');
        await fs.writeFileSync(`./enhance/${lib}/package.json`, JSON.stringify(pkg));
        await run(`npx prettier ./enhance/${lib}/package.json --write`);
        timeLog('Modify package.json version', 'end');
    }
    
    async function build() {
        timeLog('Build lib', 'start');
        await run(`npm run build:enhance-${lib}`);
        timeLog('Build lib', 'end');
    }
    
    async function publish() {
        timeLog('Publish to npm', 'start');
        await run(`npm publish --access public`, { cwd: path.resolve((platform() === 'darwin' ? '/' : '') + import.meta.url.split('///')[1], `../../../${lib}/dist`) });
        timeLog('Publish to npm', 'end');
    }
    
    
    async function main() {
        try {
            const nextVersion = await prompt();
            await updateVersion(nextVersion);
            await build();
            await publish();
            console.log(`✨ Release success!`);
        } catch (error) {
            console.log('💣 Release failed, reason: ', error);
        }
    }

    main();
}
