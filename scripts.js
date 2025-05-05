const warningInput = document.querySelector('.input_warning');
const input = document.querySelector('.todo_input');
const inputButton = document.querySelector('.todo_button');
const container = document.querySelector('.todo_list');
const counter = document.querySelector('.count_item');

let todos;

if (localStorage.getItem('todos')) {
    todos = JSON.parse(localStorage.getItem('todos'));
    updateDisplay();
} else {
    clearAllTodos();
    todos = [];
}

function addTask() {
    if (input.value === '') {
        checkWarningInput();
        return false;
    } else {
        warningInput.innerHTML = '';
    }

    todos.push(input.value);
    updateDisplay();
    input.value = '';

    return false;
}

function removeTask(index) {
    todos.splice(index, 1);
    updateDisplay();
}

function clearAllTodos() {
    todos = [];
    localStorage.removeItem('todos');
    updateDisplay();
}

function updateDisplay() {
    container.innerHTML = '';
    todoCounter();

    todos.map((todo, index) => {
        const li = document.createElement('li');
        li.className = 'todo_list-item list_item';

        const span = document.createElement('span');
        span.className = 'list_item-title';
        li.appendChild(span);
        li.querySelector('span').innerHTML = todo;

        const removeButton = document.createElement('button');
        removeButton.className = 'list_item-remove';
        removeButton.innerHTML = 'Remove';
        removeButton.onclick = () => removeTask(index);
        li.appendChild(removeButton);

        container.appendChild(li);
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}

function checkWarningInput() {
    warningInput.innerHTML = '';

    warningInput.classList.add('empty_input');
    warningInput.innerHTML = 'Input is empty';
    warningInput.appendChild(span);
}

function todoCounter() {
    if (!todos) return false;
    counter.innerHTML = todos.length;
}
