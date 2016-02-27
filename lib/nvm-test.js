'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _utils = require('./utils');

var _package = require('../package');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const file = resolve(__dirname, '../srcipts/nvm-test.sh')

// make program loggable
(0, _utils.loggable)(_commander2.default, 'silly').version(_package.version).command('exec [versions...]', 'execute test for a list of Node versions', { isDefault: true }).parse(process.argv);

// output help if no arguments
if (!_commander2.default.args.length) _commander2.default.help();

(0, _utils.logInit)(_commander2.default);
_utils.log.silly('command', 'options', _commander2.default.opts());