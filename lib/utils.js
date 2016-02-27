'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = undefined;
exports.loggable = loggable;
exports.logInit = logInit;

var _commander = require('commander');

var _npmlog = require('npmlog');

var _npmlog2 = _interopRequireDefault(_npmlog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function check(program) {
  var isCommand = program instanceof _commander.Command;
  if (!isCommand) throw new TypeError('Invalid program type');
}

exports.log = _npmlog2.default;
function loggable(program) {
  var logLevel = arguments.length <= 1 || arguments[1] === undefined ? 'info' : arguments[1];

  check(program);

  // add log-level
  return program.option('-l, --log-level <level>', 'set the log level [silly | verbose | info | warn | error]', /^(silly|verbose|info|warn|error)$/i, logLevel);
}

function logInit(program) {
  check(program);

  // set log heading & level
  _npmlog2.default.heading = program.name();
  if (program.logLevel) _npmlog2.default.level = program.logLevel;
  return program;
}