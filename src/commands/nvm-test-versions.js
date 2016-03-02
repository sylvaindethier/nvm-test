import nvmTestVersion from './nvm-test-version'
import logger from '../utils/logger'

export default async function nvmTestVersions (versions, dryRun) {
  let code = 0
  const len = versions.length
  for (let i = 0; i < len; ++i) {
    // nvm test version
    let version = versions[i]
    try {
      logger.info('nvm test version', version)
      await nvmTestVersion(version, dryRun)
    } catch (error) {
      logger.error('nvm test version', version, 'failed with code', error)
      if (code === 0) code = error
    }
  }

  return code
}
