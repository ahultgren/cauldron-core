'use strict';

class Multiplayer {
  static create (socket, playerId, gameId) {
    return new Multiplayer(socket, playerId, gameId);
  }

  constructor (socket, playerId, gameId) {
    this.socket = socket;
    this.playerId = playerId;
    this.gameId = gameId;

    this.socket.on('player/left', data => console.log(`${data.player_id} disconnected`));
  }

  tick () {

  }
}

module.exports = Multiplayer;
