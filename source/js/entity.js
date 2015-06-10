'use strict';

var uuid = require('uuid');

class Entity {
  static create () {
    return new Entity();
  }

  constructor () {
    this.id = uuid.v4();
    this.components = {};
  }

  addComponent (component) {
    this.components[component.name] = component;
    return this;
  }

  removeComponent (name) {
    if(name.name) {
      name = name.name;
    }

    delete this.components[name];
    return this;
  }
}

module.exports = Entity;
