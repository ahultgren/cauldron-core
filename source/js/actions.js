'use strict';

var state = require('./state');

exports.updateGames = () => {
  fetch('http://localhost:5005/games')
  .then((response) => {
    response.json().then(function(games) {
      console.log('games', games);
      state.select('games').set(games);
    });
  }, (err) => {
    console.error(err);
  });
};

exports.updatePlayers = () => {
  fetch('http://localhost:5005/players', {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      password: 'test',
    }),
  })
  .then((response) => {
    response.json().then(function(player) {
      console.log('player', player);
      state.select('player').set(player);
    });
  }, (err) => {
    console.error(err);
  });
};
