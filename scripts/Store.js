import { EventEmitter } from './EventEmitter.js';
import { Helpers } from './helpers.js';

class Store extends EventEmitter {
    constructor() {
        super();
        const helpers = new Helpers();
        const status = helpers.status;

        this.state = {
            todos: JSON.parse(localStorage.getItem('todos')) || [],
            filteredTodos: JSON.parse(localStorage.getItem('filteredTodos')) || [],
            filter: JSON.parse(localStorage.getItem('filter')) || status.all,
            counter: 0,
            warning: '',
        };
    }

    setState(key, value) {
        this.state[key] = value;
        this.dispatch('update', this.state[key]);
        localStorage.setItem(key, JSON.stringify(this.state[key]));
    }

    getState(key) {
        if (!key) return this.state;
        return this.state[key];
    }
}

export const state = new Store();
