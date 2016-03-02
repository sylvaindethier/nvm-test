import { exists } from './nvm'

// immediately check if exists, exit otherwise
if (!exists()) {
  // eslint-disable-next-line no-console
  console.error('Please install nvm from http://nvm.sh')
  process.exit(127) // ENOENT: no such file or directory
}

export { default as default } from './nvm'
export { default as nvmInstall } from './nvm-install'
export { default as nvmTest } from './nvm-test'
export { default as nvmTestVersion } from './nvm-test-version'
export { default as nvmTestVersions } from './nvm-test-versions'
