'use strict';

module.exports = (entity) => {
  var collision = entity.getComponent('collision');

  if(collision.collidesWith.indexOf('map') > -1) {
    entity.touch('collision');
    collision.collidesWith.splice(collision.collidesWith.indexOf('map'), 1);

    if(collision.notCollidesWith) {
      collision.notCollidesWith.push('map');
    }
    else {
      collision.notCollidesWith = ['map'];
    }
  }

  setTimeout(() => {
    collision.notCollidesWith.splice(collision.notCollidesWith.indexOf('map'), 1);
    entity.touch('collision');

    // Prevent overriding multiple powerups
    if(collision.notCollidesWith.indexOf('map') === -1) {
      collision.collidesWith.push('map');
    }
  }, 10000);
};
