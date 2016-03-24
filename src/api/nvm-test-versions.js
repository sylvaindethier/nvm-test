import nvmTestVersion from './nvm-test-version'
import config from './config'
import { hookable } from './hooks'

/**
 * Run test using a list of Node versions with nvm.
 * @protected
 * @function nvmTestVersions
 * @param  {version[]}                    [versions=[]]                   - A list of Node versions to use with nvm
 * @param  {Object}                       [config]                        - A {@link config}
 * @param  {{install: command}}           [config.install=config.install] - A {@link config} `install` command
 * @param  {{test: command}}              [config.test=config.test]       - A {@link config} `test` command
 * @param  {{dryRun: boolean}}            [config.dryRun=config.dryRun]   - Wheter or not to dry run the test
 * @param  {Object}                       [hooks]                         - An Object of {@link Hooks}
 * @param  {{nvmTestVersionHooks: Hooks}} [hooks.nvmTestVersionHooks]     - {@link nvmTestVersion} Hooks
 * @return {number} - The process exit code
 */
export async function nvmTestVersions (
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

/**
 * {@link Hookable} nvmTestVersions
 * @public
 * @function nvmTestVersions
 * @param  {version[]}                    [versions=['']]                 - A list of Node version to use with nvm
 * @param  {Object}                       [config]                        - A {@link config}
 * @param  {{install: command}}           [config.install=config.install] - A {@link config} `install` command
 * @param  {{test: command}}              [config.test=config.test]       - A {@link config} `test` command
 * @param  {{dryRun: boolean}}            [config.dryRun=config.dryRun]   - Wheter or not to dry run the test
 * @param  {Hooks}                        [hooks]                         - A {@link nvmTestVersions} Hooks
 * @param  {{pre: Hook}}                  [hooks.pre]                     - A `pre` hook
 * @param  {{post: Hook}}                 [hooks.post]                    - A `post` hook
 * @param  {{error: Hook}}                [hooks.error]                   - A `error` hook
 * @param  {{nvmTestVersionHooks: Hooks}} [hooks.nvmTestVersionHooks]     - A {@link nvmTestVersion} Hooks
 * @return {number} - The process exit code
 */
export default hookable(nvmTestVersions)
// exporting this will fail to document as function w/ esdoc
