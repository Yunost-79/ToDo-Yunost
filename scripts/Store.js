class Store {
    constructor() {
        this.state = [];
    }

    setState(key, value, type) {
        switch (type) {
            case Number || String || Boolean:
                this.state[key] = value;
                break;

            case Array:
                if (!this.state[key]) {
                    this.state[key] = [value];
                } else {
                    this.state[key] = [...this.state[key], value];
                }
                console.log(this.state);
                break;
        }

        return this.state;
    }

    getState(key) {
        if (!key) return this.state;
        console.log('this.state', this.state[key]);
        return this.state[key];
    }
}

export const state = new Store();
