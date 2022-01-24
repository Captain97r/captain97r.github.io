var spriteSheet = new Image();
spriteSheet.src = "img/sprite.bmp";

var ctx = document.getElementById('drawingCanvas').getContext('2d');
var tank = new GameObject(spriteSheet, 0, 0, 32, 32);

const Direction = { NONE: 0, LEFT: 1, RIGHT: 2, UP: 3, DOWN: 4 };

function GameObject(spriteSheet, x, y, width, height) {
    this.spriteSheet = spriteSheet;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.posX = 0;
    this.posY = 0;
    this.speed = 3;
    this.direction = 0;

    this.setDirection = function(direction) {
        this.direction = direction;
    }

    this.update = function() {
        switch(this.direction) {
            case Direction.DOWN:
                this.posY+=this.speed;
                break;
            case Direction.UP:
                this.posY-=this.speed;
                break;
            case Direction.LEFT:
                this.posX-=this.speed;
                break;
            case Direction.RIGHT:
                this.posX+=this.speed;
                break;
        }
    }

    this.draw = function(context) {
        context.drawImage(this.spriteSheet, this.x, this.y, this.width, this.height, this.posX, this.posY, this.width, this.height);
    }

}

function handleKeyPress(evt) {
    switch(evt.code) {
        case "KeyW":
            tank.setDirection(Direction.UP);
            break;
        case "KeyS":
            tank.setDirection(Direction.DOWN);
            break;
        case "KeyA":
            tank.setDirection(Direction.LEFT);
            break;
        case "KeyD":
            tank.setDirection(Direction.RIGHT);
            break;
    }
}

function handleKeyRelease(evt) {
    switch(evt.code) {
        case "KeyW":
        case "KeyS":
        case "KeyA":
        case "KeyD":
            tank.setDirection(Direction.NONE);
            break;
    }
}

function go() {
    tank.update();
    tank.draw(ctx);
}

window.onload = function () {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("keyup", handleKeyRelease);

    var lastUpdateTime = (new Date()).getTime();

    // setInterval(function() {
    //     go();
    //     var currentTime = (new Date()).getTime();
    //     var timeDifference = currentTime - lastUpdateTime;
    //     player.x += 5 * timeDifference;
    //     lastUpdateTime = currentTime;
    //   }, 1000 / 60);

    setInterval(go, 10);
}