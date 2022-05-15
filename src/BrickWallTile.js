class BrickWallTile extends GameObject {

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
    }

    destroy() {

    }

}