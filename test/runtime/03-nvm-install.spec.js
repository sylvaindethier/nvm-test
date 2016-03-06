import expect from 'expect'
import { nvmInstall } from '../../src/runtime/nvm-install'

describe('nvmInstall', function () {
  it('should be a function', function () {
    expect(nvmInstall).toExist().toBeA('function')
  })

  it('should reject with no Node version', function (done) {
    this.timeout(20000)
    return nvmInstall()
    .then(() => { throw new Error('nvmInstall was resolved, it should NOT') })
    .catch((code) => {
      expect(code).toNotEqual(0)
      done()
    })
  })

  it('should reject with invalid Node version', function (done) {
    this.timeout(20000)
    return nvmInstall('bad-version')
    .then(() => { throw new Error('nvmInstall "bad-version" was resolved, it should NOT') })
    .catch((code) => {
      expect(code).toNotEqual(0)
      done()
    })
  })

  it('should resolve with a valid Node version', function (done) {
    this.timeout(5000)
    return nvmInstall(process.version)
    .then((code) => {
      expect(code).toEqual(0)
      done()
    })
  })
})
