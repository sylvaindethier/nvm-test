/**
 * Make a function hookable ('pre', 'post', 'error')
 * @param {Function} fn - A function to hook
 * @return {Function} The promise to be called with hooks ('$pre', '$post', '$error')
 */
export default function hook (fn) {
  if (typeof fn !== 'function') throw new TypeError('Expected a function')
  return function (...args) {
    return async function ({ $pre, $post, $error } = {}) {
      try {
        // $pre hook
        if (typeof $pre === 'function') $pre(...args)

        // await for function
        const ret = await fn(...args)

        // $post hook
        if (typeof $post === 'function') $post(ret, ...args)

        return ret
      } catch (e) {
        // $error hook
        if (typeof $error === 'function') $error(e, ...args)

        // re throw error
        throw e
      }
    }
  }
}
