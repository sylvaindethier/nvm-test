import nvm from './nvm'
import config from './config'
import { hook } from './hooks'

/**
 * Test using a Node version with nvm
 * @param {String} [version = ''] - A Node version to use with nvm
 * @param {Object} [options = {}] - Some options
 * @param {String} [options.test = config.test] - The test command
 * @param {Boolean} [options.dryRun = config.dryRun] - Wheter or not to dry run the test
 * @param {Object} [hooks = {}] - Some hooks
 * @param {Object} [hooks.nvmHooks] - Some nvm hooks
 * @return {Promise} - The nvm (hook) Promise
 */
function nvmTest (
  version = '',
  { test = config.test, dryRun = config.dryRun } = {},
  { nvmHooks } = {}
) {
  // apply dryRun if required, just echo the command for now
  if (dryRun) test = `echo "Dry run: ${test}"`

  // raw command is nvm-use && test
  const cmd = `nvm use $version && ( ${test} )`
  // replace $version
  const command = cmd.replace(/\$version/g, version)
  return nvm(command, nvmHooks)
}

// hook nvmTest
const nvmTestHook = hook(nvmTest)

export { nvmTestHook as default, nvmTest }
