import y18n_init from 'y18n'
import { name } from '../package'

/**
 * Build a usage string from a command
 * @private
 * @param  {Object} cmd - A command
 * @return {string} - The usage string for the command
 */
export function buildUsage (cmd) {
  // get description from command
  const desc = cmd.desc || cmd.describe || cmd.description || ''

  return `${name} ${cmd.command} [options] \t ${desc}`
}

/**
 * Patch a command - add usage
 * @private
 * @param  {Object} cmd        - A command to patch
 * @param  {string} [usage=''] - A string to prefix usage
 * @return {Object} - The patched command
 */
export function patchCommand (cmd, usage = '') {
  // get builder from command if function
  // or build builder function from command
  const fnbuilder = (yargs) => (typeof cmd.builder === 'object'
    ? yargs.options(cmd.builder) : yargs)
  const builder = typeof cmd.builder === 'function' ? cmd.builder : fnbuilder
  cmd.builder = (yargs) => (builder(yargs).usage(usage + buildUsage(cmd)))

  // patch handler to process.exit
  const handler = cmd.handler
  cmd.handler = async function (argv) {
    process.exit(await handler(argv))
  }

  return cmd
}

// initialize y18n and get the translation functions
const y18n = y18n_init()
const { __, __n } = y18n
export { y18n, __, __n }
