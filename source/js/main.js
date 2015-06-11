'use strict';

var Game = require('./game');
var Render = require('./systems/render');
var Entity = require('./entity');
var position = require('./components/position');
var appearance = require('./components/appearance');

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

var game = Game.create();
game.addSystem(Render.create(canvas));
game.addEntity(test);
game.addEntity(test2);

game.start();

console.log('hello world');
