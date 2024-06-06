const taskKey = '@tasks';

function addTask(event) {
  event.preventDefault();
  const taskId = new Date().getTime();
  const taskList = document.querySelector('#taskList');

  const form = document.querySelector('#taskForm');
  const formData = new FormData(form);

  const taskTitle = formData.get('title');
  const taskDescription = formData.get('description');

  const li = document.createElement('li');
  li.id = taskId;
  li.innerHTML = `
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
      <button class="edit-btn" title="Editar tarefa" onclick="openEditDialog(${taskId})">✏️</button>
      <button class="exclude-btn" title="Excluir tarefa" onclick="excludeTask(${taskId})">❌</button>
      `;

  taskList.appendChild(li);

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  tasks.push({ id: taskId, title: taskTitle, description: taskDescription });
  localStorage.setItem(taskKey, JSON.stringify(tasks));

  form.reset();
}

function openEditDialog(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey));
  const task = tasks.find(t => t.id === taskId);

  const editDialog = document.getElementById('editDialog');
  const editTitle = document.getElementById('editTitle');
  const editDescription = document.getElementById('editDescription');

  editTitle.value = task.title;
  editDescription.value = task.description;

  editDialog.showModal();
}

function excludeTask(taskId) {
  const tasks = JSON.parse(localStorage.getItem(taskKey));
  const updatedTasks = tasks.filter(t => t.id!== taskId);
  localStorage.setItem(taskKey, JSON.stringify(updatedTasks));
}

window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
  const taskList = document.querySelector('#taskList');
  taskList.innerHTML = tasks
    .map((task) => `
      <li id="${task.id}">
        <h2>${task.title}</h2>
        <p>${task.description}</p>
        <button class="edit-btn" title="Editar tarefa" onclick="openEditDialog(${task.id})">✏️</button>
        <button class="exclude-btn" title="Excluir tarefa" onclick="excludeTask(${task.id})">❌</button>
      </li>`)
    .join('');
});