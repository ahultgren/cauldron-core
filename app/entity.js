'use strict';

var uuid = require('uuid');
var R = require('ramda');

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
    this.dirty = {};
  }

  addComponent (component) {
    this.components[component.name] = component;
    this.touch(component.name);
    return this;
  }

  setComponents (components) {
    Object.keys(components).forEach((name) => {
      this.components[name] = components[name];
      this.touch(name);
    });
    return this;
  }

  getComponent (name) {
    return this.components[name];
  }

  serialize () {
    return {
      id: this.id,
      components: R.merge({}, this.components),
    };
  }

  serializeDirty () {
    return {
      id: this.id,
      components: Object.keys(this.dirty || {}).reduce((components, name) => {
        components[name] = this.components[name];
        return components;
      }, {}),
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

  clean () {
    this.dirty = false;
  }

  touch (component) {
    if(!this.dirty) {
      this.dirty = {};
    }

    this.dirty[component] = true;
  }
}

module.exports = Entity;
