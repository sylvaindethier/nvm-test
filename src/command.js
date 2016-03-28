import log from 'npmlog'
import { config, nvmTestVersions, Hooks } from './api'
import { __, buildUsage } from './utils'

// set default log level to 'silly' in development NODE_ENV
if (process.env.NODE_ENV === 'development') log.level = 'silly'

/** @private */
export const command = '[versions]'

/** @private */
export const desc = __('desc')

/** @private */
export const usage = __('usage') + buildUsage({ command, desc }) +
  '\n  ' + buildUsage({ command: '<command> ', desc: __('plugin') })

/** @private */
export const builder = {
  'i': {
    alias: 'install',
    desc: __('options.install'),
    type: 'string',
    default: config.install
  },
  't': {
    alias: 'test',
    desc: __('options.test'),
    type: 'string',
    default: config.test
  },
  'D': {
    alias: 'dry-run',
    desc: __('options.dryRun'),
    type: 'boolean',
    default: false
  },
  'L': {
    alias: 'log-level',
    desc: __('options.logLevel'),
    type: 'string',
    choices: Object.keys(log.levels),
    default: log.level
  }
}

export const handler = (argv) => {
  // get versions from argv._
  const versions = argv._
  // get options
  const { install, test, dryRun, logLevel } = argv

  // set log heading & level
  log.heading = 'nvm-test'
  log.level = logLevel

  log.silly('command', 'argv:', argv)

  // define hooks
  const logVersion = (prefix, fn = log.info) => {
    return (version) => { fn(prefix, 'version', version) }
  }
  const logError = (prefix, fn = log.error) => {
    return (code, version) => {
      fn(prefix, 'error code %s for version', code, version)
    }
  }

  const pre = (versions, { install, test, dryRun }) => {
    // info the versions
    log.info('nvm-test-versions', 'versions', versions.join(', '))
    // verbose the options
    log.verbose('nvm-test-versions', 'options', { install, test, dryRun })
  }
  const error = (code) => {
    log.error('nvm-test-versions', 'error code %s', code)
  }
  const nvmInstallHooks = new Hooks({
    pre: logVersion('nvm-install', log.verbose),
    error: logError('nvm-install')
  })
  const nvmTestHooks = new Hooks({
    pre: logVersion('nvm-test', log.verbose),
    error: logError('nvm-test')
  })
  const nvmTestVersionHooks = new Hooks({
    pre: logVersion('nvm-test-version'),
    error: logError('nvm-test-version'),
    nvmInstallHooks,
    nvmTestHooks
  })
  const hooks = new Hooks({ pre, error, nvmTestVersionHooks })

  // nvm test versions
  return nvmTestVersions(versions, { install, test, dryRun }, hooks)
}
