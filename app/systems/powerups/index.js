'use strict';

var filter = require('../../utils/filter');
var powerups = require('./powerups');

var isPowerups = filter(entity => entity.hasComponent('powerup'));

class Powerups {

  static create () {
    return new Powerups();
  }

  constructor () {

  }

  tick (entities) {
    isPowerups(entities)
    .forEach((entity) => {
      this.mediator.triggered(`collision:${entity.id}`)
      .forEach(({hitBy}) => {
        var hitByEntity = this.game.getEntity(hitBy);

        this.applyPowerup(entity.getComponent('powerup'), hitByEntity);
      });
    });
  }

  applyPowerup ({type}, entity) {
    var powerup = powerups[type];

    if(!powerup) {
      console.error(`Unknown powerup ${type}`);
      return;
    }

    powerup(entity);
  }

}

module.exports = Powerups;