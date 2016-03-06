import nvm from './nvm'
import config from './config'
import hook from './hook'

/**
 * Install a Node version with nvm if needed
 * @param {String} version - A Node version to install with nvm
 * @param {Object} $hooks - Some hooks ('$pre', '$post', '$error')
 * @return {Promise} - The async Promise nvm install
 */
function nvmInstall (version = config.version || '', $hooks) {
  const which = `nvm which ${version} &> /dev/null` // no output, no err
  const install = `nvm install ${version}`

  // 'which' version (detect) OR 'install' version
  return nvm(`${which} || ${install}`)($hooks)
}

// hook nvmInstall
const nvmInstallHook = hook(nvmInstall)

export { nvmInstallHook as default, nvmInstall }
