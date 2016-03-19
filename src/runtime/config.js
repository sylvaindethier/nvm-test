import { join } from 'path'

// defaults
const defaults = {
  // install: detect version silently, install version otherwise
  install: 'nvm which $version &> /dev/null || nvm install $version',
  // test: just 'npm test'
  test: 'npm test',
  dryRun: false,
  commands: [],
}

const cwd = process.cwd()
const file = join(cwd, '.nvmrc.test')

let rc
try {
  // needed to be resolved at runtime, using require vs. import
  rc = require(file)
} catch (e) {} // eslint-disable-line no-empty

// merge config
const config = Object.assign({}, defaults, rc)
export default config
