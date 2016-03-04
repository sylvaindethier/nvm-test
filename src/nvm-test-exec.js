import log, { logProgram } from './commander-npmlog'
import { Command } from 'commander'
import nvmTestVersion from './commands/nvm-test-version'

const program = new Command('nvm-test-exec')
program
  .version('0.0.1')
  .description('Execute test for a Node version')
  .arguments('<version>')
  .optionLog() // bug from commander ?: program.log is always 'defaultValue'
  .option('-D, --dry-run', 'execute a dry run test')
  .parse(process.argv)

// output help if no arguments
if (!program.args.length) program.help()

logProgram(program)
log.silly('program', 'options:', program.opts())

// get the <version> arguments
const version = program.args[0]

// get the --dry-run option
const dryRun = program.dryRun

// exec for version
log.info('nvm test version', version)
nvmTestVersion(version, dryRun)

// then exit with code on resolve and reject
.then(process.exit, process.exit)
