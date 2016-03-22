import expect from 'expect'
import { nvmTestVersions } from '../../src/api/nvm-test-versions'

describe('nvmTestVersions', function () {
  it('should be a function', function () {
    expect(nvmTestVersions).toExist().toBeA('function')
  })

  it('should reject with no Node version', function (done) {
    this.timeout(20000)
    return nvmTestVersions()
    .then(() => { throw new Error('nvmTestVersions was resolved, it should NOT') })
    .catch((code) => {
      expect(code).toNotEqual(0)
      done()
    })
  })

  it('should return error code with an invalid Node version', function (done) {
    this.timeout(20000)
    return nvmTestVersions(['foo'])
    .then((code) => {
      expect(code).toEqual(3) // version not found (nvm)
      done()
    })
  })

  it('should resolve with a valid Node version', function (done) {
    this.timeout(20000)
    // need to dry run here, or endless loop
    return nvmTestVersions([process.version], { dryRun: true })
    .then((code) => {
      expect(code).toEqual(0)
      done()
    })
  })

  it('should execute others install and test commands', function (done) {
    this.timeout(20000)
    // need to dry run here, or endless loop
    return nvmTestVersions([process.version], {
      install: 'nvm which $version > /dev/null',
      test: 'npm --version > /dev/null',
    }, {})
    .then((code) => {
      expect(code).toEqual(0)
      done()
    })
  })
})
