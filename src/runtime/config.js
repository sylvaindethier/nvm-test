import { join } from 'path'

// defaults
const defaults = {
  version: '',
  test: 'npm test',
  dryRun: false,
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
