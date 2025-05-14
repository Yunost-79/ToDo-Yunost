import { Helpers } from './helpers.js';
import { state } from './Store.js';

export class TodoList {
    constructor() {
        this.helper = new Helpers();
        this.status = this.helper.status;

        this.filterStatus = state.getState('filter');
        this.filteringTodos(this.filterStatus);
    }

    addTodo(value) {
        const status = this.status;
        const todos = state.getState('todos');

        const todo = {
            id: Date.now(),
            value: value,
            isEdit: false,
            status: status.active,
            dateOfCreation: Date.now(),
            dateOfEdit: 0,
        };

        const updatedTodos = [...todos, todo];
        state.setState('todos', updatedTodos);
        this.filteringTodos(this.filterStatus);
    }

    removeTodo(id) {
        const todos = state.getState('todos');
        const filteredTodos = todos.filter((todo) => todo.id !== id);
        state.setState('todos', filteredTodos);
        this.filteringTodos(this.filterStatus);
    }

    removeAllTodos() {
        state.setState('todos', []);
        this.filteringTodos(this.filterStatus);
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
        this.filteringTodos(this.filterStatus);
    }

    openCloseEditTodo(id, editState) {
        const todos = state.getState('todos');

        console.log('todos in open Edit', todos);

        const openEditTodo = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, isEdit: editState };
            }
            return todo;
        });
        state.setState('todos', openEditTodo);
        this.filteringTodos(this.filterStatus);
    }

    closeAllEditTodos() {
        const todos = state.getState('todos');

        if (!todos) return;
        todos.forEach((todo) => (todo.isEdit = false));
        state.setState('todos', todos);
        this.filteringTodos(this.filterStatus);
    }

    changeTodoContext(id, value) {
        const todos = state.getState('todos');

        const changedTodoContext = todos.map((todo) => {
            if (todo.value === value || value === '') return todo;
            if (todo.id === id) {
                return { ...todo, value };
            }
            return todo;
        });
        state.setState('todos', changedTodoContext);
        this.filteringTodos(this.filterStatus);
    }

    filteringTodos(filterValue) {
        const status = this.status;
        const todos = state.getState('todos');

        this.filterStatus = filterValue || status.all;
        state.setState('filter', this.filterStatus);

        let filteredTodos = [];

        switch (filterValue) {
            case status.active:
                filteredTodos = todos.filter((todo) => todo.status === status.active);
                break;
            case status.completed:
                filteredTodos = todos.filter((todo) => todo.status === status.completed);
                break;
            default:
                filteredTodos = [...todos];
        }

        const sortedByTimeTodos = filteredTodos.sort((a, b) => b.dateOfCreation - a.dateOfCreation);

        state.setState('filteredTodos', sortedByTimeTodos);
        state.setState('counter', filteredTodos.length);
    }

    changeFiltersClass(filterBlock, activeFilterValue) {
        return filterBlock.map((filter) => ({ ...filter, isActive: filter.value === activeFilterValue }));
    }
}
