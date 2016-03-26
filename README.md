# nvm-test
> Test using differents Node versions with nvm.

Configurable & Extensible `npm test` using differents Node versions with nvm.

[![NPM Package Stats][npm-image]][npm-url]  
[![NPM Version][npm-version-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Code Climate][codeclimate-image]][codeclimate-url]
[![Coverage Status][coverage-image]][coverage-url]  
[![Dependencies][deps-image]][deps-url]
[![Dev Dependencies][devDeps-image]][devDeps-url]

```sh
Usage:
  nvm-test [versions] [options]  Test using Node [versions]
  nvm-test <command>  [options]  Execute the <command> plugin

Options:
  -h, --help       Show help                                          [boolean]
  -i, --install    Specify the install command                         [string]
  -t, --test       Specify the test command                            [string]
  -D, --dry-run    Dry run the test                                   [boolean]
  -L, --log-level  Set the log level                                   [string]
  -v, --version    Show version number                                [boolean]
```

By default it runs 2 (configurable) sub commands as Promises:
  * **install** command: `nvm which $version || nvm install $version`  
  Which silently install the specified `$version` if required.

  * **test** command: `npm test`  
  Which run the configured `test` npm scripts.  
  The command is always preceded by `nvm use $version` in order to make the Node
  `$version` used before the test.

## Install
Prefer global install:  
**`npm install nvm-test -g`**

Or simply use as per project dev dependencies:  
**`npm install --save-dev nvm-test`**

## CLI usage

### nvm-test [versions] [options]
> Test using Node [versions]

Testing `stable` and `v4` Node versions:
```sh
$ nvm-test stable v4 [options]
```

Test using *the* Node version from `.nvmrc` file (default nvm behavior):
```sh
$ nvm-test [options]
```

### nvm-test &lt;command&gt; [options]
> Execute the &lt;command&gt; plugin

Therefore the plugin must be available and installed in your project.  
For example, install the `travis` plugin:
```sh
$ npm install nvm-test-plugin-travis
```
Add it to your `.nvmrc.test.json` project file:
```json
{
  "plugins": ["travis"]
}
```
Then run the test using the Node versions from your `.travis.yml` file:
```sh
$ nvm-test travis [options]
```

## CLI options

### -i, --install
> Specify the install command

```sh
$ nvm-test -i "nvm install $version" [versions]
$ nvm-test --install "nvm install $version" [versions]
```
Default: *`nvm which $version &> /dev/null || nvm install $version`*  
The Node version will be silently installed if needed.

### -t, --test
> Specify the test command

```sh
$ nvm-test -t "npm test" [versions]
$ nvm-test --test "npm test" [versions]
```
Default: *`npm test`*  
Just run the npm `test`

### -D, --dry-run
> Dry run the test  
Just echoes the `test` command option for now

```sh
$ nvm-test -D [versions]
$ nvm-test --dry-run [versions]
```

### -L, --log-level
> Set the log level

```sh
$ nvm-test -L info [versions]
$ nvm-test --log-level info [versions]
```
Default: *`info`*, *`silly`* w/ `NODE_ENV=development`  
Can be one of: `silent`, `error`, `warn`, `info`, `verbose`, or `silly`

### -h, --help
> Show help

```sh
$ nvm-test -h
$ nvm-test --help
```

> Show the &lt;command&gt; plugin help

```sh
$ nvm-test <command> -h
$ nvm-test <command> --help
```

### -v, --version
> Show `nvm-test` version number

```sh
$ nvm-test -v
$ nvm-test --version
```

## JavaScript API usage
  * API documentation on [GitHub][api-url-gh]
  * API documentation on [ESDoc][api-url-esdoc]

[npm-url]: https://www.npmjs.org/package/nvm-test
[npm-image]: https://nodei.co/npm/nvm-test.svg?downloads=true&stars=true
[npm-version-image]: https://img.shields.io/npm/v/nvm-test.svg?style=flat-square
[build-url]: https://travis-ci.org/sylvaindethier/nvm-test
[build-image]: https://img.shields.io/travis/sylvaindethier/nvm-test/master.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/sylvaindethier/nvm-test
[codeclimate-image]: https://img.shields.io/codeclimate/github/sylvaindethier/nvm-test.svg?style=flat-square
[coverage-url]: https://codeclimate.com/github/sylvaindethier/nvm-test/coverage
[coverage-image]: https://img.shields.io/codeclimate/coverage/github/sylvaindethier/nvm-test.svg?style=flat-square
[deps-url]: https://david-dm.org/sylvaindethier/nvm-test#info=dependencies
[deps-image]: https://img.shields.io/david/sylvaindethier/nvm-test.svg?style=flat-square
[devDeps-image]: https://img.shields.io/david/dev/sylvaindethier/nvm-test.svg?style=flat-square
[devDeps-url]: https://david-dm.org/sylvaindethier/nvm-test#info=devDependencies
[api-url-esdoc]: https://doc.esdoc.org/github.com/sylvaindethier/nvm-test
[api-url-gh]: https://sylvaindethier.github.io/nvm-test
