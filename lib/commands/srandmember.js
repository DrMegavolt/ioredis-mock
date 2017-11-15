'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.srandmember = srandmember;

var _lodash = require('lodash');

function srandmember(key, count) {
  if (this.data.has(key) && !(this.data.get(key) instanceof Array)) {
    throw new Error('Key ' + key + ' does not contain a set');
  }

  var list = this.data.get(key) || [];
  var total = list.length;

  if (total === 0) {
    return null;
  }

  var shouldReturnArray = count !== undefined;
  var max = shouldReturnArray ? Math.abs(count) : 1;
  var skipDuplicates = shouldReturnArray && count > -1;

  if (total <= max && skipDuplicates) {
    return list;
  }

  var items = [];
  var results = 0;
  while (results < max) {
    var item = list[(0, _lodash.random)(0, total - 1)];

    if (!skipDuplicates || items.indexOf(item) === -1) {
      results += 1;
      items.push(item);
    }
  }

  return shouldReturnArray ? items : items[0];
}
