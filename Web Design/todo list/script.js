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
    // Updating the textContent of the hour, minute, and second elements to display the current time
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
        alert("Please enter a todo!"); // Alerting the user to enter something
    } else {
        // Creating a new list item (li) element for the todo
        let todo = document.createElement("li");
        todo.id = 'todo-li'; // Setting the id for the new li element
        todo.innerHTML = Input.value; // Setting the innerHTML of the li element to the input value
        Todos.appendChild(todo); // Adding the new li element to the todos list

        // Creating a span element for the delete (×) button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Setting the innerHTML to ×
        span.id = 'deleteBt'; // Setting the id for the delete button
        todo.appendChild(span); // Adding the delete button to the todo item

        // Creating a span element for the edit (✏) button
        let edit = document.createElement("span");
        edit.innerHTML = "\u270f"; // Setting the innerHTML to ✏
        edit.id = 'editBt'; // Setting the id for the edit button
        todo.appendChild(edit); // Adding the edit button to the todo item
    }
    Input.value = ''; // Clearing the input field
    saveTodos(); // Saving the todos to local storage
}

// Adding an event listener to the todos list for handling clicks
Todos.addEventListener("click", function(e) {
    // Checking if the clicked element is a list item
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked"); // Toggling the checked class
        saveTodos(); // Saving the todos to local storage
    // Checking if the clicked element is a delete button (×)
    } else if (e.target.tagName === "SPAN" && e.target.innerHTML === "\u00d7") {
        e.target.parentElement.remove(); // Removing the todo item
        saveTodos(); // Saving the todos to local storage
    // Checking if the clicked element is an edit button (✏)
    } else if (e.target.tagName === "SPAN" && e.target.innerHTML === "\u270f") {
        let todoLi = e.target.parentElement; // Getting the parent li element
        // Setting the input value to the current todo text without the edit and delete buttons
        Input.value = todoLi.innerText.replace("\u270f", '').replace("\u00d7", '').trim();
        todoLi.remove(); // Removing the todo item
        saveTodos(); // Saving the todos to local storage
    }
}, false); // Setting the useCapture flag to false

// Function to save todos to local storage
function saveTodos() {
    localStorage.setItem("data", Todos.innerHTML); // Saving the innerHTML of the todos list to local storage
}

// Function to load todos from local storage
function loadTodos() {
    // Checking if there are todos saved in local storage
    if (localStorage.getItem("data")) {
        Todos.innerHTML = localStorage.getItem("data"); // Setting the innerHTML of the todos list to the saved data
    }
}
loadTodos(); // Loading the todos when the script runs