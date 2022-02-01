import { BrickWallTail } from '/BrickWallTail.js'

export class BrickWall {
    constructor(spriteSheet, x, y)    {
        this.brickWallArray = new Array();

        this.brickWallArray.push(new BrickWallTail(spriteSheet, x,      y));
        this.brickWallArray.push(new BrickWallTail(spriteSheet, x + 1,  y));
        this.brickWallArray.push(new BrickWallTail(spriteSheet, x,      y + 1));
        this.brickWallArray.push(new BrickWallTail(spriteSheet, x + 1,  y + 1));
    }

    draw(context) {
        this.brickWallArray.forEach(element => element.draw(context));
    }
}