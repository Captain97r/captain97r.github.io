class ObjectContainer {

    constructor() {
        this._objectContainer = new Array();
    }

    addObject(object) {
        this._objectContainer.push(object);
    }

    getObjects() {
        return this._objectContainer;
    }

    getAllyTanks() {
        for (var i = 0; i < this._objectContainer.length; i++) {
            if (this._objectContainer[i] instanceof Player) {
              return this._objectContainer[i];
            }
          }
          return null;
    }

    // Remove objects that are no longer needed (e.g. off-screen bullets)
    removeInactiveObjects() {
        for (let i = this._objectContainer.length - 1; i >= 0; i--) {
            const obj = this._objectContainer[i];
            if (obj && typeof obj.isActive === 'function' && !obj.isActive()) {
                this._objectContainer.splice(i, 1);
            }
        }
    }
}