'use strict';

var components = require('../components');
var Entity = require('../entity');

var {
  position, physics, appearance, collision, factory, owner, damage,
} = components;

module.exports = (source) => {
  var playerFactory = source.getComponent('factory');
  var playerPosition = source.getComponent('position');
  var playerId = source.getComponent('parent').parentId;
  var bullet = Entity.create();
  var bulletPosition = position(playerPosition);
  var radius = 5;

  // [TODO] Make relative to player size and bullet size
  bulletPosition.x += (radius + 10 + 1) * Math.cos(playerPosition.a);
  bulletPosition.y += (radius + 10 + 1) * Math.sin(playerPosition.a);

  bullet.addComponent(bulletPosition);
  bullet.addComponent(physics({
    dx: (playerFactory.data.speed || 5) * Math.cos(playerPosition.a),
    dy: (playerFactory.data.speed || 5) * Math.sin(playerPosition.a),
  }));
  bullet.addComponent(appearance({
    shape: 'arc',
    radius,
  }));
  bullet.addComponent(collision.fromArc({
    type: 'bullet',
    collidesWith: ['map', 'player', 'obstacle'],
    response: 'die',
    radius,
  }));
  bullet.addComponent(factory({
    event: `collision:${bullet.id}`,
    factory: 'explosion',
    data: {},
  }));
  bullet.addComponent(owner({
    ownerId: playerId,
  }));
  bullet.addComponent(damage({
    damage: playerFactory.data.damage,
  }));

  return bullet;
};
