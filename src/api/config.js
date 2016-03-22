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

// merge defaults w/ runtime config
const config = Object.assign({}, defaults, rc)
export default config
