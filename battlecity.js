var spriteSheet = new Image();
spriteSheet.src = "img/sprite.bmp";

var ctx = document.getElementById('drawingCanvas').getContext('2d');
var tank = new GameObject(spriteSheet, 0, 0, 32, 32);

const Direction = { LEFT: 1, RIGHT: 2, UP: 3, DOWN: 4 };

function GameObject(spriteSheet, x, y, width, height) {
    this.spriteSheet = spriteSheet;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.posX = 0;
    this.posY = 0;

    this.draw = function(context) {
        context.drawImage(this.spriteSheet, this.x, this.y, this.width, this.height, this.posX, this.posY, this.width, this.height);
    }

    this.move = function(direction) {
        switch(direction) {
            case Direction.DOWN:
                this.posY++;
                break;
            case Direction.UP:
                this.posY--;
                break;
            case Direction.LEFT:
                this.posX--;
                break;
            case Direction.RIGHT:
                this.posX++;
                break;
        }
    }
}

function handleKeyPress(evt)
{
    switch(evt.code) {
        case "KeyW":
            tank.move(Direction.UP);
            break;
        case "KeyS":
            tank.move(Direction.DOWN);
            break;
        case "KeyA":
            tank.move(Direction.LEFT);
            break;
        case "KeyD":
            tank.move(Direction.RIGHT);
            break;
    }
}

function go() {
    tank.draw(ctx);
}

window.onload = function () {
    document.addEventListener("keydown", handleKeyPress);
    setInterval(go, 1000/15);
}