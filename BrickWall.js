import { GameObject } from './GameObject.js';
import { BrickWallTile } from '/BrickWallTile.js'

export class BrickWall extends GameObject {
    constructor(cellX, cellY) {
        super();
        this.brickWallArray = new Array();

        let halfCellX = cellX * 2;
        let halfCellY = cellY * 2;

        this.brickWallArray.push(new BrickWallTile(halfCellX,      halfCellY));
        this.brickWallArray.push(new BrickWallTile(halfCellX + 1,  halfCellY));
        this.brickWallArray.push(new BrickWallTile(halfCellX,      halfCellY + 1));
        this.brickWallArray.push(new BrickWallTile(halfCellX + 1,  halfCellY + 1));
    }


    draw(context) {
        this.brickWallArray.forEach(element => element.draw(context));
    }
}