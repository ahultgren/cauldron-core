'use strict';

module.exports = {
  collision: {
    type: 'object',
    radius: 15,
  },
  powerup: {
    type: 'ghost',
  },
  reactivate: {
    event: 'collision',
    reactivateAfter: 15 * 60,
  },
  appearance: {
    shapes: [{
      shape: 'arc',
      radius: 15,
      fill: 'transparent',
      stroke: '#0f0',
    },
    {
      shape: 'polygons',
      stroke: 'transparent',
      fill: '#0f0',
      paths: [
        [
          [0, -6],
          [6, -6],
          [6, 0],
        ],
        [
          [6, 0],
          [6, 6],
          [0, 6],
        ],
        [
          [0, 6],
          [-6, 6],
          [-6, 0],
        ],
        [
          [-6, 0],
          [-6, -6],
          [0, -6],
        ],
      ]
    }],
  }
};
