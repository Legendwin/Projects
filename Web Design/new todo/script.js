// Clock JS//
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");
const day = document.getElementById("day");

var monthName = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"
];
const clock = setInterval(function time() {
    let today = new Date();
    let d = today.getDate();
    let m = today.getMonth();
    let y = today.getFullYear();
    let h = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    day.innerHTML = `${d} ${monthName[m]} ${y}`;
    hour.textContent = h;
    minute.innerText = min;
    second. innerText = sec;
})

// Todo List JS //
document.addEventListener('DOMContentLoaded', () => {
    const storedTodos = JSON.parse(localStorage.getItem('tasks'));
    if (storedTodos) {
        storedTodos.forEach((todo) => tasks.push(todo));
        updateTodo();
    }
});

let tasks = [];

const saveTodos = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const addTodo = () => {
    const todoInput = document.getElementById("todoInput");
    const todo = todoInput.value.trim();

    if (todo) {
        tasks.push({ text: todo, completed: false });
        todoInput.value = "";
        updateTodo();
        saveTodos();
    }
    else {
        alert("Please enter a todo!");
    }
};

const toggleComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTodo();
    saveTodos();
};

const editTask = (index) => {
    const todoInput = document.getElementById("todoInput");
    todoInput.value = tasks[index].text;
    tasks.splice(index, 1);
    updateTodo();
    saveTodos();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTodo();
    saveTodos();
};

const updateTodo = () => {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = '';

    tasks.forEach((todo, index) => {
        const listItems = document.createElement('li');

        listItems.innerHTML = `
        <div class="todoItems">
            <div class="todos ${todo.completed ? "completed" : ''}">
                <input type="checkbox" class="checkbox" ${todo.completed ? "checked" : ""}>
                <p>${todo.text}</p>
            </div>
            <div class="icons">
                <img src="439-4390267_edit-modify-ico-edit-pencil-icon-png-transparent-removebg-preview.png" onClick="editTask(${index})">
                <img src="pngtree-delete-icon-image_1129289-removebg-preview.png" onClick="deleteTask(${index})">
            </div>
        </div>
        `;

        listItems.addEventListener('change', () => toggleComplete(index));
        todoList.append(listItems);
    });
};

document.getElementById("todoInput").addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});