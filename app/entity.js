'use strict';

var uuid = require('uuid');
var R = require('ramda');

class Entity {
  static create () {
    return new Entity();
  }

  static fromData (data) {
    var entity = Entity.create();

    if(data.id) {
      entity.id = data.id;
      delete data.id;
    }

    Object.keys(data).forEach((name) => {
      entity.addComponent(data[name]);
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

  getComponent (name) {
    return this.components[name];
  }

  serialize () {
    // [TODO] Components should be a property?
    return R.merge({
      id: this.id,
    }, this.components);
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
