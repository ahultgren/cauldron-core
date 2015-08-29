'use strict';

var R = require('ramda');
var filter = require('../../utils/filter');
var powerups = require('./powerups');

var isPowerups = filter(entity => entity.hasComponent('powerup'));
var isPowerupTargets = filter(entity => entity.hasComponent('powerupTarget'));

class Powerups {

  static create () {
    return new Powerups();
  }

  constructor () {

  }

  tick (entities) {
    this.activate(entities);
    this.deactivate(entities);
  }

  activate (entities) {
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
    var powerupTarget = entity.getComponent('powerupTarget');

    if(!powerupTarget) {
      return;
    }
    if(!powerup) {
      console.error(`Unknown powerup ${type}`);
      return;
    }

    powerup.activate(entity);

    if(powerup.duration) {
      entity.touch('powerupTarget');
      powerupTarget.powerups.push({
        type,
        duration: powerup.duration,
      });
    }
  }

  deactivate (entities) {
    isPowerupTargets(entities).forEach((entity) => {
      var powerupTarget = entity.getComponent('powerupTarget');

      powerupTarget.powerups.forEach((powerup, i) => {
        var hasAnotherPowerup;

        entity.touch('powerupTarget');
        if((powerup.duration--) <= 0) {
          powerupTarget.powerups.splice(i, 1);
          hasAnotherPowerup = R.findIndex(p => p.type === powerup.type, powerupTarget.powerups) !== -1;

          // Deactivate if additive or no other powerup of the same type is active
          if(powerups[powerup.type].isAdditive || !hasAnotherPowerup) {
            powerups[powerup.type].deactivate(entity);
          }
        }
      });
    });
  }

}

module.exports = Powerups;
