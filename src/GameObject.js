class GameObject {

    constructor() {
        this._posX = Globals.STAGE_W_OFFSET;
        this._posY = Globals.STAGE_H_OFFSET;
        this._frameContainer = {};
        this._activeFrameX;
        this._activeFrameY;
    }

    setSpriteContainer(container, width, height) {
        this._frameContainer = container;
        this._width = width;
        this._height = height;
    }

    setXYPosition(x, y) {
        this._posX = x + (Globals.STAGE_W_OFFSET * Globals.SPRITE_SIZE);
        this._posY = y + (Globals.STAGE_H_OFFSET * Globals.SPRITE_SIZE);
    }

    draw(context) {
        context.drawImage(  Globals.spriteSheet, 
                            this._activeFrameX,     this._activeFrameY, 
                            this._width,            this._height, 
                            this._posX,             this._posY, 
                            this._width,            this._height);
    }

    getRightBoundary() {
        return this._posX + this._width;
    }

    getLeftBoundary() {
        return this._posX;
    }

    getTopBoundary() {
        return this._posY;
    }

    getBottomBoundary() {
        return this._posY + this._height;
    }
}