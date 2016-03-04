import { Command } from 'commander'
import log from 'npmlog'

const levels = ['error', 'warn', 'info', 'verbose', 'silly']
const short = 'L'
const long = 'log'
const arg = '<level>'

// set log level to 'silly' in `development` NODE_ENV
if (process.env.NODE_ENV === 'development') log.level = 'silly'

Command.prototype.optionLog = function optionLog (
  flags,
  description,
  fn,
  defaultValue
) {
  flags = `-${short}, --${long} ${arg}`
  description = `set the log level (${log.level}) [ ${levels.join(' | ')} ]`
  fn = new RegExp(levels.join('|'))
  defaultValue = log.level
  return this.option(flags, description, fn, defaultValue)
}

/**
 * Set log for a program
 * @param {Command} program - A program
 * @return {void}
 */
function logProgram (program) {
  // heading from program name
  log.heading = program.name()

  // level from program optionLog
  log.level = program[long] !== undefined ? program[long] : program.opts()[long]
}

export { log as default, logProgram }
