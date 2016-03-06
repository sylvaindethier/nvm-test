import { exists } from './nvm'

// immediately check if exists, throw error otherwise
/* istanbul ignore if */
if (!exists()) throw new Error('Please install from http://nvm.sh')

export { default as config } from './config'
export { default as nvm } from './nvm'
export { default as nvmInstall } from './nvm-install'
export { default as nvmTest } from './nvm-test'
export { default as nvmTestVersion } from './nvm-test-version'
export { default as nvmTestVersions } from './nvm-test-versions'
