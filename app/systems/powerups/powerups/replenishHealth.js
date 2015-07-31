'use strict';

module.exports = (entity) => {
  var health = entity.getComponent('health');

  entity.touch('health');
  health.health = health.maxHealth;
};
