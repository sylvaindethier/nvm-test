import nvm from './nvm'
import config from './config'
import { hookable } from './hooks'

/**
 * Install a Node version with nvm if needed
 * @protected
 * @function nvmInstall
 * @param  {version}            [version='']                    - A Node version to install with nvm
 * @param  {Object}             [config]                        - A {@link config}
 * @param  {{install: command}} [config.install=config.install] - A {@link config} `install` command
 * @param  {Object}             [hooks]                         - An Object of {@link Hooks}
 * @param  {{nvmHooks: Hooks}}  [hooks.nvmHooks]                - {@link nvm} Hooks
 * @return {Promise} - The {@link nvm} Promise
 */
export function nvmInstall (
  version = '',
  { install = config.install } = {},
  { nvmHooks } = {}
) {
  // raw command is install, replace $version
  const command = install.replace(/\$version/g, version)
  return nvm(command, nvmHooks)
}

/**
 * {@link Hookable} nvmInstall
 * @public
 * @function nvmInstall
 * @param  {version}            [version='']                    - A Node version to install with nvm
 * @param  {Object}             [config]                        - A {@link config}
 * @param  {{install: command}} [config.install=config.install] - A {@link config} `install` command
 * @param  {Hooks}              [hooks]                         - A {@link nvmInstall} Hooks
 * @param  {{pre: Hook}}        [hooks.pre]                     - A `pre` hook
 * @param  {{post: Hook}}       [hooks.post]                    - A `post` hook
 * @param  {{error: Hook}}      [hooks.error]                   - A `error` hook
 * @param  {{nvmHooks: Hooks}}  [hooks.nvmHooks]                - A {@link nvm} Hooks
 * @return {Promise} - The {@link nvm} Promise
 */
export default hookable(nvmInstall)
// exporting this will fail to document as function w/ esdoc
