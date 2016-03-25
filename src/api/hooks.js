const isFunction = (fn) => (typeof fn === 'function')

/**
 * Hook
 * @public
 * @typedef {function} Hook
 */

/**
 * Hooks
 * @public
 * @class Hooks
 */
class Hooks {
  /**
   * Create a Hooks
   * @param  {Object<string, Hook>} [hooks] - Some hooks
   * @return {Hooks} - This Hooks
   */
  constructor (hooks) {
    // assign hooks to this
    Object.assign(this, hooks)
  }
}
export default Hooks

/**
 * Hookable function, accepts a Hooks as last arguments
 * @public
 * @typedef {function(...args: arguments, hooks: Hooks): Promise} Hookable
 */

/**
 * Makes a function hookable
 * @protected
 * @param  {function} fn - A function to make hookable
 * @throws {TypeError} - When argument is not a function
 * @return {Hookable}  - The Hookable function, {@link Hooks} as last arguments
 */
export function hookable (fn) {
  if (!isFunction(fn)) throw new TypeError('Argument must be a function')

  /**
   * {@link Hookable} function
   * @protected
   * @param  {...arguments} [args]  - The function arguments
   * @param  {Hooks}        [hooks] - {@link Hooks} (`pre`, `post`, `error`, ...Hooks)
   * @throws {Error} - When error
   * @return {*}     - The function return value
   */
  return async function hook (...args) {
    // remove latest hooks from args if any
    const latest = args[args.length - 1]
    const hooks = latest instanceof Hooks ? args.pop() : new Hooks()
    // get 'pre', 'post', 'error', and function hooks
    const { pre, post, error, ...fnHooks } = hooks

    try {
      // pre hook
      if (isFunction(pre)) pre(...args)

      // await for function (call w/ function hooks)
      const value = await fn(...args.concat(fnHooks))

      // post hook
      if (isFunction(post)) post(value, ...args)

      // return value from function
      return value
    } catch (e) {
      // error hook
      if (isFunction(error)) error(e, ...args)

      // re-throw
      throw e
    }
  }
}
