# nvm-test
> Test using different Node versions with nvm.

Configurable & Extensible `npm test` using different Node versions with nvm.

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


[![NPM Package Stats][npm-image]][npm-url]

[![NPM Version][npm-version-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Code Climate][codeclimate-image]][codeclimate-url]
[![Coverage Status][coverage-image]][coverage-url]

[![Dependencies][deps-image]][deps-url]
[![Dev Dependencies][devDeps-image]][devDeps-url]


```sh
Usage:
  nvm-test [versions] [options]  Test using some Node versions
  nvm-test <command>  [options]  Execute external <command>

Options:
  -h, --help       Show help                                           [boolean]
  -i, --install    Specify the install command                          [string]
  -t, --test       Specify the test command                             [string]
  -D, --dry-run    Dry run the test                                    [boolean]
  -L, --log-level  Set the log level                                    [string]
  -v, --version    Show version number                                 [boolean]
```

## Install
Prefer global install:
**`npm install nvm-test -g`**

Or simply use as per project dev dependencies:
**`npm install --save-dev nvm-test`**

## Usage:
  * **nvm-test [versions] [options]**

Test using some Node versions, `stable` and `v4` here:
**`nvm-test stable v4`**

Test using Node version from `.nvmrc` file:
**`nvm-test`**

  * **nvm-test &lt;command&gt; [options]**

Execute external &lt;command&gt;.
Which therefore must be available and installed in your project.

For example install the Travis `nvm-test` command:
**`npm install nvm-test-command-travis`**

Add the external command in your `.nvmrc.test.js` file:
```json
{
  "commands": ["travis"]
}
```

And run the test using Node versions specified in your `.travis.yml` file:
**`nvm-test travis`**

## Options:
  * **-h, --help**

Show help:
**`nvm-test -h`** or **`nvm-test --help`**

Show external &lt;command&gt; help:
**`nvm-test <command> -h`** or **`nvm-test <command> --help`**

> Note about the `install` and `test` options: any `$version` in the command
string is replaced by the specified version.

  * **-i, --install**

Specify the install command:
**`nvm-test -i "nvm install $version"`** or **`nvm-test --install "nvm install $version"`**

Default: *`nvm which $version &> /dev/null || nvm install $version`*

The Node version to be tested will be installed if required.

  * **-t, --test**

Specify the test command:
**`nvm-test -t "npm test"`** or **`nvm-test --test ""`**

Default: *`nvm use $version && ( npm test )`*

  * **-D, --dry-run**

Dry run the test (just echo the `test` command option):
**`nvm-test -D`** or **`nvm-test --dry-run`**

  * **-L, --log-level**

Set the log level:
**`nvm-test -L info`** or **`nvm-test --log-level info`**

Can be one of: `silent`, `error`, `warn`, `info`, `verbose`, or `silly`

Default: *`info`*, *`silly`* w/ `NODE_ENV=development`

  * **-v, --version**

Show `nvm-test` version number:
**`nvm-test -v`** or **`nvm-test --version`**
