import log from './commander/npmlog'
import './commander/options'
import { Command } from 'commander'
import { config, nvmTestVersions, Hooks } from './runtime'

const program = new Command('nvm-test-versions')
program
.version('0.0.1')
.description('Execute test for a list of Node versions')
.arguments('[versions...]')
.optionsNvmTest({
  defaultLog: log.level,
  defaultTest: config.test,
  defaultDryRun: config.dryRun,
})
.parse(process.argv)

// initialize log from program
log.fromProgram(program)
log.silly('program', 'args: %j; opts: %j', program.args, program.opts())

// hooks
const pre = (versions) => { log.info('nvm test versions', versions) }
const error = (code) => {
  log.error('nvm test versions', 'error code', code)
}
const nvmTestVersionHooks = new Hooks({
  pre: (...args) => { log.verbose('nvm test version', ...args) },
  error: (code, version) => {
    log.error('nvm test version', 'error code %s for version', code, version)
  },
})
const hooks = new Hooks({ pre, error, nvmTestVersionHooks })

// nvm test versions
nvmTestVersions(program.args, program.test, program.dryRun, hooks)

// then exit with code on resolve and reject
.then(process.exit, process.exit)
