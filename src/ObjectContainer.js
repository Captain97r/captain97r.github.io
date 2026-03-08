class ObjectContainer {

    constructor() {
        this._objectContainer = new Array();
    }

    addObject(object) {
        this._objectContainer.push(object);
    }

    getObjects() {
        return this._objectContainer;
    }

    getAllyTanks() {
        for (var i = 0; i < this._objectContainer.length; i++) {
            if (this._objectContainer[i] instanceof Player) {
              return this._objectContainer[i];
            }
          }
          return null;
    }

    /**
     * Get all wall objects from the container.
     * @returns {Array} Array of BrickWall and ConcreteWall instances
     */
    getWalls() {
        const walls = [];
        for (let obj of this._objectContainer) {
            if (obj instanceof BrickWall || obj instanceof ConcreteWall) {
                walls.push(obj);
            }
        }
        return walls;
    }

    /**
     * Get all enemy tank objects from the container.
     * @returns {Array<EnemyTank>}
     */
    getEnemyTanks() {
        const enemies = [];
        for (let obj of this._objectContainer) {
            if (obj instanceof EnemyTank) {
                enemies.push(obj);
            }
        }
        return enemies;
    }

    /**
     * Get all bullet objects from the container.
     * @returns {Array<Bullet>}
     */
    getBullets() {
        const bullets = [];
        for (let obj of this._objectContainer) {
            if (obj instanceof Bullet) {
                bullets.push(obj);
            }
        }
        return bullets;
    }

    // Remove objects that are no longer needed (e.g. off-screen bullets)
    removeInactiveObjects() {
        for (let i = this._objectContainer.length - 1; i >= 0; i--) {
            const obj = this._objectContainer[i];
            if (obj && typeof obj.isActive === 'function' && !obj.isActive()) {
                this._objectContainer.splice(i, 1);
            }
        }
    }
}
