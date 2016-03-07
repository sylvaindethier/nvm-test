import log, { logProgram } from './commander-npmlog'
import { Command } from 'commander'
import { nvmTestVersion } from './runtime'

const program = new Command('nvm-test-exec')
program
.version('0.0.1')
.description('Execute test for a Node version')
.arguments('[version]')
.option('-t, --test <command>', 'specify the command test')
.option('-d, --dry-run', 'execute a dry run test')
.optionLog() // bug from commander?: program.log is always defaultValue
.parse(process.argv)

// initialize log for program
logProgram(program)
log.silly('program', 'args: %j; opts: %j', program.args, program.opts())

// hooks
const $pre = (version, test, dryRun) => {
  log.verbose('nvm test version', version, test, dryRun)
}
const $error = (code, version) => {
  log.error('nvm test version', 'error code %s for version', code, version)
}
const $install = {
  $pre: (version) => {
    log.verbose('nvm install', version)
  },
  $error: (code, version) => {
    log.error('nvm install', 'error code %s for version', code, version)
  },
}
const $test = {
  $pre: (version, test, dryRun) => {
    log.verbose('nvm test', version, test, dryRun)
  },
  $error: (code, version) => {
    log.error('nvm test', 'error code %s for version', code, version)
  },
}

// nvm test version
nvmTestVersion(
  // get the [version] arguments
  program.args[0],

  // get the --test <command> option
  program.test,

  // get the --dry-run option
  program.dryRun,

  // hooks
  { $install, $test }
)({ $pre, $error })

// exit with code on resolve and reject
.then(process.exit, process.exit)
