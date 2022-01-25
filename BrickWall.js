import { GameObject } from '/GameObject.js'

export class BrickWall extends GameObject {

    constructor(spriteSheet) {
        super(spriteSheet, 0, 256, 16, 16);
    }

    destroy() {

    }

}