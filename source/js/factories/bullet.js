'use strict';

var Entity = require('../entity');
var position = require('../components/position');
var physics = require('../components/physics');
var appearance = require('../components/appearance');
var collision = require('../components/collision');
var factory = require('../components/factory');

module.exports = (source) => {
  var playerFactory = source.getComponent('factory');
  var playerPosition = source.getComponent('position');
  var bullet = Entity.create();

  bullet.addComponent(position(playerPosition));
  bullet.addComponent(physics({
    dx: (playerFactory.data.speed || 5) * Math.cos(playerPosition.a),
    dy: (playerFactory.data.speed || 5) * Math.sin(playerPosition.a),
  }));
  bullet.addComponent(appearance({
    shape: 'arc',
    radius: 5,
  }));
  bullet.addComponent(collision.fromArc({
    radius: 5,
    response: 'die',
  }));
  bullet.addComponent(factory({
    event: `collision:${bullet.id}`,
    factory: 'explosion',
    data: {},
  }));

  return bullet;
};
