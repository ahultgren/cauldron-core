'use strict';

var R = require('ramda');

module.exports = exports = require('../utils/component')({
  name: 'collision',
  type: '',
  aabb: '',
  shape: '',
  path: '',
  paths: '',
  radius: '',
  response: '',
});

exports.fromArc = (data) => {
  var collision = exports(data);
  collision.shape = 'circle';
  collision.aabb = {
    width: data.radius * 2,
    height: data.radius * 2,
    x: -data.radius,
    y: -data.radius,
  };

  return collision;
};

exports.fromPaths = (data) => {
  var collision = exports(data);
  var aabbs = data.paths.map((path) => {
    var xs = path.map(R.prop('0'));
    var ys = path.map(R.prop('1'));

    return {
      width: R.max(xs) - R.min(xs),
      height: R.max(ys) - R.min(ys),
      x: R.min(xs),
      y: R.min(ys),
    };
  });

  collision.shape = 'paths';
  collision.aabbs = aabbs;

  return collision;
};
