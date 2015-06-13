'use strict';

class PointerFollower {
  static create () {
    return new PointerFollower();
  }

  constructor () {
    this.mouseX = 0;
    this.mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.pageX;
      this.mouseY = e.pageY;
    }, false);
  }

  tick (entities) {
    entities.forEach((entity) => {
      if(!entity.hasComponents('pointerFollower', 'position')) {
        return;
      }

      var position = entity.getComponent('position');

      position.x = this.mouseX;
      position.y = this.mouseY;
    });
  }
}

module.exports = PointerFollower;
