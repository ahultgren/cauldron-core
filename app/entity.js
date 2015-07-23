'use strict';

var uuid = require('uuid');

class Entity {
  static create () {
    return new Entity();
  }

  static fromData ({id, components}) {
    var entity = Entity.create();

    if(id) {
      entity.id = id;
    }

    Object.keys(components).forEach((name) => {
      entity.addComponent(components[name]);
    });
    return entity;
  }

  constructor () {
    this.id = uuid.v4();
    this.components = {};
  }

  addComponent (component) {
    this.components[component.name] = component;
    return this;
  }

  setComponents (components) {
    Object.keys(components).forEach((name) => {
      this.components[name] = components[name];
    });
    return this;
  }

  getComponent (name) {
    return this.components[name];
  }

  serialize () {
    return {
      id: this.id,
      components: this.components,
    };
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
