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

        this._eagle = new Eagle();
        this._eagle.setXYPosition(192, 384);
        this._objectContainer.addObject(this._eagle);

        // Build U-shaped brick fortress around the eagle (16x16 sub-tiles)
        // Eagle is at (192, 384), 32x32. Fortress: top row + left/right sides.
        const fortressPositions = [
            // Top row (4 bricks)
            [176, 368], [192, 368], [208, 368], [224, 368],
            // Left side (2 bricks)
            [176, 384], [176, 400],
            // Right side (2 bricks)
            [224, 384], [224, 400],
        ];
        for (const [fx, fy] of fortressPositions) {
            let brick = new BrickWall(WallTileEnum.BRICK_FULL);
            brick.setXYPosition(fx, fy);
            this._objectContainer.addObject(brick);
        }

        this._gameOver = false;
        this._gameOverLabel = new GameOverLabel(ctx);
    }


    isGameOver() {
        return this._gameOver;
    }

    update() {
        this.ctx.fillStyle = "gray"
        this.ctx.fillRect(0, 0, (Globals.STAGE_WIDTH + (Globals.STAGE_W_OFFSET * 3)) * Globals.SPRITE_SIZE, (Globals.STAGE_HEIGHT + (Globals.STAGE_H_OFFSET * 2)) * Globals.SPRITE_SIZE);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(Globals.STAGE_W_OFFSET * Globals.SPRITE_SIZE, Globals.STAGE_W_OFFSET * Globals.SPRITE_SIZE, Globals.STAGE_WIDTH * Globals.SPRITE_SIZE, Globals.STAGE_HEIGHT * Globals.SPRITE_SIZE);

if (this._gameOver) {
            // Still draw all objects (including destroyed eagle)
            this._objectContainer.getObjects().forEach(element => {
                if (element.draw) {
                    element.draw(this.ctx);
                }
            });
            this._eagle.draw(this.ctx);
            
            // Draw GAME OVER label with animation
            this._gameOverLabel.update();
            this._gameOverLabel.draw(this.ctx);
            return;
        }

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
                // Check bullet-eagle collision
                if (this._eagle.isActive()) {
                    const bLeft = element._posX;
                    const bRight = element._posX + Globals.BULLET_SIZE_X;
                    const bTop = element._posY;
                    const bBottom = element._posY + Globals.BULLET_SIZE_Y;

if (bLeft < this._eagle.getRightBoundary() &&
                        bRight > this._eagle.getLeftBoundary() &&
                        bTop < this._eagle.getBottomBoundary() &&
                        bBottom > this._eagle.getTopBoundary()) {
                        element.destroy();
                        this._eagle.destroy();
                        this._gameOver = true;
                        this._gameOverLabel.startAnimation();
                        return;
                    }
                }

                const collisionResult = element.checkWallCollision(walls);
                if (collisionResult.collided) {
                    // Deactivate bullet
                    element.destroy();

                    // Destroy all brick walls overlapping with the bullet, concrete walls remain intact
                    if (collisionResult.wallType === 'brick') {
                        const bulletLeft = element._posX;
                        const bulletRight = element._posX + Globals.BULLET_SIZE_X;
                        const bulletTop = element._posY;
                        const bulletBottom = element._posY + Globals.BULLET_SIZE_Y;

                        walls.forEach(wall => {
                            if (wall.constructor.name === 'BrickWall' && wall.isActive() &&
                                bulletLeft < wall.getRightBoundary() &&
                                bulletRight > wall.getLeftBoundary() &&
                                bulletTop < wall.getBottomBoundary() &&
                                bulletBottom > wall.getTopBoundary()) {
                                wall.damage(element.direction);
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

        // Always draw the eagle on top (it handles alive/destroyed sprite internally)
        this._eagle.draw(this.ctx);
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
