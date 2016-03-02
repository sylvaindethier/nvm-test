import { Command } from 'commander'

// defaults
const $name = 'log'
const $flags = `-L, --${$name} <level>`
const $description = 'set the log level [silly | verbose | info | warn | error]'
const $coercion = /^(silly|verbose|info|warn|error)$/i
const $defaultValue = 'info'

Command.prototype.optionLog = function optionLog (
  flags = $flags,
  description = $description,
  coercion = $coercion,
  defaultValue = $defaultValue) {
  return this.option(flags, description, coercion, defaultValue)
}

Command.prototype.optsLog = function optsLog (name = $name) {
  return this[name] !== undefined ? this[name] : this.opts()[name]
}
