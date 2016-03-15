import log from './commander/npmlog'
import './commander/options'
import { Command } from 'commander'
import pkg from '../package'

const program = new Command(pkg.name)
program
.version(pkg.version)
.command('exec [version]', 'execute test for a Node version', { isDefault: true })
.command('versions [versions...]', 'execute test for a list of Node version')
.optionLog({ defaultValue: log.level })
.parse(process.argv)

// initialize log from program
log.fromProgram(program)
log.silly('program', 'args: %j; opts: %j', program.args, program.opts())

// output help if no arguments
if (!program.args.length) program.help()
