class Game {

    constructor(ctx) {
        this.ctx = ctx;

        this.player = new Player();
        this.player.setXYPosition(Globals.PLAYER1_START_POS_X, Globals.PLAYER1_START_POS_Y);
        this._stage = new Array();
        this._stageBinary;

        let levelBuilder = new LevelBuilder();

        this._stageBinary = Globals.currentStageBinary;
        levelBuilder.build(this._stage, this._stageBinary);
    }


    update() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, 1000, 1000);

        this.player.update();
        this.player.draw(this.ctx);

        this._stage.forEach(element => element.draw(this.ctx));
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