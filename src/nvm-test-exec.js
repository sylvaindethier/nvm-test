import log, { logProgram } from './commander-npmlog'
import { Command } from 'commander'
import { nvmTestVersion } from './runtime'

const program = new Command('nvm-test-exec')
program
.version('0.0.1')
.description('Execute test for a Node version')
.arguments('[version]')
.option('-r, --run <command>', 'specify the command to run test')
.option('-d, --dry-run', 'execute a dry run test')
.optionLog() // bug from commander?: program.log is always defaultValue
.parse(process.argv)

// initialize log for program
logProgram(program)
log.silly('program', 'args: %j; opts: %j', program.args, program.opts())

// hooks
const $pre = (...args) => { log.verbose('nvm test version', ...args) }
const $error = (code, ...args) => {
  log.error('nvm test version', 'error code:', code, '; arguments:', ...args)
}
const $install = {
  $pre: (...args) => { log.verbose('nvm install', ...args) },
  $error: (code, ...args) => {
    log.error('nvm install', 'error code:', code, '; arguments:', ...args)
  },
}
const $test = {
  $pre: (...args) => { log.verbose('nvm test', ...args) },
  $error: (code, ...args) => {
    log.error('nvm test', 'error code:', code, '; arguments:', ...args)
  },
}

// get the [version] arguments
const version = program.args[0]
// get the --run <command> option
const run = program.run
// get the --dry-run option
const dryRun = program.dryRun

// nvm test version
nvmTestVersion(version, run, dryRun, { $install, $test })({ $pre, $error })
// exit with code on resolve and reject
.then(process.exit, process.exit)
