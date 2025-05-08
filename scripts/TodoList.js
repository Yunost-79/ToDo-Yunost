import { EventEmitter } from './EventEmitter.js';

export class TodoList extends EventEmitter {
    constructor() {
        super();

        this.status = {
            all: 'all',
            active: 'active',
            completed: 'completed',
        };

        this.todos = [];
        this.filteredTodos = [];
        this.filterStatus = this.status.all;

        this.getData();
    }

    setLocalStorage(storageName, storageData) {
        return localStorage.setItem(storageName, JSON.stringify(storageData));
    }

    getLocalStorage(storageName) {
        return JSON.parse(localStorage.getItem(storageName)) ?? [];

        // try {
        //     return JSON.parse(localStorage.getItem(storageName)) ?? [];
        // } catch (e) {
        //     return [];
        // }
    }

    setData(storageName, storageData) {
        this.todos = storageData;
        this.setLocalStorage(storageName, this.todos);
        this.filteringTodos(this.filterStatus);
        this.dispatch('update', this.filteredTodos);
    }

    getData() {
        const storedTodos = this.getLocalStorage('todos');
        this.todos = storedTodos;
        this.filteringTodos(this.filterStatus);
    }

    addTodo(value) {
        const status = this.status;

        const todo = {
            id: Date.now(),
            text: value,
            isEdit: false,
            status: status.active,
        };

        this.todos.push(todo);
        this.setData('todos', this.todos);
    }

    removeTodo(id) {
        const filteredTodos = this.todos.filter((todo) => todo.id !== id);
        this.setData('todos', filteredTodos);
    }

    removeAllTodos() {
        this.todos = [];
        this.setData('todos', this.todos);
    }

    countTodos() {
        if (!this.filteredTodos) return;
        return this.filteredTodos.length;
    }

    toggleStatus(id) {
        const status = this.status;
        this.todos = this.todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, status: todo.status !== status.active ? status.active : status.completed };
            }
            return todo;
        });

        this.setData('todos', this.todos);
    }

    filteringTodos(filterValue) {
        const status = this.status;

        this.filterStatus = filterValue || status.all;

        switch (filterValue) {
            case status.active:
                this.filteredTodos = this.todos.filter((todo) => todo.status === status.active);
                break;
            case status.completed:
                this.filteredTodos = this.todos.filter((todo) => todo.status === status.completed);
                break;
            default:
                this.filteredTodos = [...this.todos];
        }

        this.dispatch('update', this.filteredTodos);
    }

    updateTodos(currentTodos) {
        this.todos = currentTodos;
        this.filteringTodos(this.filterStatus);
        return this.filteredTodos;
    }
}
