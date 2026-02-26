class BrickWall extends GameObject {

    constructor(tile) {
        super();
        
        // Initialize sub-tile position for adjacency detection
        this._subTilePosition = this._getSubTilePositionForTile(tile);
        
        switch(tile)
        {
            case WallTileEnum.BRICK_FULL:
                this.setSpriteContainer(Globals.objects.walls.brickWall.tiles.full, Globals.objects.walls.objectSizeX, Globals.objects.walls.objectSizeY);
                break;
            case WallTileEnum.BRICK_LEFT:
                this.setSpriteContainer(Globals.objects.walls.brickWall.tiles.left, Globals.objects.walls.objectSizeX, Globals.objects.walls.objectSizeY);
                break;
            case WallTileEnum.BRICK_BOT:
                this.setSpriteContainer(Globals.objects.walls.brickWall.tiles.bot, Globals.objects.walls.objectSizeX, Globals.objects.walls.objectSizeY);
                break;
            case WallTileEnum.BRICK_RIGHT:
                this.setSpriteContainer(Globals.objects.walls.brickWall.tiles.right, Globals.objects.walls.objectSizeX, Globals.objects.walls.objectSizeY);
                break;
            case WallTileEnum.BRICK_TOP:
                this.setSpriteContainer(Globals.objects.walls.brickWall.tiles.top, Globals.objects.walls.objectSizeX, Globals.objects.walls.objectSizeY);
                break;
            case WallTileEnum.BRICK_A_BR:
                this.setSpriteContainer(Globals.objects.walls.brickWall.tiles.a_br, Globals.objects.walls.objectSizeX, Globals.objects.walls.objectSizeY);
                break;
            case WallTileEnum.BRICK_A_BL:
                this.setSpriteContainer(Globals.objects.walls.brickWall.tiles.a_bl, Globals.objects.walls.objectSizeX, Globals.objects.walls.objectSizeY);
                break;
            case WallTileEnum.BRICK_A_TL:
                this.setSpriteContainer(Globals.objects.walls.brickWall.tiles.a_tl, Globals.objects.walls.objectSizeX, Globals.objects.walls.objectSizeY);
                break;
            case WallTileEnum.BRICK_A_TR:
                this.setSpriteContainer(Globals.objects.walls.brickWall.tiles.a_tr, Globals.objects.walls.objectSizeX, Globals.objects.walls.objectSizeY);
                break;
            case WallTileEnum.BRICK_P_TL:
                this.setSpriteContainer(Globals.objects.walls.brickWall.tiles.p_tl, Globals.objects.walls.objectSizeX, Globals.objects.walls.objectSizeY);
                break;
            case WallTileEnum.BRICK_P_TR:
                this.setSpriteContainer(Globals.objects.walls.brickWall.tiles.p_tr, Globals.objects.walls.objectSizeX, Globals.objects.walls.objectSizeY);
                break;
            case WallTileEnum.BRICK_P_BR:
                this.setSpriteContainer(Globals.objects.walls.brickWall.tiles.p_br, Globals.objects.walls.objectSizeX, Globals.objects.walls.objectSizeY);
                break;
            case WallTileEnum.BRICK_P_BL:
                this.setSpriteContainer(Globals.objects.walls.brickWall.tiles.p_bl, Globals.objects.walls.objectSizeX, Globals.objects.walls.objectSizeY);
                break;
        }
        
        // Use first frame from the sprite container
        if (this._frameContainer && this._frameContainer.frameX.length > 0) {
            this._activeFrameX = this._frameContainer.frameX[0];
            this._activeFrameY = this._frameContainer.frameY[0];
        }
        
        this._isActive = true;
    }

    /**
     * Returns the sub-tile position for a given wall tile type.
     * Uses a 2x2 grid system where positions are: {x, y} with values 0 or 1
     * Special case: BRICK_FULL returns null to indicate it occupies all sub-tiles
     * @param {number} tile - The wall tile enum value
     * @returns {{x: number, y: number}|null} Sub-tile position object or null for full tiles
     */
    _getSubTilePositionForTile(tile) {
        switch (tile) {
            case WallTileEnum.BRICK_FULL:
                // Full brick wall occupies the entire tile - special marker for all sub-tiles
                return { x: 0.5, y: 0.5 };
            
            // Single-sided bricks occupy half of a tile (midpoint positions)
            case WallTileEnum.BRICK_LEFT:
                return { x: 0, y: 0.5 };  // Left edge midpoint
            case WallTileEnum.BRICK_RIGHT:
                return { x: 1, y: 0.5 };  // Right edge midpoint
            case WallTileEnum.BRICK_TOP:
                return { x: 0.5, y: 0 };  // Top edge midpoint
            case WallTileEnum.BRICK_BOT:
                return { x: 0.5, y: 1 };  // Bottom edge midpoint
            
            // A-pattern walls (corner pieces spanning multiple tiles)
            case WallTileEnum.BRICK_A_BR:  // Bottom-right corner piece
                return { x: 1, y: 1 };
            case WallTileEnum.BRICK_A_BL:  // Bottom-left corner piece
                return { x: 0, y: 1 };
            case WallTileEnum.BRICK_A_TL:  // Top-left corner piece
                return { x: 0, y: 0 };
            case WallTileEnum.BRICK_A_TR:  // Top-right corner piece
                return { x: 1, y: 0 };
            
            // P-pattern walls (L-shaped pieces)
            case WallTileEnum.BRICK_P_TL:  // Top-left L-corner
                return { x: 0, y: 0 };
            case WallTileEnum.BRICK_P_TR:  // Top-right L-corner
                return { x: 1, y: 0 };
            case WallTileEnum.BRICK_P_BR:  // Bottom-right L-corner
                return { x: 1, y: 1 };
            case WallTileEnum.BRICK_P_BL:  // Bottom-left L-corner
                return { x: 0, y: 1 };
            
            default:
                // Fallback to center position for unknown tile types
                return { x: 0.5, y: 0.5 };
        }
    }

    /**
     * Returns the sub-tile position of this wall piece.
     * Used by Bullet.findAdjacentWalls() to determine which walls are connected.
     * @returns {{x: number, y: number}|null} Position object with x,y values (0, 1, or 0.5)
     */
    getSubTilePosition() {
        return this._subTilePosition;
    }

    destroy() {
        // Mark brick wall as inactive so it gets removed from the game
        this._isActive = false;
    }

    isActive() {
        return this._isActive;
    }
}
