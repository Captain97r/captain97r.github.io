export class Player extends GameObject {

    speed;
    direction;

    constructor(spriteSheet, x, y, width, height, speed = 3) {
        super(spriteSheet, x, y, width, height);
        this.speed = speed;
        this.direction = 0;
    }

    setDirection(direction) {
        this.direction = direction;
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