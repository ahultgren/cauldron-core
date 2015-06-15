'use strict';

class MouseInput {
  static create () {
    return new MouseInput();
  }

  constructor () {
    this.mouseX = 0;
    this.mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.pageX;
      this.mouseY = e.pageY;
    }, false);

    window.addEventListener('mousedown', (e) => {
      this.mediator.trigger('click', {
        x: e.pageX,
        y: e.pageY,
      });
    }, false);
  }

  tick (entities) {
    entities.forEach((entity) => {
      if(!entity.hasComponents('mouseControlled', 'position')) {
        return;
      }

      var position = entity.getComponent('position');

      position.a = Math.atan2(this.mouseY - position.y, this.mouseX - position.x);
    });
  }
}

module.exports = MouseInput;
