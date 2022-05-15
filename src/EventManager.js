class EventManager {

    constructor() {
        this._subscribers = {};
    }

    addSubscriber(subscriber, events) {
        for (var i in events) {
            if (!this._subscribers[events[i]]) {
                this._subscribers[events[i]] = [];
            }
            this._subscribers[events[i]].push(subscriber);
        }
    }

    removeSubscriber() {
        for (var i in this._subscribers) {
            for (var j in this._subscribers[i]) {
                if (this._subscribers[i][j] === subscriber) {
                this._subscribers[i].splice(j, 1);
                }
            }
        }
    }

    removeAllSubscribers() {
        this._subscribers = {};
    }

    triggerEvent(event) {
        var subscribers = this._subscribers[event.name];
        for (var i in subscribers) {
          subscribers[i].notify(event);
        }
    }

}