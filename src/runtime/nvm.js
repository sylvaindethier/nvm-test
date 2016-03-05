import { spawn } from 'child_process'
import { statSync } from 'fs'
import hook from './hook'

const sh = `${process.env.NVM_DIR}/nvm.sh`
const options = {
  cwd: process.cwd(),
  env: process.env,
  stdio: 'inherit',
  shell: process.env.SHELL,
}

/**
 * Wether or not nvm shell exists
 * @return {Boolean} - Wether or not nvm shell exists
 */
function exists () {
  try {
    return statSync(sh).isFile()
  } catch (e) { return false }
}

/**
 * Spawn a shell command with nvm shell
 * @param {String} command - A shell command to spawn
 * @return {ChildProcess} - The spawned nvm command
 */
function shell (command) {
  // invoke shell command (-c); source nvm shell before
  const args = ['-c', `. ${sh}; ( ${command} )`]
  return spawn(process.env.SHELL, args, options)
}

/**
 * Process a nvm shell command as a Promise
 * - It will resolve on 'close' code not equals 0
 * - It will reject on 'error' and 'close' code equals 0
 * @param {String} command - A nvm shell command
 * @return {Promise} - The nvm shell command Promise
 */
function nvm (command) {
  return new Promise((resolve, reject) => {
    shell(command)

    /*
     * 'error' event is emitted on spawn, kill, or send message Errors
     * no solution found yet to unit test
     */
     // reject on error
    .on('error', /* istanbul ignore next */ (error) => { reject(error.code || 1) })

    // resolve if code is 0, reject otherwise
    .on('close', (code) => { code === 0 ? resolve(code) : reject(code) })
  })
}

// hook nvm
const nvmHook = hook(nvm)

export { nvmHook as default, nvm, exists, shell }
