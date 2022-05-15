class Player extends Tank {

    constructor() {
        super();
        this.setSpriteContainer(Globals.objects.tanks.friendlyTank.types.stock.animation, Globals.objects.tanks.objectSizeX, Globals.objects.tanks.objectSizeY);
        this._pressedKeys = new Array();
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
}