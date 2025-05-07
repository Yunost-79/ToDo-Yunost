class EventEmitter {
    constructor() {
        this.listeners = {};
    }

    getCallbacks(eventName) {
        return this.listeners[eventName] ?? [];
    }

    setCallbacks(eventName, listeners) {
        if (listeners.length === 0) {
            delete this.listeners[eventName];
        } else {
            this.listeners[eventName] = listeners;
        }
    }

    subscribe(eventName, callback) {
        const subs = this.getCallbacks(eventName);
        subs.push(callback);
        this.setCallbacks(eventName, subs);

        return () => this.unsubscribe(eventName, callback);
    }

    unsubscribe(eventName, callback) {
        const subs = this.getCallbacks(eventName);
        const filteredSubs = subs.filter((item) => item !== callback);
        this.setCallbacks(eventName, filteredSubs);
    }

    dispatch(eventName, data) {
        const subs = this.getCallbacks(eventName);
        subs.forEach((callback) => callback(data));
    }
}
