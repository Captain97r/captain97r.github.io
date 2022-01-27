import { GameObject } from '/GameObject.js'
import { Direction } from '/Direction.js'

export class Tank extends GameObject {

    spriteSize = 32;

    speed;
    direction;
    dt;
    isMoving;

    constructor(spriteSheet, speed = 3) {
        super(spriteSheet, 0, 0, 32, 32);
        this.speed = speed;
        this.dt = 0;
    }

    stopMotion() {
        this.isMoving = false;
    }

    startMotion() {
        this.isMoving = true;
    }

    setSpeed(speed) {
        this.speed = speed;
    }
    
    setTimeDelta(dt) {
        this.dt = dt;
    }

    setDirection(direction) {
        this.direction = direction;
    }

    selectSprite(direction, animationFrame) {
        super.setSpriteBias(this.spriteSize * animationFrame,
                            this.spriteSize * direction);
    }

    update() {
        switch(this.direction) {
            case Direction.DOWN:
                this.posY+=this.speed * this.dt * this.isMoving;
                break;
            case Direction.UP:
                this.posY-=this.speed * this.dt * this.isMoving;
                break;
            case Direction.LEFT:
                this.posX-=this.speed * this.dt * this.isMoving;
                break;
            case Direction.RIGHT:
                this.posX+=this.speed * this.dt * this.isMoving;
                break;
        }

        this.selectSprite(this.direction, 0);
    }
}