import { spawn } from 'child_process'
import { statSync } from 'fs'

const bin = `${process.env.NVM_DIR}/nvm.sh`
const source = `. ${bin}`
const options = {
  cwd: process.cwd(),
  env: process.env,
  stdio: 'inherit',
  shell: process.env.SHELL
}

// check nvm bin exists
function exists () {
  try {
    return statSync(bin).isFile()
  } catch (e) { return false }
}

function shell (command) {
  // invoke shell command (-c); have to source nvm before
  const args = ['-c', `${source}; ( ${command} )`]
  return spawn(process.env.SHELL, args, options)
}

function nvm (command) {
  return new Promise((resolve, reject) => {
    shell(command)

    // reject on error
    .on('error', (error) => { reject(error.code || 1, error) })

    // resolve if code is 0, reject otherwise
    .on('close', (code) => { code === 0 ? resolve(code) : reject(code) })
  })
}

export { nvm as default, exists, shell }
