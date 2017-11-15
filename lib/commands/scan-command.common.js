'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.scanHelper = scanHelper;
function pattern(str) {
  var string = str.replace(/([+{($^|.\\])/g, '\\$1');
  string = string.replace(/(^|[^\\])([*?])/g, '$1.$2');
  string = '^' + string + '$';

  var p = new RegExp(string);
  return p.test.bind(p);
}

function scanHelper(
  allKeys,
  size,
  cursorStart,
  opt1Name,
  opt1val,
  opt2Name,
  opt2val
) {
  var cursor = parseInt(cursorStart, 10);
  if (Number.isNaN(cursor)) throw new Error('Cursor must be integer');

  var count = 10;
  var matchPattern = null;

  var opt1 = (opt1Name || '').toUpperCase();
  var opt2 = (opt2Name || '').toUpperCase();
  if (opt1 === 'MATCH') {
    matchPattern = pattern(opt1val);
    if (opt2 === 'COUNT') count = parseInt(opt2val, 10);
    else if (opt2) {
      throw new Error('BAD Syntax');
    }
  } else if (opt1 === 'COUNT') {
    if (opt2) {
      throw new Error('BAD Syntax');
    }
    count = parseInt(opt1val, 10);
  } else if (opt1) {
    throw new Error('Uknown option ' + opt1);
  }

  if (Number.isNaN(count)) throw new Error('count must be integer');

  var nextCursor = cursor + count;
  var keys = allKeys.slice(cursor, nextCursor);

  // Apply MATCH filtering _after_ getting number of keys
  if (matchPattern) {
    var i = 0;
    while (i < keys.length) {
      if (!matchPattern(keys[i])) keys.splice(i, size);
      else i += size;
    }
  }

  // Return 0 when iteration is complete.
  if (nextCursor >= allKeys.length) nextCursor = 0;

  return [nextCursor, keys];
}
