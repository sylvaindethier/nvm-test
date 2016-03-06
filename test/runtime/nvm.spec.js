import expect from 'expect'
import { renameSync } from 'fs'
import nvmHook, { nvm, exists, shell } from '../../src/runtime/nvm'

import { spawn } from 'child_process'
import { statSync } from 'fs'

// ChildProcess class is not exposed under Node 0.12, use EventEmitter instead
let ChildProcess = require('child_process').ChildProcess
if (ChildProcess === undefined) ChildProcess = require('events').EventEmitter

describe('Node used import', function () {
  it('child_process.spawn should exists', function () {
    expect(spawn).toExist()
  })

  it('fs.statSync should exists', function () {
    expect(statSync).toExist()
  })

  it('fs.renameSync should exists', function () {
    expect(renameSync).toExist()
  })
})

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

describe('shell', function () {
  it('should be a function', function () {
    expect(shell).toBeA('function')
  })

  it('should return a ChildProcess', function () {
    expect(shell()).toBeA(ChildProcess)
  })

  it('should execute with success', function (done) {
    // close with done function
    shell().on('close', done)
  })
})

describe('nvm', function () {
  it('should be a function', function () {
    expect(nvm).toBeA('function')
  })

  it('should return a Promise', function () {
    const sh = nvm('echo "nvm test" > /dev/null')
    expect(sh).toBeA(Promise)
    return sh
  })

  it('should reject the Promise on error', function () {
    return nvm('bad-command 2> /dev/null')
      .then((code) => {
        throw new Error('nvm Promise was resolved, it should NOT')
      })
      .catch((code) => {
        expect(code).toNotEqual(0)
      })
  })

  it('should resolve the Promise on close', function () {
    return nvm('nvm --version > /dev/null')
      .then((code) => {
        expect(code).toEqual(0)
      })
  })
})

describe('hook nvm', function () {
  it('should be function', function () {
    expect(nvmHook).toBeA('function')
  })
})
