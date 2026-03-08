class EnemyTank extends Tank {

    constructor(enemyType) {
        super();
        this._enemyType = enemyType;
        this._isActive = true;

        // Configure properties per enemy type (original Battle City values)
        switch (enemyType) {
            case EnemyTypeEnum.BASIC:
                this.defaultSpeed = 1.5;
                this._bulletSpeed = 3;
                this._hp = 1;
                this._points = 100;
                this.setSpriteContainer(
                    Globals.objects.tanks.enemyTank.types.basic.animation,
                    Globals.objects.tanks.objectSizeX,
                    Globals.objects.tanks.objectSizeY
                );
                break;
            case EnemyTypeEnum.FAST:
                this.defaultSpeed = 3;
                this._bulletSpeed = 3;
                this._hp = 1;
                this._points = 200;
                this.setSpriteContainer(
                    Globals.objects.tanks.enemyTank.types.fast.animation,
                    Globals.objects.tanks.objectSizeX,
                    Globals.objects.tanks.objectSizeY
                );
                break;
            case EnemyTypeEnum.POWER:
                this.defaultSpeed = 2;
                this._bulletSpeed = 5;
                this._hp = 1;
                this._points = 300;
                this.setSpriteContainer(
                    Globals.objects.tanks.enemyTank.types.power.animation,
                    Globals.objects.tanks.objectSizeX,
                    Globals.objects.tanks.objectSizeY
                );
                break;
            case EnemyTypeEnum.ARMOR:
                this.defaultSpeed = 2;
                this._bulletSpeed = 3;
                this._hp = 4;
                this._points = 400;
                this._maxHp = 4;
                this._updateArmorSprite();
                break;
        }

        // Start moving immediately (random initial direction)
        this.direction = this._pickRandomDirection();
        this.speed = this.defaultSpeed;

        // AI timers (in delta-time units, ~1 dt unit ≈ 20ms → 50 units ≈ 1 second)
        this._aiDirectionTimer = this._randomDirectionInterval();
        this._aiFireTimer = this._randomFireInterval();
    }

    _getTeam() {
        return 'enemy';
    }

    _getBulletSpeed() {
        return this._bulletSpeed;
    }

    getPoints() {
        return this._points;
    }

    getEnemyType() {
        return this._enemyType;
    }

    isActive() {
        return this._isActive;
    }

    destroy() {
        this._isActive = false;
    }

    /**
     * Take damage from a bullet. Reduces HP and updates sprite for Armor tank.
     * @returns {boolean} true if the tank was destroyed
     */
    damage() {
        this._hp--;
        if (this._hp <= 0) {
            this.destroy();
            return true;
        }
        // Update Armor tank sprite based on remaining HP
        if (this._enemyType === EnemyTypeEnum.ARMOR) {
            this._updateArmorSprite();
        }
        return false;
    }

    /**
     * Update Armor tank sprite based on current HP.
     * 4HP: bright green, 3HP: yellow, 2HP: olive green, 1HP: silver
     */
    _updateArmorSprite() {
        const armorSprites = Globals.objects.tanks.enemyTank.types.armor;
        let spriteAnim;
        switch (this._hp) {
            case 4:  spriteAnim = armorSprites.hp4Animation; break;
            case 3:  spriteAnim = armorSprites.hp3Animation; break;
            case 2:  spriteAnim = armorSprites.hp2Animation; break;
            default: spriteAnim = armorSprites.animation;    break;
        }
        this.setSpriteContainer(
            spriteAnim,
            Globals.objects.tanks.objectSizeX,
            Globals.objects.tanks.objectSizeY
        );
    }

    /**
     * AI update: handle movement direction changes and firing decisions.
     */
    update() {
        // Decrement AI timers
        this._aiDirectionTimer -= this.dt;
        this._aiFireTimer -= this.dt;

        // Time to change direction?
        if (this._aiDirectionTimer <= 0) {
            this._changeDirection();
            this._aiDirectionTimer = this._randomDirectionInterval();
        }

        // Time to try firing?
        if (this._aiFireTimer <= 0) {
            this._aiFireTimer = this._randomFireInterval();
            // Return fire result to Game so it can add the bullet to ObjectContainer
            // We store it temporarily; Game.js will check and collect it
            this._pendingBullet = super.fire();
        }

        // Always moving
        this.speed = this.defaultSpeed;
        super.update();
    }

    /**
     * Collect and clear any pending bullet from the AI fire logic.
     * Called by Game.js after update().
     * @returns {Bullet|null}
     */
    collectPendingBullet() {
        let bullet = this._pendingBullet || null;
        this._pendingBullet = null;
        return bullet;
    }

    /**
     * Called when the enemy collides with a wall, boundary, or another tank.
     * Immediately changes direction.
     */
    onCollision() {
        this._changeDirection();
        this._aiDirectionTimer = this._randomDirectionInterval();
    }

    _changeDirection() {
        let newDir = this._pickRandomDirection();
        // Avoid picking the same direction (try up to 3 times)
        for (let i = 0; i < 3 && newDir === this.direction; i++) {
            newDir = this._pickRandomDirection();
        }
        super.setDirection(newDir);
    }

    /**
     * Pick a random direction with ~40% bias toward DOWN (toward eagle).
     */
    _pickRandomDirection() {
        const rand = Math.random();
        if (rand < 0.4) return Direction.DOWN;
        if (rand < 0.6) return Direction.UP;
        if (rand < 0.8) return Direction.LEFT;
        return Direction.RIGHT;
    }

    /**
     * Random interval for direction changes: ~1-3 seconds in dt units.
     * dt is typically timeDifference/20, so 1 second ≈ 50 dt units.
     */
    _randomDirectionInterval() {
        return 50 + Math.random() * 100; // 1-3 seconds
    }

    /**
     * Random interval for firing: ~0.5-2 seconds in dt units.
     */
    _randomFireInterval() {
        return 25 + Math.random() * 75; // 0.5-2 seconds
    }
}
