import { WallTileEnum, ObjectEnum } from '/ObjectEnum.js'
import { GameObject } from './GameObject.js';
import { BrickWallTile } from '/BrickWallTile.js'

export class BrickWall extends GameObject {
    constructor(wallType, cellX, cellY) {
        super();
        this.brickWallArray = new Array();

        let halfCellX = cellX * 2;
        let halfCellY = cellY * 2;

        if (wallType == ObjectEnum.BW_RIGHT) {
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_NONE, halfCellX,      halfCellY));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_FULL, halfCellX + 1,  halfCellY));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_NONE, halfCellX,      halfCellY + 1));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_FULL, halfCellX + 1,  halfCellY + 1));
        }
        else if (wallType == ObjectEnum.BW_LEFT) {
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_FULL, halfCellX,      halfCellY));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_NONE, halfCellX + 1,  halfCellY));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_FULL, halfCellX,      halfCellY + 1));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_NONE, halfCellX + 1,  halfCellY + 1));
        }
        else if (wallType == ObjectEnum.BW_TOP) {
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_FULL, halfCellX,      halfCellY));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_FULL, halfCellX + 1,  halfCellY));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_NONE, halfCellX,      halfCellY + 1));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_NONE, halfCellX + 1,  halfCellY + 1));
        }
        else if (wallType == ObjectEnum.BW_BOT) {
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_NONE, halfCellX,      halfCellY));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_NONE, halfCellX + 1,  halfCellY));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_FULL, halfCellX,      halfCellY + 1));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_FULL, halfCellX + 1,  halfCellY + 1));
        }
        else if (wallType == ObjectEnum.BW_TR) {
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_NONE, halfCellX,      halfCellY));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_FULL, halfCellX + 1,  halfCellY));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_NONE, halfCellX,      halfCellY + 1));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_NONE, halfCellX + 1,  halfCellY + 1));
        }
        else if (wallType == ObjectEnum.BW_TL) {
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_FULL, halfCellX,      halfCellY));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_NONE, halfCellX + 1,  halfCellY));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_NONE, halfCellX,      halfCellY + 1));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_NONE, halfCellX + 1,  halfCellY + 1));
        }
        else if (wallType == ObjectEnum.BW_BL) {
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_NONE, halfCellX,      halfCellY));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_NONE, halfCellX + 1,  halfCellY));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_FULL, halfCellX,      halfCellY + 1));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_NONE, halfCellX + 1,  halfCellY + 1));
        }
        else if (wallType == ObjectEnum.BW_BR) {
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_NONE, halfCellX,      halfCellY));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_NONE, halfCellX + 1,  halfCellY));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_NONE, halfCellX,      halfCellY + 1));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_FULL, halfCellX + 1,  halfCellY + 1));
        }
        else if (wallType == ObjectEnum.BW_FULL) {
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_FULL, halfCellX,      halfCellY));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_FULL, halfCellX + 1,  halfCellY));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_FULL, halfCellX,      halfCellY + 1));
            this.brickWallArray.push(new BrickWallTile(WallTileEnum.BRICK_FULL, halfCellX + 1,  halfCellY + 1));
        }
    }


    draw(context) {
        this.brickWallArray.forEach(element => element.draw(context));
    }
}