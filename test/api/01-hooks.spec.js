/* eslint-env mocha */
import expect from 'expect'
import Hooks, { hookable } from '../../src/api/hooks'

const fn = (...args) => (args)
const err = new Error()
const throws = () => { throw err }

/** @test Hooks */
describe('Hooks', function () {
  it('should be call for new instance only', function () {
    expect(function () { Hooks() }).toThrow()
    expect(new Hooks()).toBeA(Hooks)
  })

  it('should have passed in properties', function () {
    const hooks = new Hooks({ foo: 'foo', bar: 'bar' })
    expect(Object.keys(hooks)).toEqual(['foo', 'bar'])
    expect(hooks.foo).toEqual('foo')
    expect(hooks.bar).toEqual('bar')
  })
})

/** @test hookable */
describe('hookable', function () {
  it('should be a function', function () {
    expect(hookable).toBeA('function')
  })

  it('should throw a TypeError if argument is not a function', function () {
    expect(function () { hookable() }).toThrow(TypeError)
  })

  it('should return a function (1st level)', function () {
    expect(hookable(fn)).toBeA('function')
  })

  it('should return a Promise (2nd level)', function (done) {
    const p = hookable(fn)()
    expect(p).toBeA(Promise)

    return p.then(() => {
      done()
    })
    .catch(done)
  })

  it('should execute a "pre" hook', function (done) {
    const hooks = new Hooks({ pre: () => {} })
    const spy = expect.spyOn(hooks, 'pre')

    return hookable(fn)('foo', 'bar', hooks)
    .then(() => {
      expect(spy).toHaveBeenCalledWith('foo', 'bar')
      expect.restoreSpies()
      done()
    })
    .catch(done)
  })

  it('should execute a "post" hook', function (done) {
    const hooks = new Hooks({ post: () => {} })
    const spy = expect.spyOn(hooks, 'post')
    const add = (a, b) => (a + b)

    return hookable(add)('foo', 'bar', hooks)
    .then(() => {
      expect(spy).toHaveBeenCalledWith('foobar', 'foo', 'bar')
      expect.restoreSpies()
      done()
    })
    .catch(done)
  })

  it('should reject and execute an "error" hook on Error', function (done) {
    const hooks = new Hooks({ error: () => {} })
    const spy = expect.spyOn(hooks, 'error')

    return hookable(throws)('foo', 'bar', hooks)
    .then(() => {
      // it should not be resolved on Error, terminate with error
      done(err)
    })
    .catch(() => {
      expect(spy).toHaveBeenCalledWith(err, 'foo', 'bar')
      expect.restoreSpies()
      done()
    })
  })
})
