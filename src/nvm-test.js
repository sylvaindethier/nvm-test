import log, { logProgram } from './commander-npmlog'
import { Command } from 'commander'
import { name, version } from '../package'

const program = new Command(name)
program
.version(version)
.command('exec [version]', 'execute test for a Node version', { isDefault: true })
.command('versions [versions...]', 'execute test for a list of Node version')
.optionLog()
.parse(process.argv)

// initialize log for program
logProgram(program)
log.silly('program', 'args: %j; opts: %j', program.args, program.opts())

// output help if no arguments
if (!program.args.length) program.help()
