import nvmTestVersion from './nvm-test-version'
import config from './config'
import { hook } from './hooks'

/**
 * Run test using a list of Node versions with nvm
 * @param {String[]} [versions = []] - A list of Node versions to use with nvm
 * @param {Object} [options = {}] - Some options
 * @param {String} [options.install = config.install] - The install command
 * @param {String} [options.test = config.test] - The test command
 * @param {Boolean} [options.dryRun = config.dryRun]- Wheter or not to dry run the test
 * @param {Object} [hooks = {}] - Some hooks
 * @param {Object} [hooks.nvmTestVersionHooks] - Some nvm test version hooks
 * @return {Number} - The process exit code
 */
async function nvmTestVersions (
  versions = [],
  { install = config.install, test = config.test, dryRun = config.dryRun } = {},
  { nvmTestVersionHooks } = {}
) {
  let code = 0
  // empty version if no versions
  if (!versions.length) versions.push(undefined)

  // as we are using await we cant use .forEach
  for (let i = 0, len = versions.length; i < len; ++i) {
    let version = versions[i]
    try {
      // await for nvm test version
      await nvmTestVersion(version, { install, test, dryRun }, nvmTestVersionHooks)
    } catch (e) {
      // set code to error
      code = e
    }
  }

  return code
}

// hook nvmTestVersions
const nvmTestVersionsHook = hook(nvmTestVersions)

export { nvmTestVersionsHook as default, nvmTestVersions }
