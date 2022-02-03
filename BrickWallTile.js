import { GameObject } from '/GameObject.js'

export class BrickWallTile extends GameObject {

    constructor(halfCellX, halfCellY) {
        super();
        this.setTile(0, 256);
        this.setHalfCellPosition(halfCellX, halfCellY);
    }

    destroy() {

    }

}