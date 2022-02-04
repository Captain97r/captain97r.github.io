import { GameObject } from '/GameObject.js'

export class BrickWallTile extends GameObject {

    constructor(tile, halfCellX, halfCellY) {
        super();
        this.setTile(tile * 16, 256);
        this.setHalfCellPosition(halfCellX, halfCellY);
    }

    destroy() {

    }

}