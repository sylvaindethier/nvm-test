import program from 'commander'
import { log, loggable, logInit } from './utils'
import { version } from '../package'

// const file = resolve(__dirname, '../srcipts/nvm-test.sh')

// make program loggable
loggable(program, 'silly')
  .version(version)
  .command('exec [versions...]', 'execute test for a list of Node versions', {isDefault: true})
  .parse(process.argv)

// output help if no arguments
if (!program.args.length) program.help()

logInit(program)
log.silly('command', 'options', program.opts())
