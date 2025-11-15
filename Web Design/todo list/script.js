// Clock JS//

// Grabbing the HTML elements by their IDs to display the time and date
const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");
const day = document.getElementById("day");

// Array of month names for displaying the month in text format
var monthName = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"
];

// Setting up an interval to update the clock every second
const clock = setInterval(function time() {
    // Getting the current date and time
    let today = new Date();
    let d = today.getDate();
    let m = today.getMonth();
    let y = today.getFullYear();
    let h = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    // Updating the innerHTML of the day element to display the current date
    day.innerHTML = `${d} ${monthName[m]} ${y}`;

    hour.textContent = h;
    minute.innerText = min;
    second.innerText = sec;
});

// Todo List JS //

// Grabbing the input and todos HTML elements by their IDs
const Input = document.getElementById("input");
const Todos = document.getElementById("todos");

// Function to add a new todo item
function addTodo() {
    // Checking if the input value is empty
    if (Input.value === '') {
        alert("Please enter a todo!");
    } else {
        // Creating a new list item (li) element for the todo
        let todo = document.createElement("li");
        todo.id = 'todo-li'; 
        todo.innerHTML = Input.value;
        Todos.appendChild(todo);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.id = 'deleteBt';
        todo.appendChild(span);

        let edit = document.createElement("span");
        edit.innerHTML = "\u270f";
        edit.id = 'editBt';
        todo.appendChild(edit);
    }
    Input.value = '';
    saveTodos();
}

// Adding an event listener to the todos list for handling clicks
Todos.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveTodos();
    } else if (e.target.tagName === "SPAN" && e.target.innerHTML === "\u00d7") {
        e.target.parentElement.remove(); 
        saveTodos();
    } else if (e.target.tagName === "SPAN" && e.target.innerHTML === "\u270f") {
        let todoLi = e.target.parentElement;
        Input.value = todoLi.innerText.replace("\u270f", '').replace("\u00d7", '').trim();
        todoLi.remove();
        saveTodos();
    }
}, false);

document.getElementById("input").addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Function to save todos to local storage
function saveTodos() {
    localStorage.setItem("data", Todos.innerHTML);
}

// Function to load todos from local storage
function loadTodos() {
    if (localStorage.getItem("data")) {
        Todos.innerHTML = localStorage.getItem("data");
    }
}
loadTodos();