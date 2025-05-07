const app = document.querySelector('#app');

class TodoList extends EventEmitter {
    constructor() {
        super();
        this.todos = [];
    }

    addTodo(value) {
        const todo = {
            id: Date.now(),
            text: value,
            isEdit: false,
            status: 'active',
        };

        this.todos.push(todo);
        this.dispatch('update', this.updateTodos());
    }

    removeTodo(id) {
        this.todos.filter((todo) => (todo.id = id));
        this.dispatch('update', this.updateTodos());
    }

    updateTodos() {
        return this.todos;
    }
}

class TodoTemplate extends TodoList {
    constructor(app) {
        super();
        this.app = app;
        this.setupSubscriptions();
        this.render();
        this.bindElements();
    }

    render() {
        return (this.app.innerHTML = `
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
                        <ul class="todo_list">${this.todos.map((todo) => this.renderTodo(todo)).join('')}</ul>
                        <div class="todo_footer">
                            <div class="todo_counter"><span>todos: </span><span class="count_item">0</span></div>
                            <div class="todo_filters">
                                <span class="todo_filter-item active">All</span>
                                <span class="todo_filter-item">Active</span>
                                <span class="todo_filter-item">Completed</span>
                            </div>
                            <button class="todos_cleaner">Clear all todos</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `);
    }

    bindElements() {
        this.addInput = document.querySelector('#add-input');
        this.addButton = document.querySelector('#add-button');
        this.warningAlert = document.querySelector('#warning');
        this.removeTodoButton = document.querySelector('#remove-button');

        this.addButton.onclick = () => this.handleAddTodo();
    }

    setupSubscriptions() {
        this.subscribe('update', (todos) => {
            this.renderTodo(todos);
        });
    }

    renderTodo(todo) {
        const todoElement = `
            <li class="todo_list-item list_item">
                <div class="list_item-context">
                    <button class="list_item-radio">
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

    handleAddTodo() {
        const value = this.addInput.value.trim();

        if (value === '') {
            this.setWarning();
            return;
        }

        this.warningAlert.textContent = '';

        this.addTodo(value);
        this.render();
        this.bindElements();

        this.addInput.value = '';
    }

    setWarning() {
        this.warningAlert.textContent = '';

        this.warningAlert.classList.add('empty_input');
        this.warningAlert.textContent = 'Input is empty';
    }

    handleRemoveTodo;
}

// new TodoTemplate(app).render();

document.addEventListener('DOMContentLoaded', () => {
    new TodoTemplate(app);
});

{
    /* <div class="list_item-edit">
        <input class="list_item-edit_input" type="text" value="TextText" placeholder="TextText" />
        <button class="list_item-save_edit open">Save</button>
        <button class="list_item-save_edit close">Close</button>
    </div> */
}
