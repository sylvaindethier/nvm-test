import expect from 'expect'
import Hooks, { hook } from '../../src/api/hooks'

const fn = (...args) => { return args }

describe('Hooks', function () {
  it('should be call for new instance only', function () {
    expect(new Hooks()).toBeA(Hooks)
    expect(function () {
      Hooks()
    }).toThrow()
  })

  it('should have passed in properties', function () {
    const hooks = new Hooks({ foo: 'foo', bar: 'bar' })
    expect(Object.keys(hooks)).toEqual(['foo', 'bar'])
    expect(hooks.foo).toEqual('foo')
    expect(hooks.bar).toEqual('bar')
  })
})

describe('hook', function () {
  it('should be a function', function () {
    expect(hook).toBeA('function')
  })

  it('should throw a TypeError if argument is not a function', function () {
    expect(function () { hook() }).toThrow(TypeError)
  })

  it('should return a function (1st level)', function () {
    expect(hook(fn)).toBeA('function')
  })

  it('should return a Promise (2nd level)', function () {
    expect(hook(fn)()).toBeA(Promise)
  })

  it('should execute a "pre" hook', function () {
    const hooks = new Hooks({ pre: () => {} })
    const spy = expect.spyOn(hooks, 'pre')

    return hook(fn)('foo', 'bar', hooks).then(() => {
      expect(spy).toHaveBeenCalledWith('foo', 'bar')
      expect.restoreSpies()
    })
  })

  it('should execute a "post" hook', function () {
    const hooks = new Hooks({ post: () => {} })
    const spy = expect.spyOn(hooks, 'post')
    const add = (a, b) => (a + b)

    return hook(add)('foo', 'bar', hooks).then(() => {
      expect(spy).toHaveBeenCalledWith('foobar', 'foo', 'bar')
      expect.restoreSpies()
    })
  })

  it('should execute an "error" hook on error', function () {
    const hooks = new Hooks({ error: () => {} })
    const spy = expect.spyOn(hooks, 'error')
    const e = new Error()
    const err = () => { throw e }

    return hook(err)('foo', 'bar', hooks).catch(() => {
      expect(spy).toHaveBeenCalledWith(e, 'foo', 'bar')
      expect.restoreSpies()
    })
  })

  it('should reject on Error', function () {
    const err = () => { throw new Error() }
    return hook(err)()
    .then(() => {
      throw new Error('Error was resolved, it should NOT')
    })
    .catch((e) => {
      expect(e).toBeA(Error)
    })
  })
})
