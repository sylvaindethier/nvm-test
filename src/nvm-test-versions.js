import './commander-option-log'
import program from 'commander'
import log from './utils/log'
import nvmTestVersions from './commands/nvm-test-versions'

program
  .version('0.0.1')
  .description('Execute test for a list of Node version')
  .arguments('[versions...]')
  .optionLog() // bug from commander: program.log is always defaultValue
  .option('-D, --dry-run', 'execute a dry run test')
  .parse(process.argv)

// output help if no arguments
if (!program.args.length) program.help()

log.set({ level: program.optsLog(), heading: program.name() })
log.silly('program', 'options:', program.opts())

// get the [versions...] argument, restablish the correct order
const versions = program.args.reverse()

// get the --dry-run option
const dryRun = program.dryRun

log.verbose('nvm test versions', versions)
nvmTestVersions(versions, dryRun)

// then exit with code on resolve and reject
.then(process.exit, process.exit)
