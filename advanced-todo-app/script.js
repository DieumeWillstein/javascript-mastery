// Advanced To-Do List App
// Author: Dieume Willstein
// Email: dieumewillstein@gmail.com
// Year: 2025

// DOM Elements
const taskInput = document.getElementById("task-input");
const dueDate = document.getElementById("due-date");
const priority = document.getElementById("priority");
const category = document.getElementById("category");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const searchInput = document.getElementById("search");
const filterPriority = document.getElementById("filter-priority");
const themeToggle = document.getElementById("theme-toggle");
const exportBtn = document.getElementById("export-tasks");
const importInput = document.getElementById("import-tasks");

let tasks = [];

// Add a new task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const task = {
    id: Date.now(),
    text: taskText,
    dueDate: dueDate.value,
    priority: priority.value,
    category: category.value,
  };

  tasks.push(task);
  renderTasks();
  clearInputs();
});

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.text.toLowerCase().includes(searchInput.value.toLowerCase());
    const matchesPriority = filterPriority.value === "all" || task.priority === filterPriority.value;
    return matchesSearch && matchesPriority;
  });

  filteredTasks.forEach(task => {
    const taskEl = document.createElement("div");
    taskEl.className = `task-item ${task.priority}`;
    taskEl.innerHTML = `
      <div>
        <strong>${task.text}</strong><br>
        ${task.dueDate ? `Due: ${task.dueDate}` : ""}
        ${task.category ? ` | ${task.category}` : ""}
      </div>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(taskEl);
  });
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function clearInputs() {
  taskInput.value = "";
  dueDate.value = "";
  priority.value = "medium";
  category.value = "";
}

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Live search & filtering
searchInput.addEventListener("input", renderTasks);
filterPriority.addEventListener("change", renderTasks);

// Export tasks to JSON
exportBtn.addEventListener("click", () => {
  const dataStr = JSON.stringify(tasks);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "tasks.json";
  a.click();
});

// Import tasks from JSON
importInput.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const importedTasks = JSON.parse(e.target.result);
      if (Array.isArray(importedTasks)) {
        tasks = tasks.concat(importedTasks);
        renderTasks();
      }
    } catch (err) {
      alert("Invalid file format");
    }
  };
  reader.readAsText(file);
});

