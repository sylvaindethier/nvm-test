import log, { logProgram } from './commander-npmlog'
import { Command } from 'commander'
import { version } from '../package'

const program = new Command('nvm-test')
program
  .version(version)
  .command('exec <version>', 'execute test for a Node version', { isDefault: true })
  .command('versions [versions...]', 'execute test for a list of Node version')
  .optionLog()
  .parse(process.argv)

// output help if no arguments
if (!program.args.length) program.help()

logProgram(program)
log.silly('program', 'options:', program.opts())
