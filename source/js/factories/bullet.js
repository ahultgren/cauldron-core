'use strict';

var Entity = require('../entity');
var position = require('../components/position');
var physics = require('../components/physics');
var appearance = require('../components/appearance');
var collision = require('../components/collision');

module.exports = (source) => {
  var factory = source.getComponent('factory');
  var p = source.getComponent('position');
  var bullet = Entity.create();

  bullet.addComponent(position(p));
  bullet.addComponent(physics({
    dx: (factory.data.speed || 5) * Math.cos(p.a),
    dy: (factory.data.speed || 5) * Math.sin(p.a),
  }));
  bullet.addComponent(appearance({
    shape: 'arc',
    radius: 5,
  }));
  bullet.addComponent(collision.fromArc({
    radius: 5,
  }));

  return bullet;
};
