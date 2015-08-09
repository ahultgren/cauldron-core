'use strict';

module.exports = {
  spawnPoints: [
    [100, 100],
    [900, 100],
    [900, 900],
    [100, 900],
  ],
  powerupPoints: [
    {
      powerup: 'replenishHealth',
      icon: 'health',
      reactivateAfter: 60 * 10,
      position: {
        x: 150,
        y: 500,
      }
    },
    {
      powerup: 'replenishHealth',
      icon: 'health',
      reactivateAfter: 60 * 10,
      position: {
        x: 850,
        y: 500,
      }
    },
    {
      powerup: 'ghost',
      icon: 'ghost',
      reactivateAfter: 60 * 15,
      position: {
        x: 750,
        y: 750,
      }
    }
  ],
  color: '#f90',
  paths: [
    // Edge
    [[0, 0], [1000, 0]],
    [[1000, 0], [1000, 1000]],
    [[1000, 1000], [0, 1000]],
    [[0, 1000], [0, 0]],

    [[400, 400], [400, 600], [600, 600], [600, 400], [400, 400]],
    [[200, 300], [200, 800]],
    [[200, 800], [800, 800]],
    [[800, 800], [800, 200]],
    [[800, 200], [300, 200]],
  ]
};
