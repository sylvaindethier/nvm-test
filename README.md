# NVM test
> Test using differents Node versions with NVM.

Extensible `nvm-test` command that runs your tests using differents
Node versions with NVM

[npm-url]: https://www.npmjs.org/package/nvm-test
[npm-image]: https://nodei.co/npm/nvm-test.svg?downloads=true&stars=true
[npm-version-image]: https://img.shields.io/npm/v/nvm-test.svg?style=flat-square
[build-url]: https://travis-ci.org/sylvaindethier/nvm-test
[build-image]: https://img.shields.io/travis/sylvaindethier/nvm-test/master.svg?style=flat-square
[coverage-url]: https://coveralls.io/r/sylvaindethier/nvm-test?branch=master
[coverage-image]: https://img.shields.io/coveralls/sylvaindethier/nvm-test.svg?style=flat-square
[deps-image]: https://img.shields.io/david/sylvaindethier/nvm-test.svg?style=flat-square
[deps-url]: https://david-dm.org/sylvaindethier/nvm-test#info=dependencies
[devDeps-image]: https://img.shields.io/david/dev/sylvaindethier/nvm-test.svg?style=flat-square
[devDeps-url]: https://david-dm.org/sylvaindethier/nvm-test#info=devDependencies


[![NPM Package Stats][npm-image]][npm-url]

[![NPM Version][npm-version-image]][npm-url]
[![Dependencies][deps-image]][deps-url]
[![Dev Dependencies][devDeps-image]][devDeps-url]

[![Build Status][build-image]][build-url]
[![Coverage Status][coverage-image]][coverage-url]


## Install
Instal via npm: `npm install --save-dev nvm-test`.

## CLI: (default) `nvm-test-exec` [options] [version]
  * Optional `[version]` argument
A Node version to use, default from the `.nvmrc` file.

  * Option `-r, --run <command>`
A test command to run, default from `run` field of `.nvmrc.test.json` file
or to `npm prune && npm install && npm test`.

  * Option `-d, --dry-run`
Whether or not to dry run the test, default to `false`.

  * Option `-L, --log <level>`
A log level, one of [ `error` | `warn` | `info` | `verbose` | `silly` ],
default to `info`, `silly` when `NODE_ENV=development`.

## CLI: `nvm-test-versions` [options] [versions...]
  * Optional `[versions...]` arguments
Some Node verions to use, default from the one in the `.nvmrc` file.

  * Options are the same as `nvm-test-exec` command
