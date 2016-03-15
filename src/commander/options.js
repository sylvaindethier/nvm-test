import { Command } from 'commander'

// option log
const log = {
  levels: ['silent', 'error', 'warn', 'info', 'verbose', 'silly'],
  short: 'L',
  long: 'log',
  arg: '<level>',
  description: 'set the log level',
}

// option test
const test = {
  short: 't',
  long: 'test',
  arg: '<command>',
  description: 'specify the test command',
}

// option dry-run
const dryRun = {
  short: 'D',
  long: 'dry-run',
  description: 'execute a dry run test',
}

const buildFlags = ({ short, long, arg }) => (`-${short}, --${long} ${arg}`)

Command.prototype.optionLog = function ({ defaultValue }) {
  const flags = buildFlags(log)
  const description = log.description + ` (${defaultValue}) [ ${log.levels.join(' | ')} ]`
  const fn = new RegExp(log.levels.join('|'))
  return this.option(flags, description, fn, defaultValue)
}

Command.prototype.optionTest = function ({ defaultValue }) {
  const flags = buildFlags(test)
  const description = test.description + ` (${defaultValue})`
  // do not pass defaultValue, it will override value from .nvmrc.test
  return this.option(flags, description)
}

Command.prototype.optionDryRun = function ({ defaultValue }) {
  const flags = buildFlags(dryRun)
  const description = dryRun.description + ` (${defaultValue})`
  // do not pass defaultValue, it will override value from .nvmrc.test
  return this.option(flags, description)
}

Command.prototype.optionsNvmTest = function ({
  defaultLog,
  defaultTest,
  defaultDryRun,
}) {
  return this
  // option log
  .optionLog({ defaultValue: defaultLog })
  // option test
  .optionTest({ defaultValue: defaultTest })
  // option dry run
  .optionDryRun({ defaultValue: defaultDryRun })
}
