import { Command } from './commander'
import log from 'npmlog'

function check (program) {
  const isCommand = program instanceof Command
  if (!isCommand) throw new TypeError('Invalid program type')
}

export { log }

export function loggable (program, logLevel = 'info') {
  check(program)

  // add log-level
  return program.option('-l, --log-level <level>',
    'set the log level [silly | verbose | info | warn | error]',
    /^(silly|verbose|info|warn|error)$/i, logLevel)
}

export function logInit (program) {
  check(program)

  // set log heading & level
  log.heading = program.name()
  if (program.logLevel) log.level = program.logLevel
  return program
}
