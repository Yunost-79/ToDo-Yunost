import { Helpers } from './helpers.js';
import { state } from './Store.js';
import { TodoList } from './TodoList.js';

export class TodoTemplate extends TodoList {
    constructor(app) {
        super();
        this.helpers = new Helpers();

        const status = this.helpers.status;
        this.app = app;
        this.filterBlock = [
            { value: 'all', text: 'All', isActive: this.filterStatus === status.all },
            { value: 'active', text: 'Active', isActive: this.filterStatus === status.active },
            { value: 'completed', text: 'Completed', isActive: this.filterStatus === status.completed },
        ];
        this.setupSubscriptions();
        this.updateDisplay();
    }

    setupSubscriptions() {
        state.subscribe('update', (todo) => {
            this.todoItemElement(todo);
            this.updateDisplay();
            this.filterBlockElement();
        });
    }

    render() {
        const filterStatus = this.filterStatus;
        const status = this.helpers.status;
        const renderMap = this.helpers.renderMap;

        const empty = this.emptyBlockElement(filterStatus);

        const filteredTodos = state.getState('filteredTodos');
        const todos = state.getState('todos');
        const counter = state.getState('counter');

        const todosForRender = filteredTodos ? filteredTodos : todos;

        const mainElement = `
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
                        ${todosForRender.length <= 0 && filterStatus !== status.all ? empty : ''}
                        <ul class="todo_list">${renderMap(todosForRender, (todo) => this.todoItemElement(todo))}</ul>
                        <div class="todo_footer">
                            <div class="todo_counter"><span>${
                                filterStatus && filterStatus !== status.all ? `Todos ${filterStatus}: ` : 'Todos: '
                            }</span><span class="count_item" id="todo-counter">${counter}</span></div>
                            <div class="todo_filters">
                               ${renderMap(this.filterBlock, (filter) => this.filterBlockElement(filter.value, filter.text, filter.isActive))}
                            </div>
                            <button class="todos_cleaner" id="all-todos-clear">Clear all todos</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        return (this.app.innerHTML = mainElement);
    }

    textTodoElement(text) {
        const element = `
            <span class="list_item-title" id="span-text" title="Double click to edit todo">${text}</span>
        `;
        return element;
    }

    editTodoElement(text) {
        const element = `
            <div class="list_item-edit" id="edit-block">
                <input class="list_item-edit_input" type="text" value="${text}" id="edit-input"/>
                <button class="list_item-save_edit save" id="edit-save">Save</button>
                <button class="list_item-save_edit close" id="edit-close">Close</button>
            </div>
        `;
        return element;
    }

    emptyBlockElement(filterStatus) {
        const element = `
            <div class="todo_list-empty">
                <span>No ${filterStatus} tasks</span>
                <img src="./assets/ghost.svg"/>
            </div>
        `;
        return element;
    }

    openEditBlockButton() {
        const element = `
            <button class="list_item-edit" id="edit-button">
                <img class="list_item-edit_image" src="./assets/edit.svg" />
            </button>
        `;

        return element;
    }

    todoItemElement(todo) {
        const status = this.helpers.status;
        const completedClass = todo.status === status.completed ? status.completed : '';

        const editElement = this.editTodoElement(todo.value);
        const textElement = this.textTodoElement(todo.value);
        const openEditElement = this.openEditBlockButton();

        const element = `
            <li class="todo_list-item list_item ${completedClass}" id="list-item" data-id="${todo.id}">
                <div class="list_item-context">
                    <button class="list_item-radio" id="status-button">
                        <img class="list_item-radio_image" src="./assets/check.svg" />
                    </button>
                    ${todo.isEdit ? editElement : textElement}
                </div>
                <div class="list_item-functional">
                    ${!todo.isEdit ? openEditElement : ''}

                    <button class="list_item-remove" id="remove-button">Remove</button>
                </div>
            </li>
        `;
        return element;
    }

    filterBlockElement(value, text, isActive) {
        const status = this.helpers.status;
        const element = `
            <span class="todo_filter-item ${isActive ? status.active : ''}" id="filter-button" data-value="${value}">${text}</span>
        `;
        return element;
    }

    updateDisplay() {
        this.render();
        this.bindElements();
    }

    bindElements() {
        this.addInput = document.querySelector('#add-input');
        this.warningAlert = document.querySelector('#warning');
        this.todosCounter = document.querySelector('#todo-counter');

        const li = document.querySelectorAll('#list-item');
        const addButton = document.querySelector('#add-button');
        const removeAllTodosButtons = document.querySelector('#all-todos-clear');
        const filterButtons = document.querySelectorAll('#filter-button');
        const editTodoBlock = document.querySelectorAll('#edit-block');

        addButton.onclick = () => this.handleAddTodo();
        removeAllTodosButtons.onclick = () => this.handleRemoveAllTodos();

        filterButtons.forEach((button) => {
            const buttonValue = button.getAttribute('data-value');
            button.onclick = () => this.handleFilterTodos(buttonValue, button, filterButtons);
        });

        if (li) {
            li.forEach((todoItem) => {
                const removeTodoButtons = todoItem.querySelector('#remove-button');
                const toggleStatusButton = todoItem.querySelector('#status-button');
                const startEditTodoButton = todoItem.querySelector('#edit-button');
                const spanText = todoItem.querySelector('#span-text');

                const id = todoItem.attributes['data-id'].value;

                removeTodoButtons.onclick = () => this.handleRemoveTodo(Number(id));
                toggleStatusButton.onclick = () => this.handleToggleStatus(Number(id));

                if (!startEditTodoButton && !spanText) return;

                startEditTodoButton.onclick = () => this.handleOpenEditTodo(Number(id), true);
                spanText.ondblclick = () => this.handleOpenEditTodo(Number(id), true);
            });
        }

        if (editTodoBlock) {
            editTodoBlock.forEach((editBlock) => {
                const closeBtn = editBlock.querySelector('#edit-close');
                const saveBtn = editBlock.querySelector('#edit-save');
                const input = editBlock.querySelector('#edit-input');

                const id = editBlock.closest('.list_item').attributes['data-id'].value;

                closeBtn.onclick = () => this.handleCloseEditTodo(Number(id));
                saveBtn.onclick = () => this.handleChangeTodoContext(Number(id), input.value);
            });
        }
    }

    handleAddTodo() {
        const value = this.addInput.value.trim();
        this.closeAllEditTodos();

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
        this.closeAllEditTodos();
        this.removeTodo(id);
    }

    handleRemoveAllTodos() {
        this.removeAllTodos();
    }

    handleToggleStatus(id) {
        this.toggleStatus(id);
    }

    handleFilterTodos(filterValue) {
        this.closeAllEditTodos();
        this.filterStatus = filterValue;
        this.handleChangeFiltersClass(filterValue);
        this.filteringTodos(filterValue);
    }

    handleChangeFiltersClass(activeFilterValue) {
        this.filterBlock = this.changeFiltersClass(this.filterBlock, activeFilterValue);
    }

    handleOpenEditTodo(id, isOpen) {
        this.closeAllEditTodos();
        this.openCloseEditTodo(id, isOpen);
    }

    handleCloseEditTodo() {
        this.closeAllEditTodos();
    }

    handleChangeTodoContext(id, value) {
        const validatedValue = value.trim();
        this.changeTodoContext(id, validatedValue);
        this.closeAllEditTodos();
    }
}
