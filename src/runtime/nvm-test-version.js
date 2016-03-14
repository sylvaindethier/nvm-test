import nvmInstall from './nvm-install'
import nvmTest from './nvm-test'
import { config } from '.'
import hook from './hook'

/**
 * Run test using a Node version via nvm
 * @param {String} version - A Node version to use with nvm
 * @param {String} test - A test command
 * @param {Boolean} dryRun - Wheter or not to dry run the test
 * @param {Object} hooks.nvmInstallHooks - Some nvm install hooks
 * @param {Object} hooks.nvmTestHooks - Some nvm test hooks
 * @return {Promise} - The (await hook) nvmTest Promise
 */
async function nvmTestVersion (
  version = config.version,
  test = config.test,
  dryRun = config.dryRun,
  { nvmInstallHooks, nvmTestHooks } = {}
) {
  // await for nvm install
  await nvmInstall(version, nvmInstallHooks)

  // await and return for nvm test
  return await nvmTest(version, test, dryRun, nvmTestHooks)
}

// hook nvmTestVersion
const nvmTestVersionHook = hook(nvmTestVersion)

export { nvmTestVersionHook as default, nvmTestVersion }
