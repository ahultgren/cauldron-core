'use strict';

module.exports = {
  activate (entity) {
    var health = entity.getComponent('health');

    entity.touch('health');
    health.health = health.maxHealth;
  },
  icon: require('../../../prototypes/icons/health'),
};
