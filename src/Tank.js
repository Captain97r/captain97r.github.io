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
        this._activeBullet = null;  // Track active bullet for Battle City firing rule
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

    fire() {
        // Battle City rule: can only fire if no active bullet exists
        if (this._activeBullet !== null && this._activeBullet.isActive()) {
            return null;  // Cannot fire - bullet already active
        }
        
        // Create a bullet with default properties and direction
        // Subclasses can override _getBulletSpeed() and _getTeam()
        let bullet = new Bullet(this._getBulletSpeed(), this.direction, this._getTeam());
        
        // Get bullet dimensions for positioning
        const bulletWidth = Globals.objects.bullets.objectSizeX;
        const bulletHeight = Globals.objects.bullets.objectSizeY;
        
        // Position the bullet at the muzzle of the tank based on its direction
        // Note: We use direct pixel assignment to avoid double-offsetting from setXYPosition
        switch(this.direction) {
            case Direction.UP:
                bullet._posX = this._posX + (this.spriteSize / 2) - (bulletWidth / 2);
                bullet._posY = this._posY - bulletHeight;
                break;
            case Direction.RIGHT:
                bullet._posX = this._posX + this.spriteSize;
                bullet._posY = this._posY + (this.spriteSize / 2) - (bulletHeight / 2);
                break;
            case Direction.DOWN:
                bullet._posX = this._posX + (this.spriteSize / 2) - (bulletWidth / 2);
                bullet._posY = this._posY + this.spriteSize;
                break;
            case Direction.LEFT:
                bullet._posX = this._posX - bulletWidth;
                bullet._posY = this._posY + (this.spriteSize / 2) - (bulletHeight / 2);
                break;
        }
        
        // Store reference to the active bullet
        this._activeBullet = bullet;
        return bullet;
    }

    _getBulletSpeed() {
        return 5;
    }

    _getTeam() {
        return 'player';
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
