'use strict';

var movable = entity => entity.hasComponents('position', 'physics');

class Movement {
  static create (canvas) {
    return new Movement(canvas);
  }

  constructor () {
  }

  tick (entities) {
    entities.forEach((entity) => {
      if(!movable(entity)) {
        return;
      }

      var position = entity.getComponent('position');
      var physics = entity.getComponent('physics');

      position.x += physics.dx;
      position.y += physics.dy;

      physics.dx *= physics.friction;
      physics.dy *= physics.friction;
    });
  }
}

module.exports = Movement;
