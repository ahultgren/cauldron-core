'use strict';

var Entity = require('../entity.js');
var {powerup, position, physics, collision, appearance} = require('../components');

module.exports = ({type, respawnAfter, coords: [x, y]}) => {
  var entity = Entity.create();

  entity.addComponent(position({x, y}));
  entity.addComponent(physics());
  entity.addComponent(powerup({type, respawnAfter}));
  entity.addComponent(collision.fromArc({
    radius: 15,
  }));

  // [TODO] Icons
  entity.addComponent(appearance({
    shape: 'arc',
    radius: 15,
    fill: 'transparent',
    stroke: '#0f0'
  }));

  return entity;
};
