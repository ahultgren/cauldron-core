'use strict';

var Entity = require('../entity.js');
var components = require('../components');
var powerups = require('../systems/powerups/powerups');

module.exports = ({
  position,
  powerup,
  reactivateAfter,
}) => {
  var entity = Entity.create();

  entity.addComponent(components.physics());
  entity.addComponent(components.position(position));
  entity.addComponent(components.powerup({
    type: powerup,
  }));
  entity.addComponent(components.reactivate({
    event: 'collision',
    reactivateAfter,
  }));
  entity.addComponent(components.collision.fromArc({
    type: 'object',
    radius: 15,
  }));
  entity.addComponent(components.appearance({
    shapes: [{
      shape: 'arc',
      radius: 15,
      fill: 'transparent',
      stroke: '#0f0',
    },
    powerups[powerup].icon
  ]}));

  return entity;
};
