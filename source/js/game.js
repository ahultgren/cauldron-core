'use strict';

var Mediator = require('./systems/mediator');

class Game {
  static create () {
    return new Game();
  }

  constructor () {
    this.playing = false;
    this.entities = new Map();
    this.systems = [];
    this.mediator = Mediator.create();
  }

  addEntity (entity) {
    this.entities.set(entity.id, entity);
    return this;
  }

  removeEntity (id) {
    this.entities.get(id).remove = true;
    return this;
  }

  addSystem (system) {
    this.systems.push(system);
    system.mediator = this.mediator;
    system.game = this;
  }

  loop () {
    if(!this.playing) {
      return;
    }

    window.requestAnimationFrame(() => this.loop());
    this.entities.forEach((entity) => {
      if(entity.remove) {
        this.entities.delete(entity.id);
      }
    });
    this.systems.forEach(system => system.tick(this.entities));
  }

  setMap (map) {
    this.map = map;
  }

  start () {
    // Mediator last
    this.addSystem(this.mediator);
    this.playing = true;
    this.loop();
    return this;
  }

  stop () {
    this.playing = false;
    return this;
  }
}

module.exports = Game;
