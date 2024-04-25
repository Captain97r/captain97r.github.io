class Bullet extends GameObject {

    constructor(speed = 5, direction = Direction.UP) {
        super();
        this.setSpriteContainer(Globals.objects.bullet.tiles, Globals.objects.bullet.objectSizeX, Globals.objects.bullet.objectSizeY);
        this.direction = direction;
        this.dt = 0;
        this.speed = speed;

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
    }
}