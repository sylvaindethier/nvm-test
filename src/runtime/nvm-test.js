import nvm from './nvm'
import config from './config'
import hook from './hook'

/**
 * Test using a Node version with nvm
 * @param {String} version - A Node version to use with nvm
 * @param {String} run - A command that run test
 * @param {Boolean} dryRun - Wheter or not to dry run the test
 * @param {Object} $hooks - Some hooks ('$pre', '$post', '$error')
 * @return {Promise} - The async Promise nvm test run
 */
function nvmTest (
  version = config.version || '',
  run = config.run || 'npm test',
  dryRun = config.dryRun,
  $hooks
) {
  const use = `nvm use ${version}`
  const cmd = dryRun ? `echo "Dry run: ${run}"` : run

  // 'use' version AND 'cmd'
  return nvm(`${use} && ( ${cmd} )`)($hooks)
}

// hook nvmTest
const nvmTestHook = hook(nvmTest)

export { nvmTestHook as default, nvmTest }
