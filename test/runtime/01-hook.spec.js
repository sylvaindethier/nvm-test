import expect from 'expect'
import hook from '../../src/runtime/hook'

const fn = (...args) => { return args }

describe('hook', function () {
  it('should be a function', function () {
    expect(hook).toBeA('function')
  })

  it('should throw a TypeError if argument is not a function', function () {
    expect(function () { hook() }).toThrow(TypeError)
  })

  it('should return a function at 1st level', function () {
    expect(hook(fn)).toBeA('function')
  })

  it('should return a function at 2nd level', function () {
    expect(hook(fn)()).toBeA('function')
  })

  it('should return a Promise at 3rd level', function () {
    expect(hook(fn)()()).toBeA(Promise)
  })

  it('should execute a $pre hook', function () {
    const hooks = { $pre: () => {} }
    const spy = expect.spyOn(hooks, '$pre')

    return hook(fn)('foo', 'bar')(hooks).then(() => {
      expect(spy).toHaveBeenCalledWith('foo', 'bar')
      expect.restoreSpies()
    })
  })

  it('should execute a $post hook', function () {
    const hooks = { $post: () => {} }
    const spy = expect.spyOn(hooks, '$post')
    const add = (a, b) => (a + b)

    return hook(add)('foo', 'bar')(hooks).then(() => {
      expect(spy).toHaveBeenCalledWith('foobar', 'foo', 'bar')
      expect.restoreSpies()
    })
  })

  it('should execute a $error hook on error', function () {
    const hooks = { $error: () => {} }
    const spy = expect.spyOn(hooks, '$error')
    const e = new Error()
    const err = () => { throw e }

    return hook(err)('foo', 'bar')(hooks).catch(() => {
      expect(spy).toHaveBeenCalledWith(e, 'foo', 'bar')
      expect.restoreSpies()
    })
  })

  it('should reject on Error', function () {
    const err = () => { throw new Error() }
    return hook(err)()()
    .then(() => {
      throw new Error('Error was resolved, it should NOT')
    })
    .catch((e) => {
      expect(e).toBeA(Error)
    })
  })
})
