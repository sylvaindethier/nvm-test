import { name } from '../package'

/**
 * Build a usage string from a command
 * @param {Object} cmd - A command
 * @return {String} - The usage string for the command
 */
export function buildUsage (cmd, prefix = `Usage:\n  `) {
  // get description from command
  const desc = cmd.desc || cmd.describe || cmd.description || ''

  return `${prefix}${name} ${cmd.command} [options] \t ${desc}`
}

/**
 * Patch a command - add usage
 * @param {Object} cmd - The command to patch
 * @return {Object} - The patched command
 */
export function patchCommand (cmd) {
  // get builder from command if function
  // or build builder function from command
  const fnbuilder = (yargs) => (typeof cmd.builder === 'object'
    ? yargs.options(cmd.builder) : yargs)
  const builder = typeof cmd.builder === 'function' ? cmd.builder : fnbuilder
  cmd.builder = (yargs) => (builder(yargs).usage(buildUsage(cmd)))

  // patch handler to process.exit
  const handler = cmd.handler
  cmd.handler = async function (argv) {
    process.exit(await handler(argv))
  }

  return cmd
}
