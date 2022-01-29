import { BrickWall } from '/BrickWall.js'

export class LevelBuilder {
    constructor(ctx, spriteSheet) {
        this.ctx = ctx;
        this.spriteSheet = spriteSheet;
    }

    build(field, walls) {
        for (var i = 0; i < field.length; i++) {
            for (var j = 0; j < field[i].length; j++) {
                if (field[i][j] == 1) {
                    walls.push(new BrickWall(this.spriteSheet));
                    walls[walls.length - 1].setPosition(i * 2, j * 2);
                    walls.push(new BrickWall(this.spriteSheet));
                    walls[walls.length - 1].setPosition(i * 2, j * 2 + 1);
                    walls.push(new BrickWall(this.spriteSheet));
                    walls[walls.length - 1].setPosition(i * 2 + 1, j * 2);
                    walls.push(new BrickWall(this.spriteSheet));
                    walls[walls.length - 1].setPosition(i * 2 + 1, j * 2 + 1);
                }
            }
        }
    }
}