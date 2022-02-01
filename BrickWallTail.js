import { GameObject } from '/GameObject.js'

export class BrickWallTail extends GameObject {

    constructor(spriteSheet, x, y) {
        super(spriteSheet, 0, 256, 16, 16);
        this.setHalfCellPosition(x, y);
    }

    destroy() {

    }

}