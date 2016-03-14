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
