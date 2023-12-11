// Selectors
const todoList = document.querySelector(".todo-list");

const todoInput = document.querySelector(".todo-input");

const btnSubmit = document.querySelector(".todo-button");

const filterOption = document.querySelector('.filter-todo');



// Event Listeners

document.addEventListener("DOMContentLoaded" , getTodos);

btnSubmit.addEventListener('click' , addTodo);

todoList.addEventListener('click' , deleteCheck);

filterOption.addEventListener('click' , filterTodo);

// Adding task function
function addTodo(e) {
    // prevent default behaviour of browsers
    e.preventDefault();
    // Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Creating Todo item li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // saving todo Locally
    saveLocalTodos(todoInput.value);

    // Creating Buttons
    // Check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add('btn-complete');
    todoDiv.appendChild(completedButton);

    // Trash Button

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add('btn-trash');
    todoDiv.appendChild(trashButton);

    // adding Div to the list

    todoList.appendChild(todoDiv);
    // reset the text

    todoInput.value = "";
}


//----------------------- Delete and also check completed task------------------

function deleteCheck(e) {
    const item = e.target;
    console.log(item.classList);
    console.log(item.classList[0]);
    if(item.classList[0] === 'btn-trash'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend' , function () {
            todo.remove();
        });
    }
    if(item.classList[0] === 'btn-complete'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


// function for filter

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;
            case 'incomplete':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;
        }
    })
}



// -------------------- Savind ToDo list locally --------------------

function saveLocalTodos(todo) {
    // Check if todos already exist

    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos' , JSON.stringify(todos));
}


// get todos to show on the UI

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // To display existing todos on the screen
    
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Creating Todo item li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo; // Here we want the locally stored value
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    // Creating Buttons
    // Check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add('btn-complete');
    todoDiv.appendChild(completedButton);

    // Trash Button

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add('btn-trash');
    todoDiv.appendChild(trashButton);

    // adding Div to the list

    todoList.appendChild(todoDiv);
    })
}


// Deleting Todo from local Storage

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;

    todos.splice(todos.indexOf(todoIndex) , 1);

    localStorage.setItem("todos",JSON.stringify(todos));
}