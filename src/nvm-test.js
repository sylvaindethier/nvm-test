import yargs from 'yargs'
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
config.commands.forEach((command) => {
  // require command from running project
  const cmd = require(`${process.cwd()}/node_modules/nvm-test-command-${command}`)
  yargs.command(patchCommand(cmd))
})

// get argv from yargs, handle command
cmd.handler(yargs.argv)
