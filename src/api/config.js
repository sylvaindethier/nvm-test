import { join } from 'path'

// defaults
const filename = '.nvmrc.test'
const defaults = {
  // install: detect version silently, install version otherwise
  install: 'nvm which $version &> /dev/null || nvm install $version',
  // test: just 'npm test'
  test: 'nvm use $version && ( npm test )',
  dryRun: false,
  commands: [],
}

const filepath = join(process.cwd(), filename)
let rc
try {
  // needed to be resolved at runtime, using require vs. import
  rc = require(filepath)
} catch (e) {} // eslint-disable-line no-empty

/**
 * Runtime configuration.
 * @public
 * @type     {Object}                   - The runtime configuration
 * @property {string}   [install=]      - The install command.<br> `nvm which $version &> /dev/null || nvm install $version`
 * @property {string}   [test=]         - The test command.<br> `nvm use $version && ( npm test )`
 * @property {boolean}  [dryRun=false]  - Whether or not to dry run the test
 * @property {string[]} [commands=[]]   - External commands
 */
const config = Object.assign({}, defaults, rc)
export default config
