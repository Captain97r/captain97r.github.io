import { GameObject } from '/GameObject.js'
import { Direction } from '/Direction.js'

export class Tank extends GameObject {

    constructor(spriteSheet, speed = 3) {
        super(spriteSheet, 0, 0, 32, 32);
        
        this.spriteSize = 32;
        this.frameTimeLimit = 2;

        this.speed = speed;
        this.direction = Direction.UP;
        this.dt = 0;
        this.frameTime = this.frameTimeLimit;
        this.currentFrame = 0;
        this.isMoving = false;
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
        if (this.isMoving) {
            this.frameTime -= this.dt;
            if (this.frameTime < 0) {
                this.currentFrame++;
                this.frameTime = this.frameTimeLimit;
            }
        }
        this.selectSprite(this.direction, this.currentFrame % 2);
    }
}