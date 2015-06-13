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

  getComponent (name) {
    return this.components[name];
  }

  hasComponent (name) {
    return name in this.components;
  }

  hasComponents (...names) {
    return names.every(name => this.hasComponent(name));
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
