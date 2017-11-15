'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = command;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}

function command(emulate) {
  return function() {
    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    var lastArgIndex = args.length - 1;
    var callback = args[lastArgIndex];
    if (typeof callback !== 'function') {
      callback = undefined;
    } else {
      // eslint-disable-next-line no-param-reassign
      args.length = lastArgIndex;
    }

    // transform non-buffer arguments to strings to simulate real ioredis behavior
    var stringArgs = args.map(function(arg) {
      return arg instanceof Buffer ? arg : arg.toString();
    });

    return new _bluebird2.default(function(resolve) {
      return resolve(emulate.apply(undefined, _toConsumableArray(stringArgs)));
    }).asCallback(callback);
  };
}
