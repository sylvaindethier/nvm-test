import program from './commander'
import child_process from 'child_process'
import { log, loggable, logInit } from './utils'

loggable(program, 'silly')
  .version('0.0.0')
  .description('Execute test for a list of Node versions')
  .arguments('[versions...]')
  .parse(process.argv)

// output help if no arguments
if (!program.args.length) program.help()

logInit(program)
log.silly('command', 'options', program.opts())

// get the [versions...] arguments
const versions = program.args
log.verbose('command', 'versions', versions)

// execute functions
const options = { cwd: process.cwd(), env: process.env, shell: process.env.SHELL }
function exec (command) {
  return new Promise((resolve, reject) => {
    child_process.exec(command, options, (err, stdout, stderr) => {
      if (err) reject(stderr.trim(), err)
      else resolve(stdout.trim())
    })
  })
}
const nvm_source = `source ${process.env.NVM_DIR}/nvm.sh`
function nvm_exec (command) { return exec(`${nvm_source}; ${command}`) }

// check nvm version
log.verbose('command', 'check nvm')
nvm_exec('nvm --version')
  .catch((stderr) => {
    log.error('nvm', stderr)
    log.error('nvm', 'Please install nvm from https://github.com/creationix/nvm#install-script')
    process.exit(1)
  })
  .then((stdout) => { log.info('nvm', 'Your nvm version is', stdout) })
  .then(() => {
    // run for each versions
    versions.forEach((version) => {
      run(version)
        .catch((stderr) => { log.error('run', stderr) })
    })
  })

function run (version) {
  // use or install Node version
  log.verbose('run', 'Node version', version)
  return nvm_exec(`nvm use ${version} || nvm install ${version}`)
    .then(() => {
      // remove extraneous package, install, & test
      const command = 'npm prune && npm install && npm test'

      log.verbose('run', 'command: ', command)
      return nvm_exec(command)
    })
}
