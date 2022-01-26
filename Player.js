import { GameObject } from '/GameObject.js'
import { Direction } from '/Direction.js'

export class Player extends GameObject {

    speed;
    direction;
    pressedKeys;

    constructor(spriteSheet, speed = 3) {
        super(spriteSheet, 0, 0, 32, 32);
        this.speed = speed;
        this.direction = 0;
        this.pressedKeys = new Array();
    }

    setDirection(direction) {
        this.direction = direction;
    }

    pushKey(direction) {
        if (this.pressedKeys.indexOf(direction) == -1)
            this.pressedKeys.push(direction);
    }

    popKey(direction) {
        if (this.pressedKeys.indexOf(direction) != -1)
            this.pressedKeys.splice(this.pressedKeys.indexOf(direction), 1);
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    changeOrientation(direction) {
        switch(direction) {
            case Direction.DOWN:
                this.y = 64;
                break;
            case Direction.UP:
                this.y = 0;
                break;
            case Direction.LEFT:
                this.y = 96;
                break;
            case Direction.RIGHT:
                this.y = 32;
                break;
        }
    }

    update() {
        // switch(this.direction) {
        if (this.pressedKeys.length > 0)
            switch(this.pressedKeys[this.pressedKeys.length - 1]) {
                case Direction.DOWN:
                    this.posY+=this.speed;
                    this.changeOrientation(Direction.DOWN);
                    break;
                case Direction.UP:
                    this.posY-=this.speed;
                    this.changeOrientation(Direction.UP);
                    break;
                case Direction.LEFT:
                    this.posX-=this.speed;
                    this.changeOrientation(Direction.LEFT);
                    break;
                case Direction.RIGHT:
                    this.posX+=this.speed;
                    this.changeOrientation(Direction.RIGHT);
                    break;
            }
    }
}