import { join } from 'path'
import { readFileSync } from 'fs'

// defaults
const defaults = {
  version: '',
  test: 'npm test',
  dryRun: false,
}

const cwd = process.cwd()
const rcFile = join(cwd, '.nvmrc')
const rcFileTest = join(cwd, '.nvmrc.test')

let rc, rcTest
try {
  // can not require rcFile as it's a text file
  rc = { version: readFileSync(rcFile, 'utf8').trim() }
} catch (e) {} // eslint-disable-line no-empty
try {
  // needed to be resolved at runtime, using require vs. import
  rcTest = require(rcFileTest)
} catch (e) {} // eslint-disable-line no-empty

// merge config files
const config = Object.assign({}, defaults, rc, rcTest)
export default config
