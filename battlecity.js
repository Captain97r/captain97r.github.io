import { Player } from '/Player.js'
import { Direction } from '/Direction.js'
import { BrickWall } from '/BrickWall.js'

var spriteSheet = new Image();
spriteSheet.src = "img/sprites_tp.png";

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
            player.pushKey(Direction.UP);
            break;
        case "KeyS":
            player.pushKey(Direction.DOWN);
            break;
        case "KeyA":
            player.pushKey(Direction.LEFT);
            break;
        case "KeyD":
            player.pushKey(Direction.RIGHT);
            break;
    }
}

function handleKeyRelease(evt) {
    switch(evt.code) {
        case "KeyW":
            player.popKey(Direction.UP);
            break;
        case "KeyS":
            player.popKey(Direction.DOWN);
            break;
        case "KeyA":
            player.popKey(Direction.LEFT);
            break;
        case "KeyD":
            player.popKey(Direction.RIGHT);
            break;
    }
}

function init() {
    brickWall[0].setPosition(10, 10);
    brickWall[1].setPosition(11, 10);
    brickWall[2].setPosition(10, 11);
    brickWall[3].setPosition(11, 11);
}

function go() {
    ctx.clearRect(0, 0, 1000, 1000);
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
        player.setTimeDelta(timeDifference / 20);
        lastUpdateTime = currentTime;
      }, 1000 / 240);
}