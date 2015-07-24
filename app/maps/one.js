'use strict';

module.exports = {
  spawnPoints: [
    [100, 100],
    [900, 100],
    [900, 900],
    [100, 900],
  ],
  color: '#f90',
  paths: [
    // Edge
    [[0, 0], [1000, 0]],
    [[1000, 0], [1000, 1000]],
    [[1000, 1000], [0, 1000]],
    [[0, 1000], [0, 0]],

    [[400, 400], [400, 500], [500, 500], [500, 400], [400, 400]],
    [[200, 300], [200, 700]],
    [[200, 700], [700, 700]],
    [[700, 700], [700, 200]],
    [[700, 200], [300, 200]],
  ]
};
