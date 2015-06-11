'use strict';

const KEYS = {
  w: 87,
  a: 65,
  s: 83,
  d: 68
};

var controllable = entity => entity.hasComponent('keyboardControlled') && entity.hasComponent('position');

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

      var position = entity.getComponent('position');

      if(this.isPressed[KEYS.a]) {
        position.x--;
      }
      if(this.isPressed[KEYS.d]) {
        position.x++;
      }
      if(this.isPressed[KEYS.w]) {
        position.y--;
      }
      if(this.isPressed[KEYS.s]) {
        position.y++;
      }
    });
  }
}

module.exports = KeyboardInput;
