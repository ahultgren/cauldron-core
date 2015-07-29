'use strict';

module.exports = {
  collision: {
    type: 'object',
    radius: 15,
  },
  powerup: {
    type: 'replenishHealth',
  },
  reactivate: {
    event: 'collision',
    reactivateAfter: 10 * 60,
  },
  appearance: {
    shapes: [{
      shape: 'arc',
      radius: 15,
      fill: 'transparent',
      stroke: '#0f0',
    },
    {
      shape: 'polygon',
      stroke: 'transparent',
      fill: '#0f0',
      path: [
        [-3, -9],
        [3, -9],
        [3, -3],
        [9, -3],
        [9, 3],
        [3, 3],
        [3, 9],
        [-3, 9],
        [-3, 3],
        [-9, 3],
        [-9, -3],
        [-3, -3],
        [-3, -9],
      ]
    }],
  }
};
