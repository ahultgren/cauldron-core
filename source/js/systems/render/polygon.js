'use strict';

module.exports = (ctx, {offsetX, offsetY}, {fill, stroke, path}) => {
  ctx.beginPath();
  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;

  ctx.moveTo(offsetX, offsetY);

  path.forEach(([x, y]) => {
    ctx.lineTo(x, y);
  });

  ctx.stroke();
  ctx.fill();
};
