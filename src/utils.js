import { resolve } from 'path'
import y18nCreate from 'y18n'
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
 * Patch a command - add usage to builder, process exit to handler
 * @private
 * @param  {Object} cmd - A command to patch
 * @return {Object} - The patched command
 */
export function patchCommand (cmd) {
  // patch the builder, patch the handler
  return patchCommand.handler(patchCommand.builder(cmd))
}
/**
 * Patch a command builder to add usage
 * @param  {Object} cmd - The command to patch the builder
 * @return {Object} - The patched command
 */
patchCommand.builder = (cmd) => {
  // get builder from command if function
  // or create builder function from command
  const fnbuilder = (yargs) => (
    typeof cmd.builder === 'object' ? yargs.options(cmd.builder) : yargs
  )
  const builder = typeof cmd.builder === 'function' ? cmd.builder : fnbuilder
  cmd.builder = (yargs) => (builder(yargs).usage(__('usage') + buildUsage(cmd)))
  return cmd
}
/**
 * Patch a command handler to process.exit
 * @private
 * @param  {Object} cmd - The command to patch the handler
 * @return {Object} - The patched command
 */
patchCommand.handler = (cmd) => {
  // patch handler to process.exit
  const handler = cmd.handler
  cmd.handler = async function (argv) { process.exit(await handler(argv)) }
  return cmd
}

// initialize y18n and get the translation functions
/** @private */
const y18n = y18nCreate({ directory: resolve(__dirname, '../locales') })
const { __, __n } = y18n
export { y18n, __, __n }
