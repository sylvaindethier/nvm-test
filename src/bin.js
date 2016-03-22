import yargs from 'yargs'
import { sync as resolveSync } from 'resolve'
import { config } from './api'
import { buildUsage, patchCommand } from './utils'

// commands had to be required
const cmd = require('./command')
const usage = buildUsage(cmd) + buildUsage({
  command: '<command>', desc: 'Execute external <command>',
}, `\n  `)

yargs
  // version from package
  .version().alias('v', 'version')
  .help('h').alias('h', 'help')
  .usage(usage, cmd.options)
  // all options are global
  .global(Object.keys(cmd.options))
  // set locale to 'en' for now, TODO: use y18n
  .locale('en')

// add config commands
const commands = config.commands
commands.forEach((command) => {
  // resolve command path from running project
  const path = resolveSync(`nvm-test-command-${command}`, { basedir: process.cwd() })
  const cmd = require(path)
  yargs.command(patchCommand(cmd))
})

// get argv from yargs
const argv = yargs.argv
// handle if not command
if (commands.indexOf(argv._[0]) === -1) cmd.handler(argv)
