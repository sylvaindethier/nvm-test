'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _utils.loggable)(_commander2.default, 'silly').version('0.0.0').description('Execute test for a list of Node versions').arguments('[versions...]').parse(process.argv);

// output help if no arguments
if (!_commander2.default.args.length) _commander2.default.help();

(0, _utils.logInit)(_commander2.default);
_utils.log.silly('command', 'options', _commander2.default.opts());

// get the [versions...] arguments
var versions = _commander2.default.args;
_utils.log.verbose('command', 'versions', versions);

// execute functions
var options = { cwd: process.cwd(), env: process.env, shell: process.env.SHELL };
function exec(command) {
  return new _promise2.default(function (resolve, reject) {
    _child_process2.default.exec(command, options, function (err, stdout, stderr) {
      if (err) reject(stderr.trim(), err);else resolve(stdout.trim());
    });
  });
}
var nvm_source = 'source ' + process.env.NVM_DIR + '/nvm.sh';
function nvm_exec(command) {
  return exec(nvm_source + '; ' + command);
}

// check nvm version
_utils.log.verbose('command', 'check nvm');
nvm_exec('nvm --version').catch(function (stderr) {
  _utils.log.error('nvm', stderr);
  _utils.log.error('nvm', 'Please install nvm from https://github.com/creationix/nvm#install-script');
  process.exit(1);
}).then(function (stdout) {
  _utils.log.info('nvm', 'Your nvm version is', stdout);
}).then(function () {
  // run for each versions
  versions.forEach(function (version) {
    run(version).catch(function (stderr) {
      _utils.log.error('run', stderr);
    });
  });
});

function run(version) {
  // use or install Node version
  _utils.log.verbose('run', 'Node version', version);
  return nvm_exec('nvm use ' + version + ' || nvm install ' + version).then(function () {
    // remove extraneous package, install, & test
    var command = 'npm prune && npm install && npm test';

    _utils.log.verbose('run', 'command: ', command);
    return nvm_exec(command);
  });
}