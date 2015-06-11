'use strict';

var hasAppearance = entity => entity.hasComponent('appearance');
var hasPosition = entity => entity.hasComponent('position');
var canRender = entity => hasAppearance(entity) && hasPosition(entity);

class Render {
  static create (canvas) {
    return new Render(canvas);
  }

  constructor (canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');


    // Set dimensions to css dimensions
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;

    window.addEventListener('resize', function () {
      canvas.width = canvas.scrollWidth;
      canvas.height = canvas.scrollHeight;
    }, false);
  }

  tick (entities) {
    var ctx = this.ctx;

    this.transform(0, 0, 0);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    entities.forEach((entity) => {
      if(!canRender(entity)) {
        return;
      }

      var {x, y, a} = entity.getComponent('position');
      var {color, shape, radius} = entity.getComponent('appearance');

      this.transform(x, y, a);

      // [TODO] Pretty this up
      switch (shape) {
        case 'line':
          ctx.strokeStyle = color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(100, 100);
          ctx.stroke();
          break;

        case 'circle':
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.arc(0, 0, radius, 0, Math.PI * 2);
          ctx.fill();
          break;
      }
    });
  }

  transform (x, y, a) {
    var offsetX = x || 0;
    var offsetY = y || 0;
    var offsetA = a || 0;
    var angleSine = 0;
    var angleCosine = 1;

    if(offsetA) {
      angleSine = Math.sin(offsetA);
      angleCosine = Math.cos(offsetA);
    }

    this.ctx.setTransform(
      angleCosine, angleSine,
      -angleSine, angleCosine,
      offsetX, offsetY
    );
  }
}

module.exports = Render;
