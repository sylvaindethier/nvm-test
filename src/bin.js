import yargs from 'yargs'
import { sync as resolveSync } from 'resolve'
import { config } from './api'
import { buildUsage, patchCommand, __ } from './utils'

// require command and patch handler
const command = patchCommand.handler(require('./command'))
const usage = __('usage') + buildUsage(command) +
  '\n  ' + buildUsage({ command: '<command> ', desc: __('plugin') })

yargs
  // version from package
  .version().alias('v', 'version')
  .help('h').alias('h', 'help')
  .usage(usage, command.builder)
  // all options are global
  .global(Object.keys(command.builder))

// add config plugins
const plugins = config.plugins
plugins.forEach((plugin) => {
  // resolve plugin path from running project
  const basedir = process.cwd()
  const path = resolveSync(`nvm-test-plugin-${plugin}`, { basedir })
  // require command, patch and register
  yargs.command(patchCommand(require(path)))
})

// get argv from yargs
const argv = yargs.argv
// handle if not executing plugin
if (plugins.indexOf(argv._[0]) === -1) command.handler(argv)
