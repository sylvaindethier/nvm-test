import { spawn } from 'child_process'
import { statSync } from 'fs'
import semver from 'semver'
import { hookable } from './hooks'

const bin = process.env.NVM_DIR + '/nvm.sh'
const options = {
  cwd: process.cwd(),
  env: process.env,
  stdio: 'inherit',
  shell: process.env.SHELL
}

// 'shell' option introduced in Node v5.7.0
const shellOption = semver.satisfies(process.version, '>=5.7.0')

/**
 * Wether or not nvm exists.
 * @protected
 * @return {boolean} - Wether or not nvm exists
 */
export function exists () {
  try {
    return statSync(bin).isFile()
  } catch (e) {
    return false
  }
}

/* !esdoc bug
 * The Node ChildProcess
 * @external ChildProcess
 * @see {@link https://nodejs.org/api/child_process.html#child_process_class_childprocess}
 */

/* !esdoc bug
 * The Node EventEmitter, some Node versions do NOT expose the ChildProcess class
 * @external EventEmitter
 * @see {@link https://nodejs.org/api/events.html#events_class_eventemitter}
 */

/**
 * Spawn a shell command with nvm shell.
 * @protected
 * @param  {command} [command=''] - A shell command to spawn
 * @return {(ChildProcess|EventEmitter)} - The spawned nvm command child process
 */
export function shell (command = '') {
  // source (period command) nvm before running the command
  const cmd = `. ${bin}` + (command ? ` && ${command}` : '')

  // the hole command has to be quoted starting w/ shell option
  /* istanbul ignore next: depends on process.version */
  const shcmd = shellOption ? `'${cmd}'` : cmd

  // invoke shell command (-c)
  const args = ['-c', shcmd]
  return spawn(process.env.SHELL, args, options)
}

/**
 * Process a nvm shell command as a Promise.
 * - It will resolve on 'close' code not equals 0.
 * - It will reject on 'error' and 'close' code equals 0.
 * @protected
 * @param  {command} [command=''] - A shell command
 * @return {Promise} - The nvm shell Promise
 */
export function nvm (command = '') {
  return new Promise((resolve, reject) => {
    shell(command)

    /*
     * 'error' event is emitted on spawn, kill, or send message Errors
     * no solution found yet to unit test
     */
     // reject on error
    .on('error', /* istanbul ignore next */ (error) => { reject(error.code || 1) })

    // resolve if code is 0, reject otherwise
    .on('close', (code) => { (code === 0 ? resolve : reject)(code) })
  })
}

/**
 * {@link Hookable} nvm
 * @public
 * @function nvm
 * @param  {command}       [command='']  - A shell command
 * @param  {Hooks}         [hooks]       - {@link nvm} Hooks
 * @param  {{pre: Hook}}   [hooks.pre]   - A `pre` hook
 * @param  {{post: Hook}}  [hooks.post]  - A `post` hook
 * @param  {{error: Hook}} [hooks.error] - A `error` hook
 * @return {Promise} - The {@link nvm} Promise
 */
export default hookable(nvm)
// exporting this will fail to document as function w/ esdoc
