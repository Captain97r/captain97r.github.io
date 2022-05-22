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
}