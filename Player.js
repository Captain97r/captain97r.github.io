import { GameObject } from '/GameObject.js'
import { Direction } from '/Direction.js'

export class Player extends GameObject {

    speed;
    direction;
    pressedKeys;

    spriteOrientationPixelShift = {
        up:     {x: 0, y: 0},
        right:  {x: 0, y: 32},
        down:   {x: 0, y: 64},
        left:   {x: 0, y: 96}
    }

    constructor(spriteSheet, speed = 3) {
        super(spriteSheet, 0, 0, 32, 32);
        this.speed = speed;
        this.direction = 0;
        this.pressedKeys = new Array();
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
                this.setSpriteShift(this.spriteOrientationPixelShift.down.x, this.spriteOrientationPixelShift.down.y);
                break;
            case Direction.UP:
                this.setSpriteShift(this.spriteOrientationPixelShift.up.x, this.spriteOrientationPixelShift.up.y);
                break;
            case Direction.LEFT:
                this.setSpriteShift(this.spriteOrientationPixelShift.left.x, this.spriteOrientationPixelShift.left.y);
                break;
            case Direction.RIGHT:
                this.setSpriteShift(this.spriteOrientationPixelShift.right.x, this.spriteOrientationPixelShift.right.y);
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