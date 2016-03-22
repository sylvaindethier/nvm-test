import nvmInstall from './nvm-install'
import nvmTest from './nvm-test'
import config from './config'
import { hook } from './hooks'

/**
 * Run test using a Node version via nvm
 * @param {String} [version = ''] - A Node version to use with nvm
 * @param {Object} [options = {}] - Some options
 * @param {String} [options.install = config.install]- The install command
 * @param {String} [options.test = config.test]- The test command
 * @param {Boolean} [options.dryRun = config.dryRun] - Wheter or not to dry run the test
 * @param {Object} [hooks = {}] - Some hooks
 * @param {Object} [hooks.nvmInstallHooks] - Some nvm install hooks
 * @param {Object} [hooks.nvmTestHooks] - Some nvm test hooks
 * @return {Promise} - The (await hook) nvmTest Promise
 */
async function nvmTestVersion (
  version = '',
  { install = config.install, test = config.test, dryRun = config.dryRun } = {},
  { nvmInstallHooks, nvmTestHooks } = {}
) {
  // await for nvm install
  await nvmInstall(version, { install }, nvmInstallHooks)

  // await and return for nvm test
  return await nvmTest(version, { test, dryRun }, nvmTestHooks)
}

// hook nvmTestVersion
const nvmTestVersionHook = hook(nvmTestVersion)

export { nvmTestVersionHook as default, nvmTestVersion }
