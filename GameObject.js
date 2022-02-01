export class GameObject {

    constructor(spriteSheet, x, y, width, height) {
        this.spriteSheet = spriteSheet;
        this.spritePosX = x;
        this.spritePosY = y;
        this.width = width;
        this.height = height;
        this.posX = 0;
        this.posY = 0;
        this.spriteBiasX = 0;
        this.spriteBiasY = 0;
    }

    setXYPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }

    setHalfCellPosition(x, y) {
        this.posX = x * 16;
        this.posY = y * 16;
    }

    setCellPosition(x, y) {
        this.posX = x * 32;
        this.posY = y * 32;
    }

    setSpriteBias(x, y) {
        this.spriteBiasX = x;
        this.spriteBiasY = y;
    }

    draw(context) {
        context.drawImage(  this.spriteSheet, 
                            this.spritePosX + this.spriteBiasX,     this.spritePosY + this.spriteBiasY, 
                            this.width,                             this.height, 
                            this.posX,                              this.posY, 
                            this.width,                             this.height);
    }
}