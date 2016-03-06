import expect from 'expect'
import { nvmTestVersions } from '../../src/runtime/nvm-test-versions'

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

  it('should resolve with a valid Node version', function (done) {
    this.timeout(20000)
    // need to dry run here, or endless loop
    return nvmTestVersions([process.version], undefined, true, {})
    .then((code) => {
      expect(code).toEqual(0)
      done()
    })
  })
})
