export class GameObject {

    constructor() {
        this.spriteSheet = new Image();
        this.spriteSheet.src = "img/sprites_tp.png";
        
        this.posX = 0;
        this.posY = 0;
        this.spriteBiasX = 0;
        this.spriteBiasY = 0;
    }

    setSprite(x, y) {
        this.spritePosX = x;
        this.spritePosY = y;
        this.width = 32;
        this.height = 32;
    }

    setTile(x, y) {
        this.spritePosX = x;
        this.spritePosY = y;
        this.width = 16;
        this.height = 16;
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