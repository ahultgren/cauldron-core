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

var makeRects = (entity) => {
  var collision = entity.getComponent('collision');
  var aabbs = collision.aabb && [collision.aabb] || collision.aabbs;
  var position = entity.getComponent('position');

  // [TODO] Need to compensate for rotation when using offset?
  return aabbs.map((aabb) => {
    return {
      x: position.x + position.offsetX + (aabb.x || 0),
      y: position.y + position.offsetY + (aabb.y || 0),
      width: aabb.width,
      height: aabb.height,
    };
  });
};

var aabbTest = (entity1, entity2) => {
  var rects1 = makeRects(entity1);
  var rects2 = makeRects(entity2);

  return rects1.filter((rect1) => {
    return rects2.filter((rect2) => {
      if(
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y
      ) {
        return true;
      }
    }).length;
  }).length;
};

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
      if(aabbTest(this.game.map, entity)) {
        console.log('collision', entity.id);
      }
    });
  }
}

module.exports = Collision;
