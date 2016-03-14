import nvmTestVersion from './nvm-test-version'
import config from './config'
import hook from './hook'

/**
 * Run test using a list of Node versions with nvm
 * @param {Array} versions - A list of Node versions to use with nvm
 * @param {String} test - A test command
 * @param {Boolean} dryRun - Wheter or not to dry run the test
 * @param {Object} hooks.nvmTestVersionHooks - Some nvm test version hooks
 * @return {Number} - The process exit code
 */
async function nvmTestVersions (
  versions = [config.version],
  test,
  dryRun,
  { nvmTestVersionHooks } = {}
) {
  let code = 0
  // as we are using await we cant use .forEach
  for (let i = 0, len = versions.length; i < len; ++i) {
    let version = versions[i]
    try {
      // await for nvm test version
      await nvmTestVersion(version, test, dryRun, nvmTestVersionHooks)
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
