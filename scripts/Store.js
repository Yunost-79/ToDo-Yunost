import { EventEmitter } from './EventEmitter.js';

class Store extends EventEmitter {
    constructor() {
        super();
        this.state = {
            todos: JSON.parse(localStorage.getItem('todos')) || [],
            // filteredTodos: JSON.parse(localStorage.getItem('filteredTodos')) || [],
            filter: 'all',
            counter: 0,
        };
    }

    setState(key, value) {
        this.state[key] = value;
        this.dispatch('update', this.state[key]);
        localStorage.setItem(key, JSON.stringify(value));
    }

    getState(key) {
        if (!key) return this.state;
        return this.state[key];
    }
}

export const state = new Store();
