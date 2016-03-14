import log, { logProgram } from './commander-npmlog'
import { Command } from 'commander'
import { nvmTestVersions, Hooks } from './runtime'

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
const pre = (versions) => { log.info('nvm test versions', versions) }
const error = (code) => {
  log.error('nvm test versions', 'error code', code)
}
const nvmTestVersionHooks = new Hooks({
  pre: (...args) => { log.verbose('nvm test version', args) },
  error: (code, version) => {
    log.error('nvm test version', 'error code %s for version', code, version)
  },
})
const hooks = new Hooks({ pre, error, nvmTestVersionHooks })

// get the [versions...] arguments
const versions = program.args
// get the --test <command> option
const test = program.test
// get the --dry-run option
const dryRun = program.dryRun

// nvm test versions
nvmTestVersions(versions, test, dryRun, hooks)

// then exit with code on resolve and reject
.then(process.exit, process.exit)
