import nvm from './nvm'
import config from './config'
import hook from './hook'

/**
 * Test using a Node version with nvm
 * @param {String} version - A Node version to use with nvm
 * @param {String} test - A test command
 * @param {Boolean} dryRun - Wheter or not to dry run the test
 * @param {Object} hooks.nvmHooks - Some nvm hooks
 * @return {Promise} - The nvm (hook) Promise
 */
function nvmTest (
  version = config.version || '',
  test = config.test || 'npm test',
  dryRun = config.dryRun,
  { nvmHooks } = {}
) {
  const use = `nvm use ${version}`
  const cmd = dryRun ? `echo "Dry run: ${test}"` : test

  // 'use' version AND 'cmd'
  return nvm(`${use} && ( ${cmd} )`, nvmHooks)
}

// hook nvmTest
const nvmTestHook = hook(nvmTest)

export { nvmTestHook as default, nvmTest }
