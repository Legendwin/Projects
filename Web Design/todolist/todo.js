let todoInput = document.getElementById('todo-input');
let addBtn = document.getElementById('add-btn');
let totalTasks = document.getElementById('total-tasks');
let completedTasks = document.getElementById('completed-tasks');
let todoList = document.getElementById('todo-list');

function addTodo() {
    if (todoInput.value === '') {
        alert("Please enter a todo!");
    } else {
        let span = document.createElement('span');
        span.className = 'todo-item';
        let todo = document.createElement('li');
        todo.innerHTML = todoInput.value;
        span.appendChild(todo);
        todoList.appendChild(span);

        let delBtn = document.createElement('span');
        delBtn.className = 'delete-btn';
        delBtn.innerHTML = `⨉`;
        span.appendChild(delBtn);
    };
    todoInput.value = '';
    updateStats();
    saveTodo();
};

todoList.addEventListener('click', function(e) {
    const item = e.target.closest('.todo-item');
    if (!item) {
        return;
    };
    if (e.target.closest('.delete-btn')) {
        item.remove();
        saveTodo();
    } else {
        item.classList.toggle('completed');
        const li = item.querySelector('li');
        if (li) {
            li.classList.toggle('todo-text');
        };
        saveTodo();
    };
    updateStats();
});

todoInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    };
});

function updateStats() {
    let total = todoList.getElementsByClassName('todo-item').length;
    totalTasks.innerHTML = `Total: ${total}`;

    let completed = todoList.getElementsByClassName('completed').length;
    completedTasks.innerHTML = `Completed: ${completed}`;
};

function saveTodo() {
    localStorage.setItem('data', todoList.innerHTML);
};

function loadTodo() {
    if (localStorage.getItem('data')) {
        todoList.innerHTML = localStorage.getItem('data');
    };
    updateStats();
};

loadTodo();