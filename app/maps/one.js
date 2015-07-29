'use strict';

var R = require('ramda');
var replenishHealth = require('../prototypes/powerups/replenishHealth');

module.exports = {
  spawnPoints: [
    [100, 100],
    [900, 100],
    [900, 900],
    [100, 900],
  ],
  powerupPoints: [
    R.merge({
      position: {
        x: 150,
        y: 500,
      }
    }, replenishHealth),
    R.merge({
      position: {
        x: 850,
        y: 500,
      },
    }, replenishHealth)
  ],
  color: '#f90',
  paths: [
    // Edge
    [[0, 0], [1000, 0]],
    [[1000, 0], [1000, 1000]],
    [[1000, 1000], [0, 1000]],
    [[0, 1000], [0, 0]],

    [[400, 400], [400, 500], [500, 500], [500, 400], [400, 400]],
    [[200, 300], [200, 800]],
    [[200, 800], [800, 800]],
    [[800, 800], [800, 200]],
    [[800, 200], [300, 200]],
  ]
};
