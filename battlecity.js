import { Player } from '/Player.js'
import { Direction } from '/Direction.js'
import { BrickWall } from '/BrickWall.js'
import { Game } from './Game.js';


window.onload = function () {

    let ctx = document.getElementById('drawingCanvas').getContext('2d');

    let game = new Game(ctx);

    // TODO: idk how bind() works but I need to know it
    document.addEventListener("keydown", game.handleKeyPress.bind(game));
    document.addEventListener("keyup", game.handleKeyRelease.bind(game));

    var lastUpdateTime = (new Date()).getTime();

    setInterval(function() {
        game.update();
        var currentTime = (new Date()).getTime();
        var timeDifference = currentTime - lastUpdateTime;
        game.setTimeDelta(timeDifference / 20);
        lastUpdateTime = currentTime;
      }, 1000 / 240);
}