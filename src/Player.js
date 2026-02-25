class Player extends Tank {

    constructor() {
        super();
        this.setSpriteContainer(Globals.objects.tanks.friendlyTank.types.stock.animation, Globals.objects.tanks.objectSizeX, Globals.objects.tanks.objectSizeY);
        this._pressedKeys = new Array();
        this._fireCooldown = 0;
    }
    
    pushKey(direction) {
        if (this._pressedKeys.indexOf(direction) == -1) {
            this._pressedKeys.push(direction);

            super.setDirection(direction);
            super.startMotion();
        }
    }

    popKey(direction) {
        if (this._pressedKeys.indexOf(direction) != -1) {
            this._pressedKeys.splice(this._pressedKeys.indexOf(direction), 1);

            if (this._pressedKeys.length > 0) {
                super.setDirection(this._pressedKeys[this._pressedKeys.length - 1]);
            } else {
                super.stopMotion();
            }
        }
    }

    update() {
        // Handle cooldown for firing
        if (this._fireCooldown > 0) {
            this._fireCooldown--;
        }
        
        super.update();
    }

    fire() {
        // Check if we're allowed to fire based on cooldown
        if (this._fireCooldown <= 0) {
            let bullet = super.fire();
            this._fireCooldown = 10; // Set cooldown period (adjust as needed)
            return bullet;
        }
        return null; // Return null if not allowed to fire
    }
}