import log, { logProgram } from './commander-npmlog'
import { Command } from 'commander'
import { nvmTestVersion, Hooks } from './runtime'

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

// build hooks
const pre = (version) => { log.info('nvm test version', version || '') }
const nvmInstallHooks = new Hooks({
  pre: (...args) => { log.verbose('nvm install', args) },
  error: (code, version) => {
    log.error('nvm install', 'error code %s for version', code, version)
  },
})
const nvmTestHooks = new Hooks({
  pre: (...args) => { log.verbose('nvm test', args) },
  error: (code, version) => {
    log.error('nvm test', 'error code %s for version', code, version)
  },
})
const hooks = new Hooks({ pre, nvmInstallHooks, nvmTestHooks })

// get the [version] arguments
const version = program.args[0]
// get the --test <command> option
const test = program.test
// get the --dry-run option
const dryRun = program.dryRun

// nvm test version
nvmTestVersion(version, test, dryRun, hooks)

// then exit with code on resolve and reject
.then(process.exit, process.exit)
