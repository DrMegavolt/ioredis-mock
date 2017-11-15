'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _commands = require('./commands');

var commands = _interopRequireWildcard(_commands);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key];
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
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

function createCommand(pipeline, emulate) {
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

    pipeline.batch.push(function() {
      return emulate.apply(undefined, _toConsumableArray(stringArgs));
    });
    return pipeline;
  };
}

var Pipeline = (function() {
  function Pipeline(redis) {
    var _this = this;

    _classCallCheck(this, Pipeline);

    this.batch = [];

    Object.keys(commands).forEach(function(command) {
      _this[command] = createCommand(_this, commands[command].bind(redis));
    });
  }

  _createClass(Pipeline, [
    {
      key: 'exec',
      value: function exec(callback) {
        var batch = this.batch;
        this.batch = [];
        return _bluebird2.default
          .resolve(
            batch.map(function(cmd) {
              return [null, cmd()];
            })
          )
          .asCallback(callback);
      },
    },
  ]);

  return Pipeline;
})();

exports.default = Pipeline;
