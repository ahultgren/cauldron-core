'use strict';

var find = require('../utils/findMap');

class Camera {
  static create (canvas) {
    return new Camera(canvas);
  }

  constructor (canvas) {
    this.canvas = canvas;
    this.x = 0;
    this.y = 0;
  }

  tick (entities) {
    var target = find(entity => entity.hasComponent('cameraTarget'), entities);

    if(!target) {
      return;
    }

    var targetPos = target.getComponent('position');

    this.x = this.canvas.width / 2 - targetPos.x;
    this.y = this.canvas.height / 2 - targetPos.y;
  }
}

module.exports = Camera;
