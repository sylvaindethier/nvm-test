import log, { logProgram } from './commander-npmlog'
import { Command } from 'commander'
import { nvmTestVersions } from './runtime'

const program = new Command('nvm-test-versions')
program
.version('0.0.1')
.description('Execute test for a list of Node versions')
.arguments('[versions...]')
.option('-t, --test <command>', 'specify the command test')
.option('-d, --dry-run', 'execute a dry run test')
.optionLog() // bug from commander?: program.log is always defaultValue
.parse(process.argv)

// initialize log for program
logProgram(program)
log.silly('program', 'args: %j; opts: %j', program.args, program.opts())

// hooks
const $pre = (versions, test, dryRun) => {
  log.verbose('nvm test versions', versions, test, dryRun)
}
const $error = (code) => {
  log.error('nvm test versions', 'error code', code)
}
const $testVersion = {
  $pre: (version, test, dryRun) => {
    log.verbose('nvm test version', version, test, dryRun)
  },
  $error: (code, version) => {
    log.error('nvm test version', 'error code %s for version', code, version)
  },
}

// nvm test versions
nvmTestVersions(
  // get the [versions...] arguments
  program.args,

  // get the --test <command> option
  program.test,

  // get the --dry-run option
  program.dryRun,

  // hooks
  { $testVersion }
)({ $pre, $error })

// then exit with code on resolve and reject
.then(process.exit, process.exit)
