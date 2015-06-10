'use strict';

var Game = require('./game');
var Render = require('./systems/render');

var canvas = document.querySelector('.js-canvas');
var game = Game.create();

game.addSystem(Render.create(canvas));

game.start();

console.log('hello world');
