import nvm from './nvm'
import config from './config'
import { hook } from './hooks'

/**
 * Install a Node version with nvm if needed
 * @param {String} [version = ''] - A Node version to install with nvm
 * @param {Object} [options = {}] - Some options
 * @param {String} [options.install = config.install] - The install command
 * @param {Object} [hooks = {}] - Some hooks
 * @param {Object} [hooks.nvmHooks] - Some nvm hooks
 * @return {Promise} - The nvm (hook) Promise
 */
function nvmInstall (
  version = '',
  { install = config.install } = {},
  { nvmHooks } = {}
) {
  // raw command is install
  const cmd = install
  // replace $version
  const command = cmd.replace(/\$version/g, version)
  return nvm(command, nvmHooks)
}

// hook nvmInstall
const nvmInstallHook = hook(nvmInstall)

export { nvmInstallHook as default, nvmInstall }
