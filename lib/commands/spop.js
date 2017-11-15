'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.spop = spop;

var _lodash = require('lodash');

var _es6Set = require('es6-set');

var _es6Set2 = _interopRequireDefault(_es6Set);

var _arrayFrom = require('array-from');

var _arrayFrom2 = _interopRequireDefault(_arrayFrom);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function spop(key, count) {
  if (this.data.has(key) && !(this.data.get(key) instanceof _es6Set2.default)) {
    throw new Error('Key ' + key + ' does not contain a set');
  }

  var set = this.data.get(key) || new _es6Set2.default();
  var list = (0, _arrayFrom2.default)(set);
  var total = set.size;

  if (total === 0) {
    return null;
  }

  var shouldReturnArray = count !== undefined;
  var max = shouldReturnArray ? count : 1;

  if (total <= max) {
    this.data.set(key, new _es6Set2.default());
    return list;
  }

  var items = [];
  var results = 0;
  while (results < max) {
    var item = list.splice((0, _lodash.random)(0, list.length - 1), 1);

    results += 1;
    items.push(item);
  }
  this.data.set(key, new _es6Set2.default(list));

  return shouldReturnArray ? items : items[0];
}
