import expect from 'expect'
import { nvmTest } from '../../src/api/nvm-test'
import { shouldReject, shouldResolve } from './helpers/nvm.js'

/** @test nvmTest */
describe('nvmTest', function () {
  it('should be a function', function () {
    expect(nvmTest).toExist().toBeA('function')
  })

  it('should reject with no Node version', function (done) {
    this.timeout(20000) // 20s
    return shouldReject(nvmTest(), done)
  })

  it('should reject with an invalid Node version', function (done) {
    this.timeout(20000) // 20s
    return shouldReject(nvmTest('bad-version'), done)
  })

  it('should resolve with a valid Node version', function (done) {
    this.timeout(20000) // 20s
    // need to dry run here, or endless loop
    return shouldResolve(nvmTest(process.version, { dryRun: true }), done)
  })

  it('should execute an other test command', function (done) {
    this.timeout(5000) // 5s
    const test = 'npm --version > /dev/null'
    return shouldResolve(nvmTest(process.version, { test }, {}), done)
  })
})
