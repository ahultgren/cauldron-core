'use strict';

const KEYS = {
  w: 87,
  a: 65,
  s: 83,
  d: 68
};

var controllable = entity => entity.hasComponents('keyboardControlled', 'physics');

class KeyboardInput {
  static create () {
    return new KeyboardInput();
  }

  constructor () {
    this.isPressed = {};

    window.addEventListener('keydown', (e) => {
      this.isPressed[e.which] = true;
    }, false);

    window.addEventListener('keyup', (e) => {
      this.isPressed[e.which] = false;
    }, false);
  }

  tick (entities) {
    entities.forEach((entity) => {
      if(!controllable(entity)) {
        return;
      }

      var physics = entity.getComponent('physics');

      if(this.isPressed[KEYS.a]) {
        physics.dx -= physics.acceleration;
      }
      if(this.isPressed[KEYS.d]) {
        physics.dx += physics.acceleration;
      }
      if(this.isPressed[KEYS.w]) {
        physics.dy -= physics.acceleration;
      }
      if(this.isPressed[KEYS.s]) {
        physics.dy += physics.acceleration;
      }
    });
  }
}

module.exports = KeyboardInput;
