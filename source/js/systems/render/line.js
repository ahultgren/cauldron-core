'use strict';

module.exports = (ctx, {offsetX, offsetY}, {fill}) => {
  ctx.strokeStyle = fill;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(offsetX, offsetY);
  ctx.lineTo(100, 100);
  ctx.stroke();
};
