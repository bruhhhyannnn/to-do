function addTask() {
  const inputValue = document.getElementById("inputTask").value;
  if (inputValue.length == 0) {
    alert("Please input a value.");
    return;
  }
  document.getElementById("inputTask").value = "";

  const taskId = "task-" + generateTimestampId();
  createTaskContainer(taskId, inputValue);
  addTaskToStorage(taskId, inputValue);
  checkLocalStorage();
}

function checkLocalStorage() {
  const emptyTask = document.querySelector(".empty-task");
  if (localStorage.length == 0 || localStorage.length == 1) {
    const key = localStorage.key(0);
    if (localStorage.length == 0 || !key.startsWith("task-")) {
      emptyTask.style.display = "block";
      return;
    }
  }
  emptyTask.style.display = "none";
}

function addTaskToStorage(taskInputKey, inputValue) {
  localStorage.setItem(taskInputKey, inputValue);
}

function removeTaskToStorage(taskInputKey) {
  localStorage.removeItem(taskInputKey);
}

function createTaskContainer(taskId, inputValue) {
  const taskContainer = document.createElement("div");
  taskContainer.className = "task-container";

  const taskDiv = document.createElement("div");

  const taskInput = document.createElement("input");
  taskInput.type = "checkbox";
  taskInput.id = taskId;
  taskInput.name = taskInput.id;
  const taskLabel = document.createElement("label");
  taskLabel.htmlFor = taskInput.id;
  taskLabel.innerText = inputValue;

  taskDiv.append(taskInput);
  taskDiv.append(taskLabel);

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.onclick = () => deleteTaskContainer(taskInput.id);
  const deleteIcon = document.createElement("ion-icon");
  deleteIcon.className = "delete-icon";
  deleteIcon.name = "trash-outline";

  deleteButton.append(deleteIcon);

  taskContainer.append(taskDiv);
  taskContainer.append(deleteButton);

  container.insertBefore(taskContainer, inputContainer);
}

function deleteTaskContainer(taskInputId) {
  if (!confirm("Are you sure you want to delete this task?")) return;
  const taskElement =
    document.getElementById(taskInputId).parentElement.parentElement;
  taskElement.remove();

  removeTaskToStorage(taskInputId);
  checkLocalStorage();
}

function generateTimestampId() {
  return Date.now().toString();
}

const defaultTask = ["Sample Checkbox 1", "Sample Checkbox 2"];
const container = document.querySelector(".container");
const inputContainer = document.querySelector(".input-container");

defaultTask.forEach((item, index) => {
  addTaskToStorage("task-" + index, item);
});

for (let i = 0; i < localStorage.length; i++) {
  const keys = localStorage.key(i);
  if (keys.startsWith("task-")) {
    createTaskContainer(keys, localStorage.getItem(keys));
  }
}

checkLocalStorage();
