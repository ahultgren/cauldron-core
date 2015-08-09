'use strict';

var Entity = require('../entity.js');
var components = require('../components');
var icons = {
  health: require('../prototypes/icons/health'),
  ghost: require('../prototypes/icons/ghost'),
};

module.exports = ({
  position,
  powerup,
  reactivateAfter,
  icon,
}) => {
  var entity = Entity.create();

  entity.addComponent(components.physics());
  entity.addComponent(components.position(position));
  entity.addComponent(components.powerup({
    type: powerup,
    icon,
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
    icons[icon]]
  }));

  return entity;
};
