/**
 * Insrting a new Element on DOM using JAVASCRIPT
 * 
 * 1) Create a new element for eg: li using CreateElement Function
 * 2) insert content using in the element either using innertext or innerhtml
 * 3) insert that element in parent container using appendchild 
 * 
 */


// function addTodo() {
//     let li = document.createElement("li")
//     li.innerHTML = 'Todo 5 <button class="delete-btn">❌</button>'
//     ul.appendChild(li);
// }

// let todo = {
//     id: "1",
//     title : "study at 8pm today",
//     status: "pending"
// }

let todos = [
    {
    title : "study at 8pm today",
    status: "pending"
    },
    {
    title : "study at 9pm today",
    status: "pending"
    },
    {
    title : "study at 10 pm today",
    status: "pending"
    }
]

let ul = document.getElementById("todo");
let addBtn = document.getElementById("Button");
let todoForm = document.getElementById("todoForm");
let submitBtn = document.getElementById("submit");
let titleInput = document.getElementById("title");

function addTodo(todo) { // object --> object.title
    let li = document.createElement("li")
    li.innerHTML = `${todo.title}<button class="delete-btn">❌</button>`
    ul.appendChild(li);
}

todos.forEach(addTodo);

addBtn.addEventListener("click", () => todoForm.classList.toggle("hide"));

// function showAllTodos(todos)
// {
//     todos.forEach(todo => {
//         addTodo(todo)
        
//     });
// }

submitBtn.addEventListener("click", () => {
    let todoText = titleInput.value;
    if (todoText !== "") {
        let li = document.createElement("li");
        li.innerHTML = todoText + ' <button class="delete-btn">❌</button>';
        ul.appendChild(li);
        titleInput.value = "";
        todoForm.classList.toggle("hide");
    }
});

// addTodo(todo);

showAllTodos(todos)