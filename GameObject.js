export class GameObject {

    spriteSheet;
    x; y;
    width; height;
    posX; posY;

    constructor(spriteSheet, x, y, width, height) {
        this.spriteSheet = spriteSheet;
        this.spritePosX = x;
        this.spritePosY = y;
        this.width = width;
        this.height = height;
        this.posX = 0;
        this.posY = 0;
        this.spriteShiftX = 0;
        this.spriteShiftY = 0;
    }

    setPosition(x, y) {
        this.posX = x * 16;
        this.posY = y * 16;
    }

    setSpriteShift(x, y) {
        this.spriteShiftX = x;
        this.spriteShiftY = y;
    }

    draw(context) {
        context.drawImage(  this.spriteSheet, 
                            this.spritePosX + this.spriteShiftX,    this.spritePosY + this.spriteShiftY, 
                            this.width,                             this.height, 
                            this.posX,                              this.posY, 
                            this.width,                             this.height);
    }
}