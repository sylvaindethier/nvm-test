import log from 'npmlog'

// set log level to 'silly' in development NODE_ENV
if (process.env.NODE_ENV === 'development') log.level = 'silly'

/**
 * Set log from a program
 * @param {Command} program - A program
 * @param {String} optionLog - The option log name, default to 'log'
 * @return {void}
 */
function fromProgram (program, optionLog = 'log') {
  // heading from program name
  log.heading = program.name()

  // level from program optionLog
  log.level = program[optionLog] !== undefined
    ? program[optionLog] : program.opts()[optionLog]
}
log.fromProgram = fromProgram

export default log
