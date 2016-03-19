import yargs from 'yargs'
import { config } from './runtime'
import { buildUsage, patchCommand } from './utils'

// commands had to be required
const cmd = require('./command')
const usage = `Usage:\n` + buildUsage(cmd) + buildUsage({
  command: '<command>', desc: 'Execute external command',
})

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
  const cmd = require(`nvm-test-command-${command}`)
  yargs.command(patchCommand(cmd))
})

// get argv
const argv = yargs.argv

// handle command
cmd.handler(argv)
