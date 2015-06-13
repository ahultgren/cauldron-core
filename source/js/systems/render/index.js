'use strict';

const SHAPES = {
  arc: require('./arc'),
  line: require('./line'),
  noop: (_, {shape}) => console.error(`Trying to render undefined shape ${shape}`),
};

var canRender = entity => entity.hasComponents('appearance', 'position');

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
      var appearance = entity.getComponent('appearance');

      this.transform(x, y, a);
      (SHAPES[appearance.shape] || SHAPES.noop)(ctx, appearance);
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
