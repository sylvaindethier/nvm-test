import nvmInstall from './nvm-install'
import nvmTest from './nvm-test'
import logger from '../utils/logger'

export default async function nvmTestVersion (version, dryRun) {
  // install version
  logger.verbose('nvm install', version)
  await nvmInstall(version)

  // test version
  logger.verbose('nvm test', version)
  return await nvmTest(version, dryRun)
}
