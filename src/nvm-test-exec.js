import log from './commander/npmlog'
import './commander/options'
import { Command } from 'commander'
import { config, nvmTestVersion, Hooks } from './runtime'

const program = new Command('nvm-test-exec')
program
.version('0.0.1')
.description('Execute test for a Node version')
.arguments('[version]')
.optionsNvmTest({
  defaultLog: log.level,
  defaultTest: config.test,
  defaultDryRun: config.dryRun,
})
.parse(process.argv)

// initialize log from program
log.fromProgram(program)
log.silly('program', 'args: %j; opts: %j', program.args, program.opts())

// build hooks
const pre = (version) => { log.info('nvm test version', version || '') }
const nvmInstallHooks = new Hooks({
  pre: (...args) => { log.verbose('nvm install', ...args) },
  error: (code, version) => {
    log.error('nvm install', 'error code %s for version', code, version)
  },
})
const nvmTestHooks = new Hooks({
  pre: (...args) => { log.verbose('nvm test', ...args) },
  error: (code, version) => {
    log.error('nvm test', 'error code %s for version', code, version)
  },
})
const hooks = new Hooks({ pre, nvmInstallHooks, nvmTestHooks })

// nvm test version
nvmTestVersion(program.args[0], program.test, program.dryRun, hooks)

// then exit with code on resolve and reject
.then(process.exit, process.exit)
