import nvmInstall from './nvm-install'
import nvmTest from './nvm-test'
import hook from './hook'

/**
 * Run test using a Node version via nvm
 * @param {String} version - A Node version to use with nvm
 * @param {String} run - A command that run test
 * @param {Boolean} dryRun - Wheter or not to dry run the test
 * @param {Object} $hooks - Some hooks ('$nvmInstall', '$nvmTest', '$install', '$test')
 * @return {Promise} - The await nvmTest promise
 */
async function nvmTestVersion (
  version,
  run,
  dryRun,
  { $nvmInstall, $nvmTest, $install, $test } = {}
) {
  // await for nvm install
  await nvmInstall(version, $nvmInstall)($install)

  // await for nvm test
  return await nvmTest(version, run, dryRun, $nvmTest)($test)
}

// hook nvmTestVersion
const nvmTestVersionHook = hook(nvmTestVersion)

export { nvmTestVersionHook as default, nvmTestVersion }
