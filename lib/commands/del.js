'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.del = del;
function del() {
  var _this = this;

  for (
    var _len = arguments.length, keys = Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    keys[_key] = arguments[_key];
  }

  keys.forEach(function(key) {
    _this.data.delete(key);
  });
  return keys.length;
}
