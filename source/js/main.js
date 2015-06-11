'use strict';

var Game = require('./game');
var Render = require('./systems/render');
var KeyboardInput = require('./systems/keyboardInput');
var Entity = require('./entity');
var position = require('./components/position');
var appearance = require('./components/appearance');
var keyboardControlled = require('./components/keyboardControlled');

var canvas = document.querySelector('.js-canvas');

var test = Entity.create();
test.addComponent(position({x: 10, y: 10}));
test.addComponent(appearance());

var test2 = Entity.create();
var ball = appearance();
ball.shape = 'circle';
ball.radius = 10;

test2.addComponent(position({x: 200, y: 10}));
test2.addComponent(ball);
test2.addComponent(keyboardControlled());

var game = Game.create();
game.addSystem(KeyboardInput.create());
game.addSystem(Render.create(canvas));
game.addEntity(test);
game.addEntity(test2);

game.start();

console.log('hello world');
