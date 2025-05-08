import { TodoList } from './TodoList.js';

export class TodoTemplate extends TodoList {
    constructor(app) {
        super();
        this.app = app;
        this.currentFilter = 'all';
        this.filterBlock = [
            { value: 'all', text: 'All', isActive: true },
            { value: 'active', text: 'Active', isActive: false },
            { value: 'completed', text: 'Completed', isActive: false },
        ];
        this.setupSubscriptions();
        this.updateDisplay();
    }

    setupSubscriptions() {
        this.subscribe('update', (todo) => {
            this.todoItemElement(todo);
            this.updateDisplay();
        });
    }

    render() {
        const todosForRender = this.filteredTodos ? this.filteredTodos : this.todos;
        const empty = this.emptyBlockElement(this.filterStatus);
        console.log(this.filterStatus);
        const todoSkeleton = `
            <div class="wrapper">
            <div class="container">
                <div class="todo_container">
                    <div class="todo_block">
                        <h1 class="todo_header">ToDo List</h1>
                        <div class="todo_block-input">
                            <input class="todo_input todo_input-item" id="add-input" type="text" placeholder="Enter your todo" />
                            <button class="todo_button todo_input-item" id="add-button">Add</button>
                        </div>
                        <div class="todo_block-input input_warning" id="warning"></div>
                        ${todosForRender.length <= 0 ? empty : ''}
                        <ul class="todo_list">${this.renderMap(todosForRender, (todo) => this.todoItemElement(todo))}</ul>
                        <div class="todo_footer">
                            <div class="todo_counter"><span>todos: </span><span class="count_item" id="todo-counter">0</span></div>
                            <div class="todo_filters">
                               ${this.renderMap(this.filterBlock, (filter) => this.filterBlockElement(filter.value, filter.text, filter.isActive))}
                            </div>
                            <button class="todos_cleaner" id="all-todos-clear">Clear all todos</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        return (this.app.innerHTML = todoSkeleton);
    }

    emptyBlockElement(filterStatus) {
        const status = filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1);
        console.log('status', status);
        const emptyElement = `
            <div class="todo_list-empty">
                <span>${status} is empty</span>
                <img src="./assets/ghost.svg"/>
            </div>
        `;

        return emptyElement;
    }

    todoItemElement(todo) {
        const status = this.status;
        const completedClass = todo.status === status.completed ? status.completed : '';
        const todoElement = `
            <li class="todo_list-item list_item ${completedClass}" id="${todo.id}">
                <div class="list_item-context">
                    <button class="list_item-radio" id="status-button">
                        <img class="list_item-radio_image" src="./assets/check.svg" />
                    </button>
                    <span class="list_item-title">${todo.text}</span>
                </div>
                <div class="list_item-functional">
                    <button class="list_item-edit">
                        <img class="list_item-edit_image" src="./assets/edit.svg" />
                    </button>
                    <button class="list_item-remove" id="remove-button">Remove</button>
                </div>
            </li>
        `;
        return todoElement;
    }

    filterBlockElement(value, text, isActive) {
        const status = this.status;
        const filterSpan = `
            <span class="todo_filter-item ${isActive ? status.active : ''}" id="filter-button" data-value="${value}">${text}</span>

        `;
        return filterSpan;
    }

    updateDisplay() {
        this.render();
        this.bindElements();
        this.handleCountTodos();
    }

    bindElements() {
        this.li = document.querySelector('.list_item');
        this.addInput = document.querySelector('#add-input');
        this.warningAlert = document.querySelector('#warning');
        this.todosCounter = document.querySelector('#todo-counter');

        const addButton = document.querySelector('#add-button');
        const removeAllTodosButtons = document.querySelector('#all-todos-clear');

        addButton.onclick = () => this.handleAddTodo();
        removeAllTodosButtons.onclick = () => this.handleRemoveAllTodos();

        const filterButtons = document.querySelectorAll('#filter-button');

        filterButtons.forEach((button) => {
            const buttonValue = button.getAttribute('data-value');
            button.onclick = () => this.handleFilterTodos(buttonValue, button, filterButtons);
        });

        if (this.li) {
            const removeTodoButtons = document.querySelectorAll('#remove-button');
            removeTodoButtons.forEach((btn) => {
                const id = btn.closest('.list_item').id;
                btn.onclick = () => this.handleRemoveTodo(Number(id));
            });

            const toggleStatusButton = document.querySelectorAll('#status-button');
            toggleStatusButton.forEach((btn) => {
                const todoLi = btn.closest('.list_item');
                btn.onclick = () => this.handleToggleStatus(todoLi);
            });
        }
    }

    handleAddTodo() {
        const value = this.addInput.value.trim();

        if (value === '') {
            this.setWarning();
            return;
        }

        this.warningAlert.textContent = '';

        this.addTodo(value);
        this.addInput.value = '';
    }

    setWarning() {
        this.warningAlert.textContent = '';

        this.warningAlert.classList.add('empty_input');
        this.warningAlert.textContent = 'Input is empty';
    }

    handleRemoveTodo(id) {
        this.removeTodo(id);
    }

    handleRemoveAllTodos() {
        this.removeAllTodos();
    }

    handleCountTodos() {
        const counter = this.countTodos();
        this.todosCounter.textContent = counter;
    }

    handleToggleStatus(li) {
        const id = Number(li.id);
        this.toggleStatus(id);
    }

    handleFilterTodos(filterValue) {
        this.currentFilter = filterValue;
        this.changeFiltersClass(filterValue);
        this.filteringTodos(filterValue);
    }

    changeFiltersClass(activeFilterValue) {
        this.filterBlock = this.filterBlock.map((filter) => ({ ...filter, isActive: filter.value === activeFilterValue }));
    }
}

{
    /* <div class="list_item-edit">
        <input class="list_item-edit_input" type="text" value="TextText" placeholder="TextText" />
        <button class="list_item-save_edit open">Save</button>
        <button class="list_item-save_edit close">Close</button>
    </div> */
}

{
    /* <span class="todo_filter-item active" id="filter-button" data-value="all">All</span>
<span class="todo_filter-item" id="filter-button" data-value="active">Active</span>
<span class="todo_filter-item" id="filter-button" data-value="completed">Completed</span> */
}
