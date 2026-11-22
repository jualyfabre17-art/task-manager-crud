const STORAGE_KEY = "tasks_crud_v1";
let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function createTask(title) {
  const newTask = {
    id: Date.now(),
    title: title.trim(),
    completed: false
  };
  tasks.push(newTask);
  saveTasks();
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = taskInput.value;
  if (!title.trim()) return;
  createTask(title);
  taskInput.value = "";
});

function renderTasks() {
  
}