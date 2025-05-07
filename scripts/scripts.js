const app = document.querySelector('#app');

class TodoList extends EventEmitter {
    constructor() {
        super();
        this.todos = [
            {
                id: 123,
                text: 'TEXT',
            },
        ];
    }

    addTask(title) {
        task = {
            id: Date.now(),
            text: title,
            isEdit: false,
            status: 'active',
        };

        this.todos.push(task);
        return task;
    }

    getTodos() {
        return this.todos;
    }
}

class TodoTemplate extends TodoList {
    constructor(app) {
        super();
        this.app = app;
    }

    render() {
        console.log('todos', this.todos);
        return (this.app.innerHTML = `
            <div class="wrapper">
            <div class="container">
                <div class="todo_container">
                    <div class="todo_block">
                        <h1 class="todo_header">ToDo List</h1>
                        <div class="todo_block-input">
                            <input class="todo_input todo_input-item" type="text" placeholder="Enter your todo" />
                            <button class="todo_button todo_input-item">Add</button>
                        </div>
                        <div class="todo_block-input input_warning"></div>
                        <ul class="todo_list">
                        ${this.todos.map((todo) => this.renderTodo(todo))}
                        </ul>
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
                    <button class="list_item-remove">Remove</button>
                </div>
            </li>
        `;
        return todoElement;
    }
}

new TodoTemplate(app).render();

{
    /* <div class="list_item-edit">
        <input class="list_item-edit_input" type="text" value="TextText" placeholder="TextText" />
        <button class="list_item-save_edit open">Save</button>
        <button class="list_item-save_edit close">Close</button>
    </div> */
}
