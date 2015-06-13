'use strict';

module.exports = (ctx, {offsetX, offsetY}, {fill, stroke, radius, gap = 0, segment}) => {
  ctx.beginPath();
  ctx.arc(offsetX, offsetY, radius, gap, Math.PI * 2 - gap, false);

  if(segment) {
    ctx.lineTo(offsetX, offsetY);
  }

  ctx.fillStyle = fill;
  ctx.fill();

  if(stroke) {
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
};
