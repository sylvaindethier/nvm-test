import { join } from 'path'

/**
 * A version refers to any version-like string nvm understands. This includes:
 * - full or partial version numbers, starting with an optional "v" (0.10, v0.1.2, v1)
 * - default (built-in) aliases: node, stable, unstable, iojs, system
 * - custom aliases you define with `nvm alias foo`
 * @public
 * @typedef {string} version
 */

/**
 * A command refers to a shell command. Any `$version` string will be replaced
 * by the version in test
 * @public
 * @typedef {string} command
 */

// defaults
const filename = '.nvmrc.test'
const defaults = {
  // install: detects version silently, install otherwise
  install: 'nvm which $version &> /dev/null || nvm install $version',
  // test: just 'npm test'
  test: 'npm test',
  dryRun: false,
  plugins: [],
}

const filepath = join(process.cwd(), filename)
let rc
try {
  // needed to be resolved at runtime, using require vs. import
  rc = require(filepath)
} catch (e) {} // eslint-disable-line no-empty

/**
 * Config from `.nvmrc.test.json` file
 * @public
 * @namespace {Object}   config
 * @type      {Object}
 * @property  {command}  [install=]     - The `install` command.<br> `nvm which $version &> /dev/null || nvm install $version`
 * @property  {command}  [test=]        - The `test` command.<br> `npm test`
 * @property  {boolean}  [dryRun=false] - Whether or not to dry run the test. Echoes the `test` command if true.
 * @property  {string[]} [plugins=[]]   - External plugins
 * @example
 * {
 *   "test": "echo 'nvm-test version $version'; npm run lint && npm run test",
 *   "plugins": ["travis"]
 * }
 */
const config = Object.assign({}, defaults, rc)
export default config
