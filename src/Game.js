class Game {

    constructor(ctx) {
        this.ctx = ctx;

        this._player = new Player();
        this._player.setXYPosition(Globals.PLAYER1_START_POS_X, Globals.PLAYER1_START_POS_Y);
        
        this._objectContainer = new ObjectContainer();
        this._objectContainer.addObject(this._player);

        this._stageBinary;
        this._stageBinary = Globals.currentStageBinary;

        let levelBuilder = new LevelBuilder();
        levelBuilder.build(this._objectContainer, this._stageBinary);
    }


    update() {
        this.ctx.fillStyle = "gray"
        this.ctx.fillRect(0, 0, (Globals.STAGE_WIDTH + (Globals.STAGE_W_OFFSET * 3)) * Globals.SPRITE_SIZE, (Globals.STAGE_HEIGHT + (Globals.STAGE_H_OFFSET * 2)) * Globals.SPRITE_SIZE);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(Globals.STAGE_W_OFFSET * Globals.SPRITE_SIZE, Globals.STAGE_W_OFFSET * Globals.SPRITE_SIZE, Globals.STAGE_WIDTH * Globals.SPRITE_SIZE, Globals.STAGE_HEIGHT * Globals.SPRITE_SIZE);

        this._player.update();

        var decimation = 16;
        var x = this._player._posX % decimation;
        var y = this._player._posY % decimation;

        if (this._player._prevDirection != this._player.direction) {
            switch(this._player.getDirection()) {
                case Direction.DOWN:
                case Direction.UP:
                    if (x > decimation / 2)
                        this._player._posX += (decimation - x);
                    else
                        this._player._posX -= x;
                    break;
                case Direction.LEFT:
                case Direction.RIGHT:
                    if (y > decimation / 2)
                        this._player._posY += (decimation - y);
                    else
                    {
                        this._player._posY -= y;
                    }
                    break;
            }

        }

        this._player._prevDirection = this._player.direction;


        var collision = false;

        this._objectContainer.getObjects().forEach((object) => {
            if (object !== this._player) {
                if ((this._player.getRightBoundary() > object.getLeftBoundary()) && (this._player.getLeftBoundary() < object.getRightBoundary()) &&
                     (this._player.getBottomBoundary() > object.getTopBoundary()) && (this._player.getTopBoundary() < object.getBottomBoundary())) {
                        collision = true;
                }
            }
        });

        if ((this._player.getRightBoundary() > ((Globals.STAGE_WIDTH + Globals.STAGE_W_OFFSET) * Globals.SPRITE_SIZE)) || 
            (this._player.getLeftBoundary() < (Globals.STAGE_W_OFFSET * Globals.SPRITE_SIZE)) || 
            (this._player.getBottomBoundary() > ((Globals.STAGE_HEIGHT + Globals.STAGE_H_OFFSET) * Globals.SPRITE_SIZE)) || 
            (this._player.getTopBoundary() < (Globals.STAGE_H_OFFSET * Globals.SPRITE_SIZE))) {
                collision = true;
        }

        if (collision) {
            switch(this._player.getDirection()) {
                case Direction.DOWN:
                    this._player._posY -= this._player.getSpeed() * this._player.getTimeDelta();
                    break;
                case Direction.UP:
                    this._player._posY += this._player.getSpeed() * this._player.getTimeDelta();
                    break;
                case Direction.LEFT:
                    this._player._posX += this._player.getSpeed() * this._player.getTimeDelta();
                    break;
                case Direction.RIGHT:
                    this._player._posX -= this._player.getSpeed() * this._player.getTimeDelta();
                    break;
            }
        }

        // Update all objects including bullets (skip player — already updated above)
        this._objectContainer.getObjects().forEach(element => {
            if (element !== this._player && element.update) {
                element.update();
            }
        });

        // Check bullet-wall collisions
        const walls = this._objectContainer.getWalls();
        const objects = this._objectContainer.getObjects();
        
        objects.forEach(element => {
            if (element !== this._player && element instanceof Bullet) {
                const collisionResult = element.checkWallCollision(walls);
                if (collisionResult.collided) {
                    // Deactivate bullet
                    element.destroy();
                    
                    // Destroy brick wall, concrete walls remain intact
                    if (collisionResult.wallType === 'brick') {
                        walls.forEach(wall => {
                            if (wall.constructor.name === 'BrickWall' && 
                                Math.abs(wall.getLeftBoundary() - element.getLeftBoundary()) < Globals.BULLET_SIZE_X &&
                                Math.abs(wall.getTopBoundary() - element.getTopBoundary()) < Globals.BULLET_SIZE_Y) {
                                wall.destroy();
                            }
                        });
                    }
                }
            }
        });

        // Remove inactive objects (destroyed bullets and walls)
        this._objectContainer.removeInactiveObjects();

        // Draw all objects including bullets
        this._objectContainer.getObjects().forEach(element => {
            if (element.draw) {
                element.draw(this.ctx);
            }
        });
    }


    setTimeDelta(dt) {
        this._player.setTimeDelta(dt);
        // Propagate time delta to all objects including bullets so they can move properly
        this._objectContainer.getObjects().forEach(obj => {
            if (obj !== this._player && obj.setTimeDelta) {
                obj.setTimeDelta(dt);
            }
        });
    }

    handleKeyPress(evt) {
        switch(evt.code) {
            case "KeyW":
                this._player.pushKey(Direction.UP);
                break;
            case "KeyS":
                this._player.pushKey(Direction.DOWN);
                break;
            case "KeyA":
                this._player.pushKey(Direction.LEFT);
                break;
            case "KeyD":
                this._player.pushKey(Direction.RIGHT);
                break;
            case "Space":
                // Fire bullet when spacebar is pressed
                let bullet = this._player.fire();
                if (bullet) {
                    this._objectContainer.addObject(bullet);
                }
                break;
        }
    }
    
    handleKeyRelease(evt) {
        switch(evt.code) {
            case "KeyW":
                this._player.popKey(Direction.UP);
                break;
            case "KeyS":
                this._player.popKey(Direction.DOWN);
                break;
            case "KeyA":
                this._player.popKey(Direction.LEFT);
                break;
            case "KeyD":
                this._player.popKey(Direction.RIGHT);
                break;
        }
    }
}
