/**
 * Set a function name
 * @param {String} name - A name for the function
 * @param {Function} fn - A function to set the name
 * @return {Function} The function renamed
 */
function setFunctionName (name, fn) {
  // rename async function from promise function name
  const fnName = Object.getOwnPropertyDescriptor(fn, 'name')
  fnName.value = name.toString()
  Object.defineProperty(fn, 'name', fnName)

  return fn
}

/**
 * Make a promise hookable ('pre', 'post', 'error')
 * @param {Promise} promise - A promise
 * @return {Function} The promise to be called with hooks ('$pre', '$post', '$error')
 */
function hook (promise) {
  const name = promise.name
  return setFunctionName(`${name}Hook`, function (...args) {
    return setFunctionName(`${name}Async`, async function ({ $pre, $post, $error } = {}) {
      try {
        // $pre hook
        if (typeof $pre === 'function') $pre(...args)

        // await for promise
        const ret = await promise(...args)

        // $post hook
        if (typeof $post === 'function') $post(ret, ...args)

        return ret
      } catch (e) {
        // $error hook
        if (typeof $error === 'function') $error(e, ...args)

        // re throw error
        throw e
      }
    })
  })
}

export { hook as default, setFunctionName }
