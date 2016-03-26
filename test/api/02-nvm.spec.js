/* eslint-env mocha */
import expect from 'expect'
import { renameSync } from 'fs'
import { nvm, exists, shell } from '../../src/api/nvm'
import { shouldReject, shouldResolve } from './helpers/nvm.js'

// ChildProcess class is not exposed under Node 0.12, use EventEmitter instead
let ChildProcess = require('child_process').ChildProcess
if (ChildProcess === undefined) ChildProcess = require('events').EventEmitter

/** @test exists */
describe('exists', function () {
  it('should be a function', function () {
    expect(exists).toBeA('function')
  })

  it('should return false if nvm does not exists', function () {
    // move NVM_DIR
    const tmp = process.env.NVM_DIR + '.bck'
    renameSync(process.env.NVM_DIR, tmp)
    expect(exists()).toBe(false)
    // restablish NVM_DIR
    renameSync(tmp, process.env.NVM_DIR)
  })

  it('should return true if nvm exists', function () {
    expect(exists()).toBe(true)
  })
})

/** @test shell */
describe('shell', function () {
  it('should be a function', function () {
    expect(shell).toBeA('function')
  })

  it('should return a ChildProcess', function (done) {
    expect(shell()).toBeA(ChildProcess)
    done()
  })

  it('should execute with success', function (done) {
    shell('echo "shell test" > /dev/null')
    .on('close', done)
  })
})

/** @test nvm */
describe('nvm', function () {
  it('should be a function', function () {
    expect(nvm).toBeA('function')
  })

  it('should reject the Promise on Error', function (done) {
    return shouldReject(nvm('bad-command 2> /dev/null'), done)
  })

  it('should return and resolve the Promise', function (done) {
    const p = nvm()
    expect(p).toBeA(Promise)

    return shouldResolve(p, done)
  })
})
