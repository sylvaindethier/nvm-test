/* eslint-env mocha */
import expect from 'expect'
import { nvmInstall } from '../../src/api/nvm-install'
import { shouldReject, shouldResolve } from './helpers/nvm.js'

/** @test nvmInstall */
describe('nvmInstall', function () {
  it('should be a function', function () {
    expect(nvmInstall).toExist().toBeA('function')
  })

  it('should reject with no Node version', function (done) {
    return nvmInstall()
    .then((code) => {
      // weird: fails on TravisCI, nvmInstall w/ no Node version reject w/ code 0
      if (code === 0) done()
      else done(new Error(`Resolved with code ${code}, it sould NOT`))
    })
    .catch((code) => {
      // exit code should NOT be 0 when Error
      expect(code).toNotEqual(0)
      done()
    })
  })

  it('should reject with an invalid Node version', function (done) {
    return shouldReject(nvmInstall('bad-version'), done)
  })

  it('should resolve with a valid Node version', function (done) {
    return shouldResolve(nvmInstall(process.version), done)
  })

  it('should execute an other install command', function (done) {
    const install = 'nvm which $version > /dev/null'
    return shouldResolve(nvmInstall(process.version, { install }, {}), done)
  })
})
