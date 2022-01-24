export class GameObject {

    spriteSheet;
    x; y;
    width; height;
    posX; posY;

    constructor(spriteSheet, x, y, width, height) {
        this.spriteSheet = spriteSheet;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        posX = 0;
        posY = 0;
    }

    draw(context) {
        context.drawImage(this.spriteSheet, this.x, this.y, this.width, this.height, this.posX, this.posY, this.width, this.height);
    }
}