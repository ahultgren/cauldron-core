'use strict';

var isCollidable = entity => entity.hasComponents('collision', 'position');
var isMoving = entity => entity.hasComponents('collision', 'position', 'physics');

var filterSet = (fn, set) => {
  var result = [];

  set.forEach((item) => {
    if(fn(item)) {
      result.push(item);
    }
  });

  return result;
};

var makeRect = (entity) => {
  var position = entity.getComponent('position');
  var {x, y, width, height} = entity.getComponent('collision').aabb;

  // [TODO] Need to compensate for rotation when using offset?
  return {
    id: entity.id,
    x: position.x + position.offsetX + (x || 0),
    y: position.y + position.offsetY + (y || 0),
    width,
    height,
  };
};

var makeRects = (entity) => {
  var collision = entity.getComponent('collision');
  var position = entity.getComponent('position');

  // [TODO] Need to compensate for rotation when using offset?
  return collision.aabbs.map(({x, y, width, height}) => {
    return {
      id: entity.id,
      x: position.x + position.offsetX + (x || 0),
      y: position.y + position.offsetY + (y || 0),
      width,
      height,
    };
  });
};

var aabbTest = (rect1, rect2) => {
  return rect1.x < rect2.x + rect2.width
    && rect1.x + rect1.width > rect2.x
    && rect1.y < rect2.y + rect2.height
    && rect1.height + rect1.y > rect2.y;
};

var mapAabbTest = (map, entity) => {
  var rectsMap = makeRects(map);
  var rect2 = makeRect(entity);

  return rectsMap.filter(rect1 =>
    aabbTest(rect1, rect2)).length;
};

/* Public API
============================================================================= */

class Collision {
  static create () {
    return new Collision();
  }

  constructor () {
  }

  tick (entities) {
    var all = filterSet(isCollidable, entities);
    var moving = filterSet(isMoving, all);
    this.mapTests(moving);
    void all;
  }

  mapTests (entities) {
    entities.forEach((entity) => {
      if(mapAabbTest(this.game.map, entity)) {
        console.log('collision', entity.id);
        this.mediator.emit(`collision:${entity.id}`, {});
        if(entity.getComponent('collision').response === 'die') {
          this.game.removeEntity(entity.id);
        }
      }
    });
  }
}

module.exports = Collision;
