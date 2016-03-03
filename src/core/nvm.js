import { spawn } from 'child_process'
import { statSync } from 'fs'

const bin = `${process.env.NVM_DIR}/nvm.sh`
const options = {
  cwd: process.cwd(),
  env: process.env,
  stdio: 'inherit',
  shell: process.env.SHELL,
}

// check bin exists
/**
 *
 */
function exists () {
  try {
    return statSync(bin).isFile()
  } catch (e) { return false }
}

function shell (command) {
  // invoke shell command (-c); have to source nvm before
  const args = ['-c', `. ${bin}; ( ${command} )`]
  return spawn(process.env.SHELL, args, options)
}

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

async function nvmAsync (command, { pre, post, error }) {
  try {
    if (pre instanceof Function) pre(command) // pre hook
    const code = await nvm(command) // await for nvm
    if (post instanceof Function) post(code, command) // post hook
    return code // fluent
  } catch (code) {
    if (error instanceof Function) error(code, command) // error hook
    throw code // fluent
  }
}

export { nvm, nvmAsync, exists, shell }
