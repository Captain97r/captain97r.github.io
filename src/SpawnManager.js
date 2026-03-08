class SpawnManager {

    /**
     * @param {Array<number>} enemyComposition - Array of 20 EnemyTypeEnum values
     * @param {ObjectContainer} objectContainer - Reference to check screen enemy count
     */
    constructor(enemyComposition, objectContainer) {
        this._enemyComposition = enemyComposition;
        this._objectContainer = objectContainer;
        this._totalEnemies = enemyComposition.length;
        this._spawnedCount = 0;
        this._destroyedCount = 0;

        // 3 fixed spawn positions (stage coordinates, before offset)
        this._spawnPositions = [
            { x: 0, y: 0 },      // Top-left
            { x: 192, y: 0 },    // Top-center (column 6)
            { x: 384, y: 0 },    // Top-right (column 12)
        ];
        this._nextSpawnPosIndex = 0;

        // Max 4 enemies on screen at once
        this._maxOnScreen = 4;

        // Spawn timer: ~3 seconds (150 dt units at dt≈timeDiff/20)
        this._spawnInterval = 150;
        // Start with a short initial delay
        this._spawnTimer = 50;
    }

    /**
     * Called each frame with time delta.
     * @param {number} dt - Time delta
     * @returns {EnemyTank|null} - New enemy tank to add to game, or null
     */
    update(dt) {
        // All enemies already spawned
        if (this._spawnedCount >= this._totalEnemies) {
            return null;
        }

        this._spawnTimer -= dt;

        if (this._spawnTimer <= 0) {
            this._spawnTimer = this._spawnInterval;

            // Check if room for more enemies on screen
            const currentOnScreen = this._objectContainer.getEnemyTanks().length;
            if (currentOnScreen >= this._maxOnScreen) {
                return null;
            }

            // Check if spawn position is clear (no tank overlapping)
            const pos = this._spawnPositions[this._nextSpawnPosIndex];
            const spawnPixelX = pos.x + (Globals.STAGE_W_OFFSET * Globals.SPRITE_SIZE);
            const spawnPixelY = pos.y + (Globals.STAGE_H_OFFSET * Globals.SPRITE_SIZE);
            const tankSize = 32;

            if (this._isSpawnBlocked(spawnPixelX, spawnPixelY, tankSize)) {
                // Try next position
                this._nextSpawnPosIndex = (this._nextSpawnPosIndex + 1) % this._spawnPositions.length;
                this._spawnTimer = 25; // Retry sooner
                return null;
            }

            // Spawn the next enemy
            const enemyType = this._enemyComposition[this._spawnedCount];
            const enemy = new EnemyTank(enemyType);
            enemy.setXYPosition(pos.x, pos.y);

            this._spawnedCount++;
            this._nextSpawnPosIndex = (this._nextSpawnPosIndex + 1) % this._spawnPositions.length;

            return enemy;
        }

        return null;
    }

    /**
     * Check if any tank overlaps the given spawn position.
     */
    _isSpawnBlocked(x, y, size) {
        const objects = this._objectContainer.getObjects();
        for (let obj of objects) {
            if (obj instanceof Tank) {
                if (x < obj.getRightBoundary() &&
                    (x + size) > obj.getLeftBoundary() &&
                    y < obj.getBottomBoundary() &&
                    (y + size) > obj.getTopBoundary()) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Notify that an enemy has been destroyed (for win condition tracking).
     */
    onEnemyDestroyed() {
        this._destroyedCount++;
    }

    /**
     * Check if the stage is complete (all enemies spawned and destroyed).
     */
    isStageComplete() {
        return this._spawnedCount >= this._totalEnemies &&
               this._destroyedCount >= this._totalEnemies;
    }

    /**
     * Get remaining enemies to spawn (for UI display).
     */
    getRemainingCount() {
        return this._totalEnemies - this._spawnedCount;
    }
}
