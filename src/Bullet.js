// Helper function to check if two positions are horizontally adjacent
// Positions can be integers (0, 1) or midpoints (0.5)
function areHorizontallyAdjacent(pos1, pos2) {
    // Check if they share the same y-coordinate and have adjacent x-coordinates
    const yMatch = Math.abs((pos1.y || 0) - (pos2.y || 0)) < 0.1;
    
    // For integer positions: 0 and 1 are adjacent
    if (!Number.isInteger(pos1.x) && !Number.isInteger(pos2.x)) {
        return yMatch && Math.abs((pos1.x || 0) - (pos2.x || 0)) < 0.6;
    }
    
    // For integer positions: check exact adjacency
    const xValues = [pos1.x, pos2.x].sort((a, b) => a - b);
    return yMatch && xValues[1] - xValues[0] === 1;
}

// Helper function to check if two positions are vertically adjacent
function areVerticallyAdjacent(pos1, pos2) {
    // Check if they share the same x-coordinate and have adjacent y-coordinates
    const xMatch = Math.abs((pos1.x || 0) - (pos2.x || 0)) < 0.1;
    
    // For integer positions: check exact adjacency
    const yValues = [pos1.y, pos2.y].sort((a, b) => a - b);
    return xMatch && yValues[1] - yValues[0] === 1;
}

// Helper function to check if two wall positions are in the same tile
function isInSameTile(wall1, wall2, tolerance = 8) {
    const dx = Math.abs(wall1._posX - wall2._posX);
    const dy = Math.abs(wall1._posY - wall2._posY);
    return dx < tolerance && dy < tolerance;
}

class Bullet extends GameObject {

    constructor(speed = 5, direction = Direction.UP, team = 'player') {
        super();
        this.setSpriteContainer(Globals.objects.bullets.tiles, Globals.objects.bullets.objectSizeX, Globals.objects.bullets.objectSizeY);
        this.direction = direction;
        this.dt = 0;
        this.speed = speed;
        this._isActive = true;
        this._team = team;  // 'player' or 'enemy'

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

    getTeam() {
        return this._team;
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

        // Mark bullet as inactive if it goes outside the stage boundaries
        // Use same boundaries as player collision in Game.js
        const leftBoundary = Globals.STAGE_W_OFFSET * Globals.SPRITE_SIZE;
        const rightBoundary = (Globals.STAGE_WIDTH + Globals.STAGE_W_OFFSET) * Globals.SPRITE_SIZE - Globals.BULLET_SIZE_X;
        const topBoundary = Globals.STAGE_H_OFFSET * Globals.SPRITE_SIZE;
        const bottomBoundary = (Globals.STAGE_HEIGHT + Globals.STAGE_H_OFFSET) * Globals.SPRITE_SIZE - Globals.BULLET_SIZE_Y;

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

    /**
     * Check if bullet collides with any wall in the provided array.
     * Uses AABB collision detection.
     * @param {Array} walls - Array of wall objects (BrickWall or ConcreteWall)
     * @returns {{ collided: boolean, wallType: string|null, hitWall: BrickWall|ConcreteWall|null }} Collision result
     */
    checkWallCollision(walls) {
        if (!walls || !Array.isArray(walls)) {
            return { collided: false, wallType: null, hitWall: null };
        }

        for (let wall of walls) {
            // Check AABB collision between bullet and wall
            const bulletLeft = this._posX;
            const bulletRight = this._posX + Globals.BULLET_SIZE_X;
            const bulletTop = this._posY;
            const bulletBottom = this._posY + Globals.BULLET_SIZE_Y;

            const wallLeft = wall.getLeftBoundary();
            const wallRight = wall.getRightBoundary();
            const wallTop = wall.getTopBoundary();
            const wallBottom = wall.getBottomBoundary();

            // AABB collision check
            if (bulletLeft < wallRight && 
                bulletRight > wallLeft && 
                bulletTop < wallBottom && 
                bulletBottom > wallTop) {
                
                // Determine wall type based on constructor
                const isBrick = wall.constructor.name === 'BrickWall';
                return { collided: true, wallType: isBrick ? 'brick' : 'concrete', hitWall: wall };
            }
        }

        return { collided: false, wallType: null, hitWall: null };
    }

    /**
     * Find adjacent brick walls that should also be destroyed.
     * A wall is considered adjacent if it shares an edge with the hit wall's sub-tile position
     * and they are in the same map tile.
     * @param {BrickWall} hitWall - The wall object that was initially hit
     * @param {Array<BrickWall>} allBrickWalls - All brick walls in the game
     * @returns {Array<BrickWall>} Array of adjacent walls to destroy
     */
    findAdjacentWalls(hitWall, allBrickWalls) {
        const hitPos = hitWall.getSubTilePosition();
        const adjacentWalls = [];
        
        // Check each wall in the array for adjacency
        for (let wall of allBrickWalls) {
            if (wall === hitWall || !wall.isActive()) continue; // Skip self and inactive walls
            
            const wallPos = wall.getSubTilePosition();
            
            // First check: walls must be in the same tile to be adjacent
            if (!isInSameTile(hitWall, wall)) {
                continue;
            }
            
            // Skip full brick walls (they occupy all sub-tiles and don't have neighbors)
            if ((hitPos.x === 0.5 && hitPos.y === 0.5) || 
                (wallPos.x === 0.5 && wallPos.y === 0.5)) {
                continue;
            }
            
            // Check horizontal adjacency (same row, adjacent columns)
            if (hitPos.y !== undefined && wallPos.y !== undefined &&
                areHorizontallyAdjacent(hitPos, wallPos)) {
                adjacentWalls.push(wall);
                continue; // Found one match, no need to check vertical
            }
            
            // Check vertical adjacency (same column, adjacent rows)
            if (hitPos.x !== undefined && wallPos.x !== undefined &&
                areVerticallyAdjacent(hitPos, wallPos)) {
                adjacentWalls.push(wall);
            }
        }
        
        return adjacentWalls;
    }

    /**
     * Handle bullet-wall collision by destroying brick walls and deactivating the bullet.
     * @param {Array<BrickWall>} brickWalls - Array of all active brick walls
     */
    handleWallCollision(brickWalls) {
        const collisionResult = this.checkWallCollision(brickWalls);
        
        if (collisionResult.collided && collisionResult.wallType === 'brick' && collisionResult.hitWall) {
            // Destroy the hit wall and any adjacent walls
            const wallsToDestroy = [collisionResult.hitWall, ...this.findAdjacentWalls(collisionResult.hitWall, brickWalls)];
            
            // Use a Set to avoid destroying the same wall twice
            const uniqueWallsToDestroy = [...new Set(wallsToDestroy)];
            
            for (let wall of uniqueWallsToDestroy) {
                if (wall.isActive()) {
                    wall.destroy();
                }
            }
        }
        
        // Deactivate the bullet after collision
        this.destroy();
    }

    /**
     * Deactivate the bullet (stop rendering and update)
     */
    destroy() {
        this._isActive = false;
    }
}
