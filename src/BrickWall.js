class BrickWall extends GameObject {

    constructor(tile) {
        super();
        switch(tile)
        {
            case WallTileEnum.BRICK_FULL:
                this.setSpriteContainer(Globals.objects.walls.brickWall.tiles.full, Globals.objects.walls.objectSizeX, Globals.objects.walls.objectSizeY);
                break;
        }
        
        this._activeFrameX = this._frameContainer.frameX[0];
        this._activeFrameY = this._frameContainer.frameY[0];
        this._isActive = true;
    }

    destroy() {
        // Mark brick wall as inactive so it gets removed from the game
        this._isActive = false;
    }

    isActive() {
        return this._isActive;
    }
}
