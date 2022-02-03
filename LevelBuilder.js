import { BrickWall } from '/BrickWall.js'

export class LevelBuilder {
    constructor(ctx, spriteSheet) {
        this.ctx = ctx;
        this.spriteSheet = spriteSheet;
    }

    build(field, walls) {
        for (var i = 0; i < field.length; i++) {
            for (var j = 0; j < field[i].length; j++) {
                if (field[j][i] == 1) {
                    walls.push(new BrickWall(i, j));
                }
            }
        }
    }
}