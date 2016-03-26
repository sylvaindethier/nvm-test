import yargs from 'yargs'
import { sync as resolveSync } from 'resolve'
import { config } from './api'
import { buildUsage, patchCommand, __ } from './utils'

// commands had to be required
const cmd = require('./command')
const usage = __('usage') + buildUsage(cmd) +
  '\n  ' + buildUsage({ command: '<command> ', desc: __('external') })

yargs
  // version from package
  .version().alias('v', 'version')
  .help('h').alias('h', 'help')
  .usage(usage, cmd.options)
  // all options are global
  .global(Object.keys(cmd.options))

// add config commands
const commands = config.commands
commands.forEach((command) => {
  // resolve command path from running project
  const path = resolveSync(`nvm-test-command-${command}`, { basedir: process.cwd() })
  const cmd = require(path)
  yargs.command(patchCommand(cmd, __('usage')))
})

// get argv from yargs
const argv = yargs.argv
// handle if not command
if (commands.indexOf(argv._[0]) === -1) cmd.handler(argv)
