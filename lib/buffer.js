'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = createBuffer;
var nodeMajorVersion = +process.versions.node.match(/^\d+/);

function createBuffer(data) {
  return nodeMajorVersion >= 6 ? Buffer.from(data) : new Buffer(data);
}
