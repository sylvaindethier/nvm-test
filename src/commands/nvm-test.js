import nvm from './nvm'

export default function nvmTest (version, dryRun) {
  const use = `nvm use ${version}`
  const run = 'npm prune && npm install && npm test'
  const cmd = dryRun ? `echo "Dry run: ${run}"` : run

  // 'use' version AND run
  return nvm(`${use} && ( ${cmd} )`)
}
