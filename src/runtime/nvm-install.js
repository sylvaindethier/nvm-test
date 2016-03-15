import nvm from './nvm'
import config from './config'
import { hook } from './hooks'

/**
 * Install a Node version with nvm if needed
 * @param {String} version - A Node version to install with nvm
 * @param {Object} hooks.nvmHooks - Some nvm hooks
 * @return {Promise} - The nvm (hook) Promise
 */
function nvmInstall (
  version = config.version,
  { nvmHooks } = {}
) {
  const which = `nvm which ${version} &> /dev/null` // no output, no err
  const install = `nvm install ${version}`

  // 'which' version (detect) OR 'install' version
  return nvm(`${which} || ${install}`, nvmHooks)
}

// hook nvmInstall
const nvmInstallHook = hook(nvmInstall)

export { nvmInstallHook as default, nvmInstall }
