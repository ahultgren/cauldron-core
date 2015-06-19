'use strict';

var Game = require('./game');

var Render = require('./systems/render');
var KeyboardInput = require('./systems/keyboardInput');
var Movement = require('./systems/movement');
var MouseInput = require('./systems/mouseInput');
var PointerFollower = require('./systems/pointerFollower');
var Parent = require('./systems/parent');
var Factory = require('./systems/factory');
var Collision = require('./systems/collision');
var Animation = require('./systems/animation');
var Expire = require('./systems/expire');

var position = require('./components/position');
var appearance = require('./components/appearance');
var keyboardControlled = require('./components/keyboardControlled');
var mouseControlled = require('./components/mouseControlled');
var physics = require('./components/physics');
var pointerFollower = require('./components/pointerFollower');
var parent = require('./components/parent');
var factory = require('./components/factory');
var collision = require('./components/collision');

var Entity = require('./entity');

var game = Game.create();
game.addSystem(KeyboardInput.create());
game.addSystem(MouseInput.create());
game.addSystem(PointerFollower.create());
game.addSystem(Movement.create());
game.addSystem(Collision.create());
game.addSystem(Parent.create());
game.addSystem(Factory.create());
game.addSystem(Expire.create());
game.addSystem(Animation.create());
game.addSystem(Render.create(document.querySelector('.js-canvas')));

var map = Entity.create();
var mapPaths = require('./maps/one');
map.addComponent(position());
map.addComponent(appearance({
  shape: 'polygons',
  fill: 'transparent',
  stroke: '#f00',
  paths: mapPaths,
}));
map.addComponent(collision.fromPaths({
  paths: mapPaths,
}));
game.addEntity(map);
game.setMap(map);

var player = Entity.create();
player.addComponent(position({x: 200, y: 10}));
player.addComponent(appearance({
  shape: 'arc',
  radius: 10,
  gap: Math.PI * 0.25,
  segment: true,
}));
player.addComponent(keyboardControlled());
player.addComponent(physics({
  acceleration: 2.5,
  friction: 0.65,
}));
player.addComponent(mouseControlled());
player.addComponent(collision.fromArc({
  radius: 10,
}));
game.addEntity(player);

var shield = Entity.create();
shield.addComponent(parent({
  parentId: player.id,
}));
shield.addComponent(position({
  offsetX: 170,
  offsetY: 0,
}));
shield.addComponent(appearance({
  fill: 'transparent',
  stroke: '#f00',
  shape: 'arc',
  radius: 200,
  gap: Math.PI * 0.95,
}));
game.addEntity(shield);

var weapon = Entity.create();
weapon.addComponent(position());
weapon.addComponent(parent({
  parentId: player.id,
}));
weapon.addComponent(factory({
  factory: 'bullet',
  event: 'click',
  data: {
    speed: 10,
  }
}));
game.addEntity(weapon);

var pointer = Entity.create();
pointer.addComponent(position({x: 0, y: 0}));
pointer.addComponent(pointerFollower());
pointer.addComponent(appearance({
  fill: 'transparent',
  stroke: '#fd0',
  shape: 'arc',
  radius: 10,
  gap: 0,
}));
game.addEntity(pointer);

var pointerPoint = Entity.create();
pointerPoint.addComponent(parent({
  parentId: pointer.id,
}));
pointerPoint.addComponent(position({
  offsetX: 0,
  offsetY: 0,
}));
pointerPoint.addComponent(appearance({
  fill: '#fd0',
  stroke: 'transparent',
  shape: 'arc',
  radius: 2,
}));
game.addEntity(pointerPoint);

game.start();

window.game = game;
