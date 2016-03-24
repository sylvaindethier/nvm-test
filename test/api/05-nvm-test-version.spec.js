import expect from 'expect'
import { nvmTestVersion } from '../../src/api/nvm-test-version'
import { shouldReject, shouldResolve } from './helpers/nvm.js'

/** @test nvmTestVersion */
describe('nvmTestVersion', function () {
  it('should be a function', function () {
    expect(nvmTestVersion).toExist().toBeA('function')
  })

  it('should reject with no Node version', function (done) {
    this.timeout(20000) // 20s
    return shouldReject(nvmTestVersion(), done)
  })

  it('should resolve with a valid Node version', function (done) {
    this.timeout(20000) // 20s
    // need to dry run here, or endless loop
    return shouldResolve(nvmTestVersion(process.version, { dryRun: true }), done)
  })

  it('should execute others install and test commands', function (done) {
    this.timeout(5000) // 5s
    // need to dry run here, or endless loop
    return shouldResolve(nvmTestVersion(process.version, {
      install: 'nvm which $version > /dev/null',
      test: 'npm --version > /dev/null',
    }, {}), done)
  })
})
