import nvmInstall from './nvm-install'
import nvmTest from './nvm-test'
import config from './config'
import { hookable } from './hooks'

/**
 * Run test using a Node version via nvm
 * @protected
 * @function nvmTestVersion
 * @param  {version}                  [version='']                    - A Node version to use with nvm
 * @param  {Object}                   [config]                        - A {@link config}
 * @param  {{install: command}}       [config.install=config.install] - A {@link config} `install` command
 * @param  {{test: command}}          [config.test=config.test]       - A {@link config} `test` command
 * @param  {{dryRun: boolean}}        [config.dryRun=config.dryRun]   - Wheter or not to dry run the test
 * @param  {Object}                   [hooks]                         - An Object of {@link Hooks}
 * @param  {{nvmInstallHooks: Hooks}} [hooks.nvmInstallHooks]         - {@link nvmInstall} Hooks
 * @param  {{nvmTestHooks: Hooks}}    [hooks.nvmTestHooks]            - {@link nvmTest} Hooks
 * @return {Promise} - The {@link nvmTest} Promise
 */
export async function nvmTestVersion (
  version = '',
  { install = config.install, test = config.test, dryRun = config.dryRun } = {},
  { nvmInstallHooks, nvmTestHooks } = {}
) {
  // await for nvm install
  await nvmInstall(version, { install }, nvmInstallHooks)

  // await and return for nvm test
  return await nvmTest(version, { test, dryRun }, nvmTestHooks)
}

/**
 * {@link Hookable} nvmTestVersion
 * @public
 * @function nvmTestVersion
 * @param  {version}                  [version='']                    - A Node version to use with nvm
 * @param  {Object}                   [config]                        - A {@link config}
 * @param  {{install: command}}       [config.install=config.install] - A {@link config} `install` command
 * @param  {{test: command}}          [config.test=config.test]       - A {@link config} `test` command
 * @param  {{dryRun: boolean}}        [config.dryRun=config.dryRun]   - Wheter or not to dry run the test
 * @param  {Hooks}                    [hooks]                         - A {@link nvmTestVersion} Hooks
 * @param  {{pre: Hook}}              [hooks.pre]                     - A `pre` hook
 * @param  {{post: Hook}}             [hooks.post]                    - A `post` hook
 * @param  {{error: Hook}}            [hooks.error]                   - A `error` hook
 * @param  {{nvmInstallHooks: Hooks}} [hooks.nvmInstallHooks]         - A {@link nvmInstall} Hooks
 * @param  {{nvmTestHooks: Hooks}}    [hooks.nvmTestHooks]            - A {@link nvmTest} Hooks
 * @return {Promise} - The {@link nvmTest} Promise
 */
export default hookable(nvmTestVersion)
// exporting this will fail to document as function w/ esdoc
