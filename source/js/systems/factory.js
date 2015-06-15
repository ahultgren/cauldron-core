'use strict';

var Entity = require('../entity');
var position = require('../components/position');
var physics = require('../components/physics');
var appearance = require('../components/appearance');

class Factory {
  static create () {
    return new Factory();
  }

  constructor () {

  }

  tick (entities) {
    entities.forEach((entity) => {
      if(!entity.hasComponent('factory')) {
        return;
      }

      var factory = entity.getComponent('factory');

      if(this.mediator.triggered(factory.event)) {
        switch(factory.factory) {
          case 'bullet':
            var p = entity.getComponent('position');

            var bullet = Entity.create();
            bullet.addComponent(position(p));
            bullet.addComponent(physics({
              dx: 5 * Math.cos(p.a),
              dy: 5 * Math.sin(p.a),
            }));
            bullet.addComponent(appearance({
              shape: 'arc',
              radius: 5,
            }));
            this.game.addEntity(bullet);
            break;
        }
      }
    });
  }
}

module.exports = Factory;
