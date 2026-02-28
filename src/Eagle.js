class Eagle extends GameObject {

    constructor() {
        super();
        this.setSpriteContainer(Globals.objects.eagle.alive, Globals.objects.eagle.objectSizeX, Globals.objects.eagle.objectSizeY);
        this._activeFrameX = this._frameContainer.frameX[0];
        this._activeFrameY = this._frameContainer.frameY[0];
        this._isActive = true;
    }

    destroy() {
        this._isActive = false;
        // Switch to destroyed sprite
        this._activeFrameX = Globals.objects.eagle.destroyed.frameX[0];
        this._activeFrameY = Globals.objects.eagle.destroyed.frameY[0];
    }

    isActive() {
        return this._isActive;
    }

    draw(context) {
        // Always draw (even when destroyed — shows the broken eagle)
        context.drawImage(Globals.spriteSheet,
            this._activeFrameX, this._activeFrameY,
            this._width, this._height,
            this._posX, this._posY,
            this._width, this._height);
    }
}
