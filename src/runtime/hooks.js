/**
 * Hooks
 */
export default class Hooks {
  /**
   * @constructor
   * @param {Object} hooks - Some hooks
   */
  constructor (hooks = {}) {
    // assign hooks to this
    Object.assign(this, hooks)
  }
}

const isFunction = (fn) => (typeof fn === 'function')

/**
 * Makes a function hookable
 * @param {Function} fn - A function to hook
 * @return {Function} - The hookable function
 */
export function hook (fn) {
  if (!isFunction(fn)) throw new TypeError('Argument must be Function')

  return async function (...args) {
    // remove lastest hooks from args if any
    const lastest = args[args.length - 1]
    const hooks = lastest instanceof Hooks ? args.pop() : new Hooks()
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
