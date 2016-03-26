import log from 'npmlog'
import { config, nvmTestVersions, Hooks } from './api'
import { __ } from './utils'

// set default log level to 'silly' in development NODE_ENV
if (process.env.NODE_ENV === 'development') log.level = 'silly'

/** @private */
export const command = '[versions]'

/** @private */
export const desc = __('desc')

/** @private */
export const builder = {
  'i': {
    alias: 'install',
    desc: __('options.install'),
    type: 'string',
    default: config.install,
  },
  't': {
    alias: 'test',
    desc: __('options.test'),
    type: 'string',
    default: config.test,
  },
  'D': {
    alias: 'dry-run',
    desc: __('options.dryRun'),
    type: 'boolean',
    default: false,
  },
  'L': {
    alias: 'log-level',
    desc: __('options.logLevel'),
    type: 'string',
    choices: Object.keys(log.levels),
    default: log.level,
  },
}

/**
 * Handler
 * @private
 * @param  {Object} argv - The yargs argv
 * @return {Promise} - The nvmTestVersions Promise
 */
export function handler (argv) {
  // get versions from argv._
  const versions = argv._
  // get options
  const { install, test, dryRun, logLevel } = argv

  // set log heading & level
  log.heading = 'nvm-test'
  log.level = logLevel

  log.silly('command', 'argv:', argv)

  // define hooks
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
    pre: (version) => {
      log.verbose('nvm-install', 'version', version)
    },
    error: (code, version) => {
      log.error('nvm-install', 'error code %s for version', code, version)
    },
  })
  const nvmTestHooks = new Hooks({
    pre: (version) => {
      log.verbose('nvm-test', 'version', version)
    },
    error: (code, version) => {
      log.error('nvm-test', 'error code %s for version', code, version)
    },
  })
  const nvmTestVersionHooks = new Hooks({
    pre: (version) => {
      // info the version
      log.info('nvm-test-version', 'version', version)
    },
    error: (code, version) => {
      log.verbose('nvm-test-version', 'error code %s for version', code, version)
    },
    nvmInstallHooks,
    nvmTestHooks,
  })
  const hooks = new Hooks({
    pre,
    error,
    nvmTestVersionHooks,
  })

  // nvm test versions
  return nvmTestVersions(versions, { install, test, dryRun }, hooks)
}
