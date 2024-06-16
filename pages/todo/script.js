const taskKey = '@tasks';
const apiBaseURL = 'https://jsonplaceholder.typicode.com/todos';

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  displayTasks(tasks);
}

function displayTasks(tasks) {
  const taskList = document.querySelector('#taskList');
  taskList.innerHTML = tasks
    .map(task => `
      <li id="${task.id}">
        <h2>${task.title}</h2>
        <p>${task.description}</p>
        <button class="edit-btn" title="Editar tarefa" onclick="openEditDialog(${task.id})">✏️</button>
        <button class="exclude-btn" title="Excluir tarefa" onclick="excludeTask(${task.id})">❌</button>
      </li>`)
    .join('');
}

async function addTask(event) {
  event.preventDefault();
  const taskId = new Date().getTime();
  const form = document.querySelector('#taskForm');
  const formData = new FormData(form);

  const taskTitle = formData.get('title');
  const taskDescription = formData.get('description');

  const newTask = { userId: 1, title: taskTitle, completed: false };
  try {
    const response = await fetch(apiBaseURL, {
      method: 'POST',
      body: JSON.stringify(newTask),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const taskFromApi = await response.json();

    const task = {
      id: taskFromApi.id || taskId,
      title: taskTitle,
      description: taskDescription,
    };

    const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
    tasks.push(task);
    localStorage.setItem(taskKey, JSON.stringify(tasks));

    form.reset();
    loadTasks(); 
  } catch (error) {
    console.error('Erro ao adicionar tarefa:', error);
  }
}

function openEditDialog(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey));
  const task = tasks.find(t => t.id === taskId);

  const editDialog = document.getElementById('editDialog');
  const editTitle = document.getElementById('editTitle');
  const editDescription = document.getElementById('editDescription');

  editTitle.value = task.title;
  editDescription.value = task.description;

  editDialog.dataset.taskId = taskId;
  editDialog.showModal();
}

async function saveEdit(event) {
  event.preventDefault();
  const editDialog = document.getElementById('editDialog');
  const taskId = parseInt(editDialog.dataset.taskId);

  const tasks = JSON.parse(localStorage.getItem(taskKey));
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  const updatedTask = {
    title: document.getElementById('editTitle').value,
    description: document.getElementById('editDescription').value,
  };

  try {
    await fetch(`${apiBaseURL}/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedTask),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    tasks[taskIndex].title = updatedTask.title;
    tasks[taskIndex].description = updatedTask.description;
    localStorage.setItem(taskKey, JSON.stringify(tasks));

    editDialog.close();
    loadTasks(); 
  } catch (error) {
    console.error('Erro ao editar tarefa:', error);
  }
}

async function excludeTask(taskId) {
  try {
    await fetch(`${apiBaseURL}/${taskId}`, {
      method: 'DELETE',
    });

    const tasks = JSON.parse(localStorage.getItem(taskKey));
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    localStorage.setItem(taskKey, JSON.stringify(updatedTasks));

    loadTasks(); 
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
  }
}

function filterTasks(event) {
  event.preventDefault();
  const filterText = document.querySelector('#filterTitle').value.toLowerCase();
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(filterText)
  );

  displayTasks(filteredTasks);
}

window.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});

document.getElementById('editDialog').addEventListener('submit', saveEdit);