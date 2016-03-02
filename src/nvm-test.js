import './commander-option-log'
import program from 'commander'
import logger from './utils/logger'
import { version } from '../package'

// option log
program
  .version(version)
  .command('exec <version>', 'execute test for a Node version', { isDefault: true })
  .command('versions [versions...]', 'execute test for a list of Node version')
  .optionLog()
  .parse(process.argv)

// output help if no arguments
if (!program.args.length) program.help()

logger.set({ level: program.optsLog(), heading: program.name() })
logger.silly('program', 'options:', program.opts())
