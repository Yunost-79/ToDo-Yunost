const warningInput = document.querySelector('.input_warning');
const input = document.querySelector('.todo_input');
const inputButton = document.querySelector('.todo_button');
const container = document.querySelector('.todo_list');
const counter = document.querySelector('.count_item');
const filters = document.querySelectorAll('.todo_filter-item');

let todos;

if (localStorage.getItem('todos')) {
    todos = JSON.parse(localStorage.getItem('todos'));
    closeAllEditTodo();
    updateDisplay();
} else {
    closeAllEditTodo();
    clearAllTodos();
    todos = [];
}

function addTask() {
    if (input.value.trim() === '') {
        checkWarningInput();
        return;
    }

    warningInput.textContent = '';

    todos.push({
        status: 'active',
        isEdit: false,
        text: input.value,
    });

    updateDisplay();
    input.value = '';
    return;
}

function removeTask(index) {
    todos.splice(index, 1);
    updateDisplay();
}

function toggleTodoStatus(li, todo) {
    if (li.classList.contains('completed') && todo.status === 'completed') {
        li.classList.remove('completed');
        todo.status = 'active';
    } else {
        li.classList.add('completed');
        todo.status = 'completed';
    }

    localStorage.setItem('todos', JSON.stringify(todos));

    const activeFilter = document.querySelector('.todo_filter-item.active');
    if (activeFilter) {
        const filterStatus = activeFilter.textContent.toLowerCase();
        filterTodos(filterStatus);
    }
}

function toggleTodoFilter() {
    filters.forEach((filter) => {
        filter.onclick = () => {
            filters.forEach((item) => item.classList.remove('active'));
            filter.classList.add('active');

            const filterStatus = filter.textContent.toLowerCase();
            filterTodos(filterStatus);
        };
    });
}

function filterTodos(filter) {
    let filteredTodos;

    switch (filter) {
        case 'all':
            filteredTodos = todos;
            break;
        case 'active':
            filteredTodos = todos.filter((todo) => todo.status === 'active');
            break;
        case 'completed':
            filteredTodos = todos.filter((todo) => todo.status === 'completed');
            break;
    }

    closeAllEditTodo();
    updateDisplay(filteredTodos);
}

function clearAllTodos() {
    todos = [];
    localStorage.removeItem('todos');

    updateDisplay();
}

function checkWarningInput() {
    warningInput.textContent = '';

    warningInput.classList.add('empty_input');
    warningInput.textContent = 'Input is empty';
    warningInput.appendChild(span);
}

function todoCounter(todoList) {
    if (!todoList) return;
    counter.textContent = todoList.length;
}

function editTodo(index, todoList) {
    closeAllEditTodo();

    todoList.find((todoItem, indexItem) => {
        if (indexItem === index) {
            todoItem.isEdit = true;
        }
    });

    updateDisplay(todoList);
}

function saveEdit(value, todo, todoList) {
    const validatedValue = value;
    if (validatedValue === todo.text) {
        closeAllEditTodo();
    }

    todo.text = validatedValue;

    closeAllEditTodo();
    updateDisplay(todoList);
}

function closeEdit(todoList) {
    closeAllEditTodo();
    updateDisplay(todoList);
}

function closeAllEditTodo() {
    todos.forEach((todoItem) => (todoItem.isEdit = false));
    updateDisplay();
}

function updateDisplay(filteredTodo) {
    const todoList = filteredTodo ? filteredTodo : todos;
    container.textContent = '';
    toggleTodoFilter();
    todoCounter(todoList);

    todoList.map((todo, index) => {
        const li = document.createElement('li');
        li.className = 'todo_list-item list_item';

        if (todo.status === 'completed') {
            li.classList.add('completed');
        }

        const contextBlock = document.createElement('div');
        contextBlock.className = 'list_item-context';

        const radioButton = document.createElement('button');
        radioButton.className = 'list_item-radio';

        const checkIcon = document.createElement('img');
        checkIcon.className = 'list_item-radio_image';
        checkIcon.setAttribute('src', './assets/check.svg');

        const textSpan = document.createElement('span');
        textSpan.className = 'list_item-title';
        textSpan.textContent = todo.text;

        const editBlock = document.createElement('div');
        editBlock.className = 'list_item-edit';

        const editInput = document.createElement('input');
        editInput.setAttribute('type', 'text');
        editInput.setAttribute('value', todo.text);
        editInput.className = 'list_item-edit_input';
        editInput.textContent = todo.text;

        const saveEditButton = document.createElement('button');
        saveEditButton.className = 'list_item-save_edit open';
        saveEditButton.textContent = 'Save';

        const closeEditButton = document.createElement('button');
        closeEditButton.className = 'list_item-save_edit close';
        closeEditButton.textContent = 'Close';

        const functionalBlock = document.createElement('div');
        functionalBlock.className = 'list_item-functional';

        const editButton = document.createElement('button');
        editButton.className = 'list_item-edit';

        const editIcon = document.createElement('img');
        editIcon.className = 'list_item-edit_image';
        editIcon.setAttribute('src', './assets/edit.svg');

        const removeButton = document.createElement('button');
        removeButton.className = 'list_item-remove';
        removeButton.textContent = 'Remove';

        radioButton.onclick = () => toggleTodoStatus(li, todo);
        editButton.onclick = () => editTodo(index, todoList);
        saveEditButton.onclick = () => saveEdit(editInput.value, todo, todoList);
        closeEditButton.onclick = () => closeEdit(todoList);
        removeButton.onclick = () => removeTask(index);

        //Mounting elements

        radioButton.appendChild(checkIcon);

        contextBlock.appendChild(radioButton);

        editBlock.appendChild(editInput);
        editBlock.appendChild(saveEditButton);
        editBlock.appendChild(closeEditButton);

        todo.isEdit ? contextBlock.appendChild(editBlock) : contextBlock.appendChild(textSpan);

        editButton.appendChild(editIcon);

        functionalBlock.appendChild(editButton);
        functionalBlock.appendChild(removeButton);

        li.appendChild(contextBlock);
        li.appendChild(functionalBlock);

        container.appendChild(li);
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}
