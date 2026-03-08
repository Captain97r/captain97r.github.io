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
        this._stageWon = false;
        this._gameOverLabel = new GameOverLabel(ctx);
        this._score = 0;
        this._dt = 0;

        // Initialize spawn manager with stage 1 enemy composition
        const stageIndex = 0; // Stage 1
        this._spawnManager = new SpawnManager(StageEnemies[stageIndex], this._objectContainer);
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
            this._drawAll();
            this._gameOverLabel.update();
            this._gameOverLabel.draw(this.ctx);
            return;
        }

        // --- Spawn enemies ---
        const newEnemy = this._spawnManager.update(this._dt);
        if (newEnemy) {
            this._objectContainer.addObject(newEnemy);
        }

        // --- Update player ---
        this._player.update();
        this._snapToGrid(this._player);
        this._player._prevDirection = this._player.direction;
        this._resolveMovementCollision(this._player);

        // --- Update all non-player objects (enemies, bullets) ---
        this._objectContainer.getObjects().forEach(element => {
            if (element !== this._player && element.update) {
                element.update();
            }
        });

        // --- Collect pending bullets from enemy tanks ---
        this._objectContainer.getEnemyTanks().forEach(enemy => {
            const bullet = enemy.collectPendingBullet();
            if (bullet) {
                this._objectContainer.addObject(bullet);
            }
        });

        // --- Enemy movement collision ---
        this._objectContainer.getEnemyTanks().forEach(enemy => {
            if (!enemy.isActive()) return;
            this._snapToGrid(enemy);
            const collided = this._resolveMovementCollision(enemy);
            if (collided) {
                enemy.onCollision();
            }
        });

        // --- Bullet collisions ---
        this._handleBulletCollisions();

        // --- Check win condition ---
        if (this._spawnManager.isStageComplete()) {
            this._stageWon = true;
        }

        // --- Cleanup ---
        this._objectContainer.removeInactiveObjects();

        // --- Draw ---
        this._drawAll();
    }

    /**
     * Snap a tank to the 16px grid when changing direction (prevents wall clipping).
     */
    _snapToGrid(tank) {
        var decimation = 16;
        var x = tank._posX % decimation;
        var y = tank._posY % decimation;

        if (tank._prevDirection != tank.direction) {
            switch(tank.getDirection()) {
                case Direction.DOWN:
                case Direction.UP:
                    if (x > decimation / 2)
                        tank._posX += (decimation - x);
                    else
                        tank._posX -= x;
                    break;
                case Direction.LEFT:
                case Direction.RIGHT:
                    if (y > decimation / 2)
                        tank._posY += (decimation - y);
                    else
                        tank._posY -= y;
                    break;
            }
        }
    }

    /**
     * Check and resolve movement collisions for a tank against walls, boundaries,
     * and other tanks. Returns true if a collision occurred.
     */
    _resolveMovementCollision(tank) {
        var collision = false;

        this._objectContainer.getObjects().forEach((object) => {
            if (object === tank) return;
            // Skip bullets and non-solid objects
            if (object instanceof Bullet || object instanceof Grass || object instanceof Ice) return;
            // Skip inactive objects
            if (typeof object.isActive === 'function' && !object.isActive()) return;

            if ((tank.getRightBoundary() > object.getLeftBoundary()) &&
                (tank.getLeftBoundary() < object.getRightBoundary()) &&
                (tank.getBottomBoundary() > object.getTopBoundary()) &&
                (tank.getTopBoundary() < object.getBottomBoundary())) {
                collision = true;
            }
        });

        // Stage boundary collision
        if ((tank.getRightBoundary() > ((Globals.STAGE_WIDTH + Globals.STAGE_W_OFFSET) * Globals.SPRITE_SIZE)) || 
            (tank.getLeftBoundary() < (Globals.STAGE_W_OFFSET * Globals.SPRITE_SIZE)) || 
            (tank.getBottomBoundary() > ((Globals.STAGE_HEIGHT + Globals.STAGE_H_OFFSET) * Globals.SPRITE_SIZE)) || 
            (tank.getTopBoundary() < (Globals.STAGE_H_OFFSET * Globals.SPRITE_SIZE))) {
            collision = true;
        }

        if (collision) {
            switch(tank.getDirection()) {
                case Direction.DOWN:
                    tank._posY -= tank.getSpeed() * tank.getTimeDelta();
                    break;
                case Direction.UP:
                    tank._posY += tank.getSpeed() * tank.getTimeDelta();
                    break;
                case Direction.LEFT:
                    tank._posX += tank.getSpeed() * tank.getTimeDelta();
                    break;
                case Direction.RIGHT:
                    tank._posX -= tank.getSpeed() * tank.getTimeDelta();
                    break;
            }
        }
        return collision;
    }

    /**
     * Handle all bullet collisions:
     * - Bullet → Wall
     * - Bullet → Eagle
     * - Player bullet → Enemy tank
     * - Enemy bullet → Player
     * - Bullet → Bullet (player vs enemy)
     */
    _handleBulletCollisions() {
        const walls = this._objectContainer.getWalls();
        const bullets = this._objectContainer.getBullets();
        const enemies = this._objectContainer.getEnemyTanks();

        for (let bullet of bullets) {
            if (!bullet.isActive()) continue;

            // --- Bullet → Eagle ---
            if (this._eagle.isActive()) {
                if (this._aabbCollision(
                    bullet._posX, bullet._posY, Globals.BULLET_SIZE_X, Globals.BULLET_SIZE_Y,
                    this._eagle.getLeftBoundary(), this._eagle.getTopBoundary(),
                    this._eagle.getRightBoundary() - this._eagle.getLeftBoundary(),
                    this._eagle.getBottomBoundary() - this._eagle.getTopBoundary()
                )) {
                    bullet.destroy();
                    this._eagle.destroy();
                    this._gameOver = true;
                    this._gameOverLabel.startAnimation();
                    continue;
                }
            }

            // --- Bullet → Wall ---
            const collisionResult = bullet.checkWallCollision(walls);
            if (collisionResult.collided) {
                bullet.destroy();
                if (collisionResult.wallType === 'brick') {
                    const bL = bullet._posX;
                    const bR = bullet._posX + Globals.BULLET_SIZE_X;
                    const bT = bullet._posY;
                    const bB = bullet._posY + Globals.BULLET_SIZE_Y;
                    walls.forEach(wall => {
                        if (wall.constructor.name === 'BrickWall' && wall.isActive() &&
                            bL < wall.getRightBoundary() && bR > wall.getLeftBoundary() &&
                            bT < wall.getBottomBoundary() && bB > wall.getTopBoundary()) {
                            wall.damage(bullet.direction);
                        }
                    });
                }
                continue;
            }

            // --- Player bullet → Enemy tank ---
            if (bullet.getTeam() === 'player') {
                for (let enemy of enemies) {
                    if (!enemy.isActive()) continue;
                    if (this._aabbCollision(
                        bullet._posX, bullet._posY, Globals.BULLET_SIZE_X, Globals.BULLET_SIZE_Y,
                        enemy.getLeftBoundary(), enemy.getTopBoundary(),
                        enemy.getRightBoundary() - enemy.getLeftBoundary(),
                        enemy.getBottomBoundary() - enemy.getTopBoundary()
                    )) {
                        bullet.destroy();
                        const destroyed = enemy.damage();
                        if (destroyed) {
                            this._score += enemy.getPoints();
                            this._spawnManager.onEnemyDestroyed();
                        }
                        break;
                    }
                }
            }

            // --- Enemy bullet → Player ---
            if (bullet.getTeam() === 'enemy' && bullet.isActive()) {
                if (this._aabbCollision(
                    bullet._posX, bullet._posY, Globals.BULLET_SIZE_X, Globals.BULLET_SIZE_Y,
                    this._player.getLeftBoundary(), this._player.getTopBoundary(),
                    this._player.getRightBoundary() - this._player.getLeftBoundary(),
                    this._player.getBottomBoundary() - this._player.getTopBoundary()
                )) {
                    bullet.destroy();
                    this._gameOver = true;
                    this._gameOverLabel.startAnimation();
                }
            }
        }

        // --- Bullet → Bullet (player vs enemy cancel each other) ---
        const playerBullets = bullets.filter(b => b.isActive() && b.getTeam() === 'player');
        const enemyBullets = bullets.filter(b => b.isActive() && b.getTeam() === 'enemy');
        for (let pb of playerBullets) {
            if (!pb.isActive()) continue;
            for (let eb of enemyBullets) {
                if (!eb.isActive()) continue;
                if (this._aabbCollision(
                    pb._posX, pb._posY, Globals.BULLET_SIZE_X, Globals.BULLET_SIZE_Y,
                    eb._posX, eb._posY, Globals.BULLET_SIZE_X, Globals.BULLET_SIZE_Y
                )) {
                    pb.destroy();
                    eb.destroy();
                }
            }
        }
    }

    /**
     * AABB collision check between two rectangular objects.
     */
    _aabbCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
        return x1 < x2 + w2 && x1 + w1 > x2 &&
               y1 < y2 + h2 && y1 + h1 > y2;
    }

    /**
     * Draw all game objects.
     */
    _drawAll() {
        this._objectContainer.getObjects().forEach(element => {
            if (element.draw) {
                element.draw(this.ctx);
            }
        });
        this._eagle.draw(this.ctx);
    }


    setTimeDelta(dt) {
        this._dt = dt;
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
