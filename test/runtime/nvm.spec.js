import expect from 'expect'
import { execSync, ChildProcess } from 'child_process'
import nvmHook, { nvm, exists, shell } from '../../src/runtime/nvm'

describe('exists', function () {
  it('should be a function', function () {
    expect(exists).toBeA('function')
  })

  it('should return false if NVM does not exists', function () {
    // move NVM
    const tmp = process.env.NVM_DIR + '.bck'
    execSync(`mv ${process.env.NVM_DIR} ${tmp}`)
    expect(exists()).toBe(false)
    // restablish NVM
    execSync(`mv ${tmp} ${process.env.NVM_DIR}`)
  })

  it('should return true if NVM exists', function () {
    expect(exists()).toBe(true)
  })
})

describe('shell', function () {
  it('should be a function', function () {
    expect(shell).toBeA('function')
  })

  it('should return a ChildProcess', function () {
    expect(shell('echo "shell test" > /dev/null')).toBeA(ChildProcess)
  })
})

describe('nvm', function () {
  it('should be a function', function () {
    expect(nvm).toBeA('function')
  })

  it('should return a Promise', function () {
    expect(nvm('echo "nvm test" > /dev/null')).toBeA(Promise)
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
