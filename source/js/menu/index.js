'use strict';

var Bacon = require('baconjs');
var Renderer = require('./renderer');
var on = require('../utils/on');

var template = ({games}) => {
  return `
    <div>
      <h2>Available games:</h2>
      <ul>
        ${games.map(game =>
          `<li>${game.name} (${game.rules.players}) <button data-game-id="${game.game_id}">Join</button></li>`
        ).join('')}
      </ul>
      <form>
        <input type="text" name="name">
        <input type="text" name="players">
        <button href="" class="games-create">Create game</button>
      </form>
    </div>
  `;
};

exports.init = (elem, state) => {
  var render = Renderer.create({
    parent: elem,
    template,
  });

  render({
    games: [],
  });

  Bacon.combineTemplate({
    games: state.select('games').asProperty(),
  })
  .onValue(render);

  on(elem, 'click', '[data-game-id]', (e) => {
    var gameId = e.target.attributes.getNamedItem('data-game-id').value;

    state.select('currentGameId').set(gameId);

    e.preventDefault();
  });
};
