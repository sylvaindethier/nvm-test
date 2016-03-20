import expect from 'expect'
import { nvmTestVersion } from '../../src/runtime/nvm-test-version'

describe('nvmTestVersion', function () {
  it('should be a function', function () {
    expect(nvmTestVersion).toExist().toBeA('function')
  })

  it('should reject with no Node version', function (done) {
    this.timeout(20000)
    return nvmTestVersion()
    .then(() => { throw new Error('nvmTestVersion was resolved, it should NOT') })
    .catch((code) => {
      expect(code).toNotEqual(0)
      done()
    })
  })

  it('should resolve with a valid Node version', function (done) {
    this.timeout(20000)
    // need to dry run here, or endless loop
    return nvmTestVersion(process.version, { dryRun: true })
    .then((code) => {
      expect(code).toEqual(0)
      done()
    })
  })

  it('should execute others install and test commands', function (done) {
    this.timeout(20000)
    // need to dry run here, or endless loop
    return nvmTestVersion(process.version, {
      install: 'nvm which $version > /dev/null',
      test: 'npm --version > /dev/null',
    }, {})
    .then((code) => {
      expect(code).toEqual(0)
      done()
    })
  })
})
