/* eslint-env mocha */
import expect from 'expect'
import { nvmTestVersions } from '../../src/api/nvm-test-versions'
import { shouldResolve } from './helpers/nvm.js'

/** @test nvmTestVersions */
describe('nvmTestVersions', function () {
  it('should be a function', function () {
    expect(nvmTestVersions).toExist().toBeA('function')
  })

  it('should return error code with no Node version', function (done) {
    return nvmTestVersions()
    .then((code) => {
      expect(code).toNotEqual(0)
      done()
    })
    .catch((code) => {
      done(new Error(`Rejected with code ${code}`))
    })
  })

  it('should return error code with an invalid Node version', function (done) {
    return nvmTestVersions(['foo'])
    .then((code) => {
      expect(code).toNotEqual(0)
      done()
    })
    .catch((code) => {
      done(new Error(`Rejected with code ${code}`))
    })
  })

  it('should resolve with a valid Node version', function (done) {
    // need to dry run here, or endless loop
    return shouldResolve(nvmTestVersions([process.version], { dryRun: true }), done)
  })

  it('should execute others install and test commands', function (done) {
    return shouldResolve(nvmTestVersions([process.version], {
      install: 'nvm which $version > /dev/null',
      test: 'npm --version > /dev/null'
    }, {}), done)
  })
})
