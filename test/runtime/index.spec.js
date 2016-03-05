import expect from 'expect'
import * as runtime from '../../src/runtime'

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
