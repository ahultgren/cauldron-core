'use strict';

var Entity = require('../entity.js');
var components = require('../components');

module.exports = ({
  position,
  powerup,
  reactivate,
  collision,
  appearance,
}) => {
  var entity = Entity.create();

  entity.addComponent(components.physics());
  entity.addComponent(components.position(position));
  entity.addComponent(components.powerup(powerup));
  entity.addComponent(components.reactivate(reactivate));
  entity.addComponent(components.collision.fromArc(collision));
  entity.addComponent(components.appearance(appearance));

  return entity;
};
