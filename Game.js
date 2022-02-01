import { Direction } from '/Direction.js'
import { GameObject } from '/GameObject.js'
import { Tank } from '/Tank.js'
import { Player } from '/Player.js'
import { BrickWall } from '/BrickWall.js'
import { LevelBuilder } from '/LevelBuilder.js'
import { testField } from '/TestField.js'

export class Game {

    constructor(ctx) {
        this.ctx = ctx;

        this.spriteSheet = new Image();
        this.spriteSheet.src = "img/sprites_tp.png";

        this.player = new Player(this.spriteSheet);
        this.player.setCellPosition(4, 4);
        this.brickWall = new Array();
        let levelBuilder = new LevelBuilder(ctx, this.spriteSheet);
        levelBuilder.build(testField, this.brickWall);
    }

    update() {
        this.ctx.clearRect(0, 0, 1000, 1000);
        this.player.update();
        this.player.draw(this.ctx);
        
        this.brickWall.forEach(element => element.draw(this.ctx));
    }

    setTimeDelta(dt) {
        this.player.setTimeDelta(dt);
    }

    handleKeyPress(evt) {
        switch(evt.code) {
            case "KeyW":
                this.player.pushKey(Direction.UP);
                break;
            case "KeyS":
                this.player.pushKey(Direction.DOWN);
                break;
            case "KeyA":
                this.player.pushKey(Direction.LEFT);
                break;
            case "KeyD":
                this.player.pushKey(Direction.RIGHT);
                break;
        }
    }
    
    handleKeyRelease(evt) {
        switch(evt.code) {
            case "KeyW":
                this.player.popKey(Direction.UP);
                break;
            case "KeyS":
                this.player.popKey(Direction.DOWN);
                break;
            case "KeyA":
                this.player.popKey(Direction.LEFT);
                break;
            case "KeyD":
                this.player.popKey(Direction.RIGHT);
                break;
        }
    }
}