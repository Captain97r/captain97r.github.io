import { WallTileEnum, ObjectEnum} from '/ObjectEnum.js'
import { BrickWall } from '/BrickWall.js'

export class LevelBuilder {
    constructor(ctx, spriteSheet) {
        this.ctx = ctx;
        this.spriteSheet = spriteSheet;
    }

    build(field, walls) {
        for (var i = 0; i < field.length; i++) {
            for (var j = 0; j < field[i].length; j++) {
                if (field[j][i] <= ObjectEnum.BW_FULL) {
                    walls.push(new BrickWall(field[j][i], i, j));
                }
            }
        }
    }
}