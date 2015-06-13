'use strict';

var Game = require('./game');

var Render = require('./systems/render');
var KeyboardInput = require('./systems/keyboardInput');
var Movement = require('./systems/movement');
var MouseInput = require('./systems/mouseInput');
var PointerFollower = require('./systems/pointerFollower');
var Parent = require('./systems/parent');

var position = require('./components/position');
var appearance = require('./components/appearance');
var keyboardControlled = require('./components/keyboardControlled');
var mouseControlled = require('./components/mouseControlled');
var physics = require('./components/physics');
var pointerFollower = require('./components/pointerFollower');
var parent = require('./components/parent');

var Entity = require('./entity');

var game = Game.create();
game.addSystem(KeyboardInput.create());
game.addSystem(MouseInput.create());
game.addSystem(PointerFollower.create());
game.addSystem(Movement.create());
game.addSystem(Parent.create());
game.addSystem(Render.create(document.querySelector('.js-canvas')));

var test = Entity.create();
test.addComponent(position({x: 10, y: 10}));
test.addComponent(appearance());
game.addEntity(test);

var test2 = Entity.create();
test2.addComponent(position({x: 200, y: 10}));
test2.addComponent(appearance({
  shape: 'arc',
  radius: 10,
  gap: Math.PI * 0.25,
  segment: true,
}));
test2.addComponent(keyboardControlled());
test2.addComponent(physics({
  acceleration: 0.8,
  friction: 0.9,
}));
test2.addComponent(mouseControlled());
game.addEntity(test2);

var follower = Entity.create();
follower.addComponent(parent({
  parentId: test2.id,
}));
follower.addComponent(position({
  offsetX: 170,
  offsetY: 0,
}));
follower.addComponent(appearance({
  fill: 'transparent',
  stroke: '#f00',
  shape: 'arc',
  radius: 200,
  gap: Math.PI * 0.95,
}));
game.addEntity(follower);

var pointer = Entity.create();
pointer.addComponent(position({x: 0, y: 0}));
pointer.addComponent(pointerFollower());
pointer.addComponent(appearance({
  fill: 'transparent',
  stroke: '#eee',
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
  fill: '#f00',
  shape: 'arc',
  radius: 2,
}));
game.addEntity(pointerPoint);

game.start();
