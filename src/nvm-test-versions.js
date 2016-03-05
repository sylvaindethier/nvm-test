import log, { logProgram } from './commander-npmlog'
import { Command } from 'commander'
import { nvmTestVersions } from './runtime'

const program = new Command('nvm-test-versions')
program
.version('0.0.1')
.description('Execute test for a list of Node versions')
.arguments('[versions...]')
.option('-r, --run <command>', 'specify the command to run test')
.option('-d, --dry-run', 'execute a dry run test')
.optionLog() // bug from commander?: program.log is always defaultValue
.parse(process.argv)

// initialize log for program
logProgram(program)
log.silly('program', 'args: %j; opts: %j', program.args, program.opts())

// hooks
const $pre = (...args) => { log.verbose('nvm test versions', ...args) }
const $error = (code, ...args) => {
  log.error('nvm test versions', 'error code:', code, '; arguments:', ...args)
}
const $testVersion = {
  $pre: (...args) => { log.verbose('nvm test version', ...args) },
  $error: (code, ...args) => {
    log.error('nvm test version', 'error code:', code, '; arguments:', ...args)
  },
}

// get the [versions...] arguments
const versions = program.args
// get the --run <command> option
const run = program.run
// get the --dry-run option
const dryRun = program.dryRun

// nvm test versions
nvmTestVersions(versions, run, dryRun, { $testVersion })({ $pre, $error })
// then exit with code on resolve and reject
.then(process.exit, process.exit)
