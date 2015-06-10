'use strict';

class Render {
  static create (canvas) {
    return new Render(canvas);
  }

  constructor (canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  tick (entities) {
    //## Mock
    void entities;
    this.ctx.beginPath();
    this.ctx.fillStyle = '#f00';
    this.ctx.arc(0, 0, 10, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

module.exports = Render;
