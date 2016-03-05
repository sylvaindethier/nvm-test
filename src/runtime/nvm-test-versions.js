import nvmTestVersion from './nvm-test-version'
import config from './config'
import hook from './hook'

/**
 * Run test using a list of Node versions with nvm
 * @param {Array} versions - A list of Node versions to use with nvm
 * @param {String} run - A command that run test
 * @param {Boolean} dryRun - Wheter or not to dry run the test
 * @param {Object} $hooks - Some hooks ('$nvmTestVersion', '$testVersion')
 * @return {Number} - The nvmTestVersion result code
 */
async function nvmTestVersions (
  versions = [config.version],
  run,
  dryRun,
  { $nvmTestVersion, $testVersion } = {}
) {
  let code = 0
  // as we are using await we cant use .forEach
  for (let i = 0, len = versions.length; i < len; ++i) {
    let version = versions[i]
    try {
      // await for nvm test version
      await nvmTestVersion(version, run, dryRun, $nvmTestVersion)($testVersion)
    } catch ($code) {
      // set code
      code = $code
    }
  }

  return code
}

// hook nvmTestVersions
const nvmTestVersionsHook = hook(nvmTestVersions)

export { nvmTestVersionsHook as default, nvmTestVersions }
