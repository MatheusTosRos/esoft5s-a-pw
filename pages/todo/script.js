document.addEventListener("DOMContentLoaded", function() {
    const todoForm = document.getElementById("todo-form");
    const todoList = document.getElementById("todo-list");

    todoForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;

        if (title.trim() === "" || description.trim() === "") {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const todoItem = { title, description };
        addToLocalStorage(todoItem);
        displayTodoList();
        todoForm.reset();
    });

    function addToLocalStorage(todoItem) {
        let todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.push(todoItem);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function displayTodoList() {
        todoList.innerHTML = "";
        let todos = JSON.parse(localStorage.getItem("todos")) || [];

        todos.forEach(function(todo, index) {
            const li = document.createElement("li");
            li.innerHTML = `<span>${todo.title}</span>: ${todo.description}`;
            todoList.appendChild(li);
        });
    }

    displayTodoList();
});