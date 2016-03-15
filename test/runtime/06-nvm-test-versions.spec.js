import expect from 'expect'
import { nvmTestVersions } from '../../src/runtime/nvm-test-versions'

describe('nvmTestVersions', function () {
  it('should be a function', function () {
    expect(nvmTestVersions).toExist().toBeA('function')
  })

  it('should resolve with no Node version', function (done) {
    this.timeout(20000)
    return nvmTestVersions()
    .then((code) => {
      expect(code).toEqual(0) // version not found (nvm)
      done()
    })
  })

  it('should return error code with an invlid Node version', function (done) {
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
    return nvmTestVersions([process.version], 'npm --version', true, {})
    .then((code) => {
      expect(code).toEqual(0)
      done()
    })
  })
})
