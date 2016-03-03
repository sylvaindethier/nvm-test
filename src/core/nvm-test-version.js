import nvmInstall from './nvm-install'
import nvmTest from './nvm-test'
import log from '../utils/log'

export default async function nvmTestVersion (version, dryRun) {
  // install version
  log.verbose('nvm install', version)
  foo(await nvmInstall(version))

  // test version
  log.verbose('nvm test', version)
  return await nvmTest(version, dryRun)
}
