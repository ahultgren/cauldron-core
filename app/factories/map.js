'use strict';

var maps = require('../maps');
var Entity = require('../entity');
var {
  position, cameraBounds, appearance, collision
} = require('../components');

module.exports = (name) => {
  var map = Entity.create();
  var mapPaths = maps[name];

  map.addComponent(position());
  map.addComponent(cameraBounds.fromPaths(mapPaths));
  map.addComponent(appearance({
    shape: 'polygons',
    fill: 'transparent',
    stroke: '#f00',
    paths: mapPaths,
  }));
  map.addComponent(collision.fromPaths({
    paths: mapPaths,
    type: 'map',
  }));

  return map;
};
