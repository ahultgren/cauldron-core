'use strict';

var factories = require('../factories');

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
      var e = this.mediator.triggered(factory.event);

      if(e) {
        this.game.addEntity(factories[factory.factory](entity, e));
      }
    });
  }
}

module.exports = Factory;
