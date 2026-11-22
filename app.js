const STORAGE_KEY = "tasks_crud_v1";
let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let currentFilter = "all";

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll("[data-filter]");

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function getFilteredTasks() {
  if (currentFilter === "pending") {
    return tasks.filter((t) => !t.completed);
  }
  if (currentFilter === "completed") {
    return tasks.filter((t) => t.completed);
  }
  return tasks;
}

function renderTasks() {
  taskList.innerHTML = "";
  const visibleTasks = getFilteredTasks();

  visibleTasks.forEach((task) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = task.title;
    if (task.completed) {
      span.classList.add("completed");
    }
    li.appendChild(span);
    taskList.appendChild(li);
  });
}

function createTask(title) {
  const newTask = {
    id: Date.now(),
    title: title.trim(),
    completed: false
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = taskInput.value;
  if (!title.trim()) return;
  createTask(title);
  taskInput.value = "";
});

renderTasks();