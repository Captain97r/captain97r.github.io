class Tank extends GameObject {

    constructor(type, speed = 3) {
        super();

        this.spriteSize = 32;
        this.frameTimeLimit = 2;
        this._animationFrames = Globals.objects.tanks.animationFrames;

        this.defaultSpeed = speed;
        this.speed = 0;
        this.direction = Direction.UP;
        this.dt = 0;
        this.frameTime = this.frameTimeLimit;
        this._currentFrame = 0;
        this._prevDirection = Direction.UP;
    }

    stopMotion() {
        this.speed = 0;
    }

    startMotion() {
        this.speed = this.defaultSpeed;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    getSpeed() {
        return this.speed;
    }
    
    setTimeDelta(dt) {
        this.dt = dt;
    }

    getTimeDelta() {
        return this.dt;
    }

    setDirection(direction) {
        this._prevDirection = this.direction;
        this.direction = direction;
    }
    
    getDirection() {
        return this.direction;
    }

    setActiveFrame(direction, frame) {
        switch(direction) {
            case Direction.UP:
                this._activeFrameX = this._frameContainer.up.frameX[frame];
                this._activeFrameY = this._frameContainer.up.frameY[frame];
                break;
            case Direction.RIGHT:
                this._activeFrameX = this._frameContainer.right.frameX[frame];
                this._activeFrameY = this._frameContainer.right.frameY[frame];
                break;
            case Direction.DOWN:
                this._activeFrameX = this._frameContainer.down.frameX[frame];
                this._activeFrameY = this._frameContainer.down.frameY[frame];
                break;
            case Direction.LEFT:
                this._activeFrameX = this._frameContainer.left.frameX[frame];
                this._activeFrameY = this._frameContainer.left.frameY[frame];
                break;
            
        }
    }

    update() {
        switch(this.direction) {
            case Direction.DOWN:
                this._posY += this.speed * this.dt;
                break;
            case Direction.UP:
                this._posY -= this.speed * this.dt;
                break;
            case Direction.LEFT:
                this._posX -= this.speed * this.dt;
                break;
            case Direction.RIGHT:
                this._posX += this.speed * this.dt;
                break;
        }
        if (this.speed != 0) {
            this.frameTime -= this.dt;
            if (this.frameTime < 0) {
                this._currentFrame++;
                this.frameTime = this.frameTimeLimit;
            }
        }
        this.setActiveFrame(this.direction, this._currentFrame % this._animationFrames);
    }
}