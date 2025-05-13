import { EventEmitter } from './EventEmitter.js';
import { state } from './Store.js';

export class TodoList extends EventEmitter {
    constructor() {
        super();

        this.status = {
            all: 'all',
            active: 'active',
            completed: 'completed',
        };

        this.filterStatus = state.getState('filter') || this.status.all;
        // this.todos = [];
        // this.filteredTodos = [];
        // this.filterStatus = this.getFilter() || this.status.all;

        // this.getData();
    }

    addTodo(value) {
        const status = this.status;
        const todos = state.getState('todos');

        const todo = {
            id: Date.now(),
            value: value,
            isEdit: false,
            status: status.active,
        };

        const updatedTodos = [...todos, todo];
        state.setState('todos', updatedTodos);

        console.log('state after add todo:', state.getState('todos'));
    }

    removeTodo(id) {
        const todos = state.getState('todos');
        const filteredTodos = todos.filter((todo) => todo.id !== id);
        state.setState('todos', filteredTodos);
        console.log('state after remove todo:', state.getState('todos'));
    }

    removeAllTodos() {
        state.setState('todos', []);
        console.log('state after remove All todos:', state.getState('todos'));
    }

    toggleStatus(id) {
        const status = this.status;
        const todos = state.getState('todos');

        const toggledTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, status: todo.status !== status.active ? status.active : status.completed };
            }
            return todo;
        });
        state.setState('todos', toggledTodos);
        console.log('state after toggle status todos:', state.getState('todos'));
    }

    // filteringTodos(filterValue) {
    //     const status = this.status;

    //     this.filterStatus = filterValue || status.all;

    //     switch (filterValue) {
    //         case status.active:
    //             this.filteredTodos = this.todos.filter((todo) => todo.status === status.active);
    //             break;
    //         case status.completed:
    //             this.filteredTodos = this.todos.filter((todo) => todo.status === status.completed);
    //             break;
    //         default:
    //             this.filteredTodos = [...this.todos];
    //     }
    // this.setFilter();
    // this.dispatch('update', this.filteredTodos);
    // }

    // setLocalStorage(storageName, storageData) {
    //     return localStorage.setItem(storageName, JSON.stringify(storageData));
    // }

    // getLocalStorage(storageName) {
    //     return JSON.parse(localStorage.getItem(storageName));
    // }

    // setData(storageData) {
    //     this.todos = storageData;
    //     this.setLocalStorage('todos', this.todos);
    //     this.filteringTodos(this.filterStatus);
    //     this.dispatch('update', this.filteredTodos);
    // }

    // getData() {
    //     const storedTodos = this.getLocalStorage('todos');
    //     this.todos = storedTodos ?? [];
    //     this.filteringTodos(this.filterStatus);
    // }

    // setFilter() {
    //     this.setLocalStorage('filter', this.filterStatus);
    // }

    // getFilter() {
    //     return this.getLocalStorage('filter');
    // }

    // addTodo(value) {
    //     const status = this.status;

    //     const todo = {
    //         id: Date.now(),
    //         value: value,
    //         isEdit: false,
    //         status: status.active,
    //     };

    //     state.setState('todos', todo, Array);
    //     const todos = state.getState('todos');

    //     console.log(todos);

    //     // this.todos.push(todo);
    //     // this.setData(this.todos);
    //     this.setData(todos);
    // }

    // removeTodo(id) {
    //     const filteredTodos = this.todos.filter((todo) => todo.id !== id);
    //     this.setData(filteredTodos);
    // }

    // removeAllTodos() {
    //     this.todos = [];
    //     this.setData(this.todos);
    // }

    countTodos() {
        if (!this.filteredTodos) return;

        state.setState('counter', this.filteredTodos.length || 0);
        // return this.filteredTodos.length;
    }

    // toggleStatus(id) {
    //     const status = this.status;
    //     this.todos = this.todos.map((todo) => {
    //         if (todo.id === id) {
    //             return { ...todo, status: todo.status !== status.active ? status.active : status.completed };
    //         }
    //         return todo;
    //     });

    //     this.setData(this.todos);
    // }

    // filteringTodos(filterValue) {
    //     const status = this.status;

    //     this.filterStatus = filterValue || status.all;

    //     switch (filterValue) {
    //         case status.active:
    //             this.filteredTodos = this.todos.filter((todo) => todo.status === status.active);
    //             break;
    //         case status.completed:
    //             this.filteredTodos = this.todos.filter((todo) => todo.status === status.completed);
    //             break;
    //         default:
    //             this.filteredTodos = [...this.todos];
    //     }
    //     this.setFilter();
    //     this.dispatch('update', this.filteredTodos);
    // }

    changeFiltersClass(filterBlock, activeFilterValue) {
        return filterBlock.map((filter) => ({ ...filter, isActive: filter.value === activeFilterValue }));
    }

    openCloseEditTodo(id, editState) {
        this.todos = this.todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, isEdit: editState };
            }
            return todo;
        });

        this.setData(this.todos);
    }

    closeAllEditTodos() {
        if (!this.todos) return;
        this.todos.forEach((todo) => (todo.isEdit = false));
        this.setData(this.todos);
    }

    changeTodoContext(id, value) {
        this.todos = this.todos.map((todo) => {
            if (todo.value === value || value === '') return todo;
            if (todo.id === id) {
                return { ...todo, value };
            }
            return todo;
        });
        this.setData(this.todos);
    }

    updateTodos(currentTodos) {
        this.todos = currentTodos;
        this.filteringTodos(this.filterStatus);
        return this.filteredTodos;
    }
}

// state.setState('test', 1);

// const test = state.getState('test');

// console.log(test);
