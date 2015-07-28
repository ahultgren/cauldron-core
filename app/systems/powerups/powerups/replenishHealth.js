'use strict';

module.exports = (entity) => {
  var health = entity.getComponent('health');

  health.health = health.maxHealth;
};
