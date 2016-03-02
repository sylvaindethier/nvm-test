import nvm from './nvm'

export default function nvmInstall (version) {
  const which = `nvm which ${version} > /dev/null` // no output
  const install = `nvm install ${version}`

  // 'which' version (detect) OR 'install' version
  return nvm(`${which} || ${install}`)
}
