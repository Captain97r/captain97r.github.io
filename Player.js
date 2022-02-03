import { GameObject } from '/GameObject.js'
import { Tank } from '/Tank.js'
import { Direction } from '/Direction.js'

export class Player extends Tank {

    constructor(spriteSheet) {
        super(spriteSheet);
        this.setSprite(0, 0);
        this.pressedKeys = new Array();
        this.isMoving = false;
    }
    
    pushKey(direction) {
        if (this.pressedKeys.indexOf(direction) == -1) {
            this.pressedKeys.push(direction);

            super.setDirection(direction);
            super.startMotion();
        }
    }

    popKey(direction) {
        if (this.pressedKeys.indexOf(direction) != -1) {
            this.pressedKeys.splice(this.pressedKeys.indexOf(direction), 1);

            if (this.pressedKeys.length > 0) {
                super.setDirection(this.pressedKeys[this.pressedKeys.length - 1]);
            } else {
                super.stopMotion();
            }
        }
    }
}