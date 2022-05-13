import release from '../../base/build/release.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('../package.json');

release('react', pkg);