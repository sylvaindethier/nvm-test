import expect from 'expect'
import { nvmTest } from '../../src/runtime/nvm-test'

describe('nvmTest', function () {
  it('should be a function', function () {
    expect(nvmTest).toExist().toBeA('function')
  })

  it('should reject with no Node version', function (done) {
    this.timeout(20000)
    return nvmTest()
    .then(() => { throw new Error('nvmTest was resolved, it should NOT') })
    .catch((code) => {
      expect(code).toNotEqual(0)
      done()
    })
  })

  it('should reject with invalid Node version', function (done) {
    this.timeout(20000)
    return nvmTest('bad-version')
    .then(() => { throw new Error('nvmInstall "bad-version" was resolved, it should NOT') })
    .catch((code) => {
      expect(code).toNotEqual(0)
      done()
    })
  })

  it('should resolve with a valid Node version', function (done) {
    this.timeout(20000)
    // need to dry run here, or endless loop
    return nvmTest(process.version, undefined, true)
    .then((code) => {
      expect(code).toEqual(0)
      done()
    })
  })

  it('should run a different test', function (done) {
    this.timeout(5000)
    return nvmTest(process.version, 'npm --version')
    .then((code) => {
      expect(code).toEqual(0)
      done()
    })
  })

  it('should dry run the test', function (done) {
    this.timeout(5000)
    return nvmTest(process.version, undefined, true)
    .then((code) => {
      expect(code).toEqual(0)
      done()
    })
  })
})
