import expect from 'expect'
import * as runtime from '../../src/runtime'
import { renameSync, statSync } from 'fs'

describe('runtime', function () {
  it('should expose a "config" object', function () {
    expect(runtime.config).toBeA('object')
  })

  it('should expose a "nvmInstall" function', function () {
    expect(runtime.nvmInstall).toBeA('function')
  })

  it('should expose a "nvmTest" function', function () {
    expect(runtime.nvmTest).toBeA('function')
  })

  it('should expose a "nvmTestVersion" function', function () {
    expect(runtime.nvmTestVersion).toBeA('function')
  })

  it('should expose a "nvmTestVersions" function', function () {
    expect(runtime.nvmTestVersions).toBeA('function')
  })
})

describe('runtime', function () {
  it('sould fail to require if nvm does not exists', function () {
    // move NVM_DIR
    const tmp = process.env.NVM_DIR + '.bck'
    renameSync(process.env.NVM_DIR, tmp)

    expect(function () {
      if (!statSync(tmp).isDir()) { return }
      require('../../src/runtime')
    }).toThrow()
    // restablish NVM_DIR
    renameSync(tmp, process.env.NVM_DIR)
  })
})
