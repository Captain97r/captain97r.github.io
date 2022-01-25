import { GameObject } from '/GameObject.js'
import { Direction } from '/Direction.js'

export class Player extends GameObject {

    speed;
    direction;

    constructor(spriteSheet, speed = 3) {
        super(spriteSheet, 0, 0, 32, 32);
        this.speed = speed;
        this.direction = 0;
    }

    setDirection(direction) {
        this.direction = direction;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    update() {
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
}