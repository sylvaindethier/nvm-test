import { join } from 'path'
import { readFileSync } from 'fs'

const cwd = process.cwd()
const rcFile = join(cwd, '.nvmrc')
const rcFileTest = join(cwd, '.nvmrc.test')

// needed to be resolved at runtime, using require vs. import
var rc
try {
  // can not require rcFile as it's a text file
  rc = { version: readFileSync(rcFile, 'utf8').trim() }
} catch (e) {} // eslint-disable-line no-empty

var rcTest
try {
  rcTest = require(rcFileTest)
} catch (e) {} // eslint-disable-line no-empty

// merge config files
const config = Object.assign({}, rc, rcTest)
export default config
