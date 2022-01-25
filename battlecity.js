import { Player } from '/Player.js'
import { Direction } from '/Direction.js'
import { BrickWall } from '/BrickWall.js'

var spriteSheet = new Image();
spriteSheet.src = "img/sprite.bmp";

var ctx = document.getElementById('drawingCanvas').getContext('2d');
var player = new Player(spriteSheet);
var brickWall = new Array();
brickWall.push(new BrickWall(spriteSheet));
brickWall.push(new BrickWall(spriteSheet));
brickWall.push(new BrickWall(spriteSheet));
brickWall.push(new BrickWall(spriteSheet));

function handleKeyPress(evt) {
    switch(evt.code) {
        case "KeyW":
            player.setDirection(Direction.UP);
            break;
        case "KeyS":
            player.setDirection(Direction.DOWN);
            break;
        case "KeyA":
            player.setDirection(Direction.LEFT);
            break;
        case "KeyD":
            player.setDirection(Direction.RIGHT);
            break;
    }
}

function handleKeyRelease(evt) {
    switch(evt.code) {
        case "KeyW":
        case "KeyS":
        case "KeyA":
        case "KeyD":
            player.setDirection(Direction.NONE);
            break;
    }
}

function init() {
    brickWall[0].setPosition(100, 100);
    brickWall[1].setPosition(116, 100);
    brickWall[2].setPosition(100, 116);
    brickWall[3].setPosition(116, 116);
}

function go() {
    player.update();
    player.draw(ctx);
    brickWall[0].draw(ctx);
    brickWall[1].draw(ctx);
    brickWall[2].draw(ctx);
    brickWall[3].draw(ctx);
}

window.onload = function () {
    init();

    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyRelease);

    var lastUpdateTime = (new Date()).getTime();

    setInterval(function() {
        go();
        var currentTime = (new Date()).getTime();
        var timeDifference = currentTime - lastUpdateTime;
        player.setSpeed(timeDifference / 5);
        lastUpdateTime = currentTime;
      }, 1000 / 240);
}