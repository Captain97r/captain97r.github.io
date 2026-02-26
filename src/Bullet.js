class Bullet extends GameObject {

    constructor(speed = 5, direction = Direction.UP) {
        super();
        this.setSpriteContainer(Globals.objects.bullets.tiles, Globals.objects.bullets.objectSizeX, Globals.objects.bullets.objectSizeY);
        this.direction = direction;
        this.dt = 0;
        this.speed = speed;
        this._isActive = true;

        switch(this.direction) {
            case Direction.DOWN:
                this._activeFrameX = this._frameContainer.down.frameX[0];
                this._activeFrameY = this._frameContainer.down.frameY[0];
                break;
            case Direction.UP:
                this._activeFrameX = this._frameContainer.up.frameX[0];
                this._activeFrameY = this._frameContainer.up.frameY[0];
                break;
            case Direction.LEFT:
                this._activeFrameX = this._frameContainer.left.frameX[0];
                this._activeFrameY = this._frameContainer.left.frameY[0];
                break;
            case Direction.RIGHT:
                this._activeFrameX = this._frameContainer.right.frameX[0];
                this._activeFrameY = this._frameContainer.right.frameY[0];
                break;
        }
    }

    setDirection(direction) {
        this.direction = direction;
    }
    
    getDirection() {
        return this.direction;
    }

    setTimeDelta(dt) {
        this.dt = dt;
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

        // Mark bullet as inactive if it goes off-screen (accounting for stage offsets and bullet size)
        const leftBoundary = -Globals.BULLET_SIZE_X;  // Allow half-bullet-width buffer on left
        const rightBoundary = (Globals.STAGE_WIDTH + Globals.STAGE_W_OFFSET) * Globals.SPRITE_SIZE + Globals.BULLET_SIZE_X;
        const topBoundary = -Globals.BULLET_SIZE_Y;  // Allow half-bullet-height buffer on top
        const bottomBoundary = (Globals.STAGE_HEIGHT + Globals.STAGE_H_OFFSET) * Globals.SPRITE_SIZE + Globals.BULLET_SIZE_Y;

        if (this._posX < leftBoundary || 
            this._posX > rightBoundary ||
            this._posY < topBoundary || 
            this._posY > bottomBoundary) {
            this._isActive = false;
        }
    }

    isActive() {
        return this._isActive;
    }
}
