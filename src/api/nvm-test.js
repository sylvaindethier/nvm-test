import nvm from './nvm'
import config from './config'
import { hookable } from './hooks'

/**
 * Test using a Node version with nvm
 * @protected
 * @function nvmTest
 * @param  {version}           [version='']                  - A Node version to use with nvm
 * @param  {Object}            [config]                      - A {@link config}
 * @param  {{test: command}}   [config.test=config.test]     - A {@link config} `test` command
 * @param  {{dryRun: boolean}} [config.dryRun=config.dryRun] - Wheter or not to dry run the test
 * @param  {Object}            [hooks]                       - An Object of {@link Hooks}
 * @param  {{nvmHooks: Hooks}} [hooks.nvmHooks]              - A {@link nvm} Hooks
 * @return {Promise} - The {@link nvm} Promise
 */
export function nvmTest (
  version = '',
  { test = config.test, dryRun = config.dryRun } = {},
  { nvmHooks } = {}
) {
  // apply dryRun if required, just echo the command for now
  if (dryRun) test = `echo "Dry run: ${test}"`

  // raw command is test, replace $version
  const command = test.replace(/\$version/g, version)
  return nvm(command, nvmHooks)
}

/**
 * {@link Hookable} nvmTest
 * @public
 * @function nvmTest
 * @param  {version}            [version='']                    - A Node version to use with nvm
 * @param  {Object}             [config]                        - A {@link config}
 * @param  {{test: command}}    [config.test=config.test]       - The {@link config} `test` command
 * @param  {{dryRun: boolean}}  [config.dryRun=config.dryRun]   - Wheter or not to dry run the test
 * @param  {Hooks}              [hooks]                         - {@link nvmTest} Hooks
 * @param  {{pre: Hook}}        [hooks.pre]                     - A `pre` hook
 * @param  {{post: Hook}}       [hooks.post]                    - A `post` hook
 * @param  {{error: Hook}}      [hooks.error]                   - A `error` hook
 * @param  {{nvmHooks: Hooks}}  [hooks.nvmHooks]                - {@link nvm} Hooks
 * @return {Promise} - The {@link nvm} Promise
 */
export default hookable(nvmTest)
// exporting this will fail to document as function w/ esdoc
