'use strict';

var playerFactory = require('../factories/player');
var socketComponent = require('../components/socketControlled');

var pickLocalPlayerData = (player) => {
  return {
    position: player.getComponent('position'),
    appearance: player.getComponent('appearance'),
    physics: player.getComponent('physics'),
    collision: player.getComponent('collision'),
  };
};

var setPlayerData = (player, data) => {
  Object.keys(data).forEach((name) => {
    var component = player.getComponent(name);
    var componentData = data[name];

    if(component) {
      Object.keys(componentData).forEach((key) => {
        component[key] = componentData[key];
      });
    }
  });
};

class Multiplayer {
  static create (socket) {
    return new Multiplayer(socket);
  }

  constructor (socket) {
    this.socket = socket;
    this.updates = [];
    this.peers = new Map();
    this.beat = true;

    this.socket.on('player/left', data => this.peerLeft(data));
    this.socket.on('player/update', data => this.updates.push(data));
  }

  tick (entities) {
    this.updates.forEach((data) => {
      var player = this.peers.get(data.player_id);

      if(!player) {
        player = playerFactory(data);
        player.addComponent(socketComponent({
          player_id: data.player_id,
        }));
        this.game.addEntity(player);
        this.peers.set(data.player_id, player);
      }
      else {
        setPlayerData(player, data);
      }
    });
    this.updates = [];
    this.tick2(entities);
  }

  tick2 (entities) {
    var localPlayer, data;

    // No need to send data every tick
    this.beat = !this.beat;
    if(!this.beat) {
      return;
    }

    // [TODO] Better way than assuming keyboardControlled is only player?
    entities.forEach((entity) => {
      if(entity.hasComponent('keyboardControlled')) {
        localPlayer = entity;
      }
    });

    if(!localPlayer) {
      return;
    }

    // [TODO] Only send data if anything's changed
    data = pickLocalPlayerData(localPlayer);

    this.socket.send('player/update', data);
  }

  peerLeft ({player_id}) {
    var entity = this.peers.get(player_id);
    this.peers.delete(player_id);
    this.game.removeEntity(entity.id);
    console.log(`${player_id} disconnected`);
  }
}

module.exports = Multiplayer;
