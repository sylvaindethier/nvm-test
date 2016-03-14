import Hooks from './Hooks'

/**
 * Makes a function hookable
 * @param {Function} fn - A function to hook
 * @return {Function} - The hookable function
 */
export default function hook (fn) {
  return async function hookable (...args) {
    // remove lastest hooks from args if any
    const lastest = args[args.length - 1]
    const hooks = lastest instanceof Hooks ? args.pop() : new Hooks()
    // get 'pre', 'post', 'error', and function hooks
    const { pre, post, error, ...fnHooks } = hooks

    try {
      // pre hook
      if (typeof pre === 'function') pre(...args)

      // await for function (call w/ function hooks)
      const value = await fn(...args.concat(fnHooks))

      // post hook
      if (typeof post === 'function') post(value, ...args)

      // return value from function
      return value
    } catch (e) {
      // error hook
      if (typeof error === 'function') error(e, ...args)

      // re-throw
      throw e
    }
  }
}
