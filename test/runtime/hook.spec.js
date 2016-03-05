import expect from 'expect'
import hook, { setFunctionName } from '../../src/runtime/hook'

describe('setFunctionName', function () {
  it('should be a function', function () {
    expect(setFunctionName).toBeA('function')
  })

  it('should return a renamed function', function () {
    function foo () {} // eslint-disable-line require-jsdoc
    const name = 'bar'
    expect(setFunctionName(name, foo).name).toEqual(name)
  })
})

describe('hook', function () {
  it('should be a function', function () {
    expect(hook).toBeA('function')
  })
})
