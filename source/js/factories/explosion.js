'use strict';

var Entity = require('../entity');
var position = require('../components/position');
var appearance = require('../components/appearance');

module.exports = (source) => {
  var bulletPosition = source.getComponent('position');
  var explosion = Entity.create();
  explosion.addComponent(position({
    x: bulletPosition.x,
    y: bulletPosition.y,
  }));
  explosion.addComponent(appearance({
    shape: 'arc',
    radius: 20,
    fill: '#f93',
  }));
  return explosion;
};
