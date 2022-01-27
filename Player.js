import { GameObject } from '/GameObject.js'
import { Tank } from '/Tank.js'
import { Direction } from '/Direction.js'

export class Player extends Tank {

    pressedKeys;

    constructor(spriteSheet) {
        super(spriteSheet);
        this.pressedKeys = new Array();
        super.setDirection(Direction.UP);
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