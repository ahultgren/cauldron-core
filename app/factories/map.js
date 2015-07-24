'use strict';

var maps = require('../maps');
var Entity = require('../entity');
var {
  position, cameraBounds, appearance, collision
} = require('../components');

module.exports = (name) => {
  var map = Entity.create();
  var mapData = maps[name];

  map.addComponent(position());
  map.addComponent(cameraBounds.fromPaths(mapData.paths));
  map.addComponent(appearance({
    shape: 'polygons',
    fill: 'transparent',
    stroke: mapData.color,
    paths: mapData.paths,
  }));
  map.addComponent(collision.fromPaths({
    paths: mapData.paths,
    type: 'map',
  }));

  return map;
};
