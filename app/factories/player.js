'use strict';

var Entity = require('../entity');
var positionComponent = require('../components/position');
var physicsComponent = require('../components/physics');
var appearanceComponent = require('../components/appearance');
var collisionComponent = require('../components/collision');
var scoreComponent = require('../components/score');
var healthComponent = require('../components/health');

module.exports = ({
  position = {
    x: 200,
    y: 50,
  },
  appearance = {
    shape: 'arc',
    radius: 8,
    gap: Math.PI * 0.25,
    segment: true,
  },
  physics = {
    acceleration: 2.0,
    friction: 0.65,
  },
  collision = {
    type: 'player',
    collidesWith: ['map', 'bullet', 'object', 'obstacle'],
    radius: 8,
  },
  score = {},
  health = {
    health: 10,
    maxHealth: 10,
  },
} = {}) => {
  var player = Entity.create();

  player.addComponent(positionComponent(position));
  player.addComponent(appearanceComponent(appearance));
  player.addComponent(physicsComponent(physics));
  player.addComponent(collisionComponent.fromArc(collision));
  player.addComponent(scoreComponent(score));
  player.addComponent(healthComponent(health));

  return player;
};
