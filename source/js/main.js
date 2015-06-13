'use strict';

var Game = require('./game');

var Render = require('./systems/render');
var KeyboardInput = require('./systems/keyboardInput');
var Movement = require('./systems/movement');
var MouseInput = require('./systems/mouseInput');

var position = require('./components/position');
var appearance = require('./components/appearance');
var keyboardControlled = require('./components/keyboardControlled');
var mouseControlled = require('./components/mouseControlled');
var physics = require('./components/physics');

var Entity = require('./entity');

var test = Entity.create();
test.addComponent(position({x: 10, y: 10}));
test.addComponent(appearance());

var test2 = Entity.create();
test2.addComponent(position({x: 200, y: 10}));
test2.addComponent(appearance({
  shape: 'arc',
  radius: 10,
  gap: Math.PI * 0.25,
}));
test2.addComponent(keyboardControlled());
test2.addComponent(physics({
  acceleration: 0.8,
  friction: 0.9,
}));
test2.addComponent(mouseControlled());

var game = Game.create();
game.addSystem(KeyboardInput.create());
game.addSystem(MouseInput.create());
game.addSystem(Movement.create());
game.addSystem(Render.create(document.querySelector('.js-canvas')));
game.addEntity(test);
game.addEntity(test2);

game.start();
