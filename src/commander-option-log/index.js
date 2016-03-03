import { Command } from 'commander'

Command.prototype.loggable = function loggable ({
  short = 'L',
  long = 'log',
  description = 'set the log level',
  regexp = /\w+/i,
  defaultValue = undefined,
}) {
  this._log = long
  return this.option(`-${short}, --${long} <level>`, description, regexp, defaultValue)
}

Command.prototype.optionLog = function optionLog () {
  const name = this._log
  return this[name] !== undefined ? this[name] : this.opts()[name]
}
