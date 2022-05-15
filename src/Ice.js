class Ice extends GameObject {

    constructor() {
        super();
        this.setSpriteContainer(Globals.objects.walls.ice.tile, Globals.objects.walls.objectSizeX, Globals.objects.walls.objectSizeY);
        
        this._activeFrameX = this._frameContainer.frameX[0];
        this._activeFrameY = this._frameContainer.frameY[0];
    }
}