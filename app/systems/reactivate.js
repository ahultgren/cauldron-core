'use strict';

var Entity = require('../entity');
var filter = require('../utils/filter');
var deactivatable = filter(entity => entity.hasComponent('reactivate'));

class Reactivate {
  static create () {
    return new Reactivate();
  }

  constructor () {
    this.disabled = [];
  }

  tick (entities) {
    this.deactivate(deactivatable(entities));
    this.reactivate();
  }

  deactivate (entities) {
    entities.forEach((entity) => {
      var {event, reactivateAfter} = entity.getComponent('reactivate');

      this.mediator.triggered(`${event}:${entity.id}`).forEach(() => {
        this.disabled.push({reactivateAfter, entity: entity.serialize()});
        this.game.removeEntity(entity.id);
      });
    });
  }

  reactivate () {
    this.disabled.forEach((data, i) => {
      if(data.reactivateAfter-- <= 0) {
        this.disabled.splice(i, 1);
        this.game.addEntity(Entity.fromData(data.entity));
      }
    });
  }
}

module.exports = Reactivate;
