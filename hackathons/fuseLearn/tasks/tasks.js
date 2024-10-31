const toDoList = document.getElementById("todo-list");
const toDoEntryBox = document.getElementById("todo-entry-box");
const detailEntryBox = document.getElementById("detail-entry-box");
const addButton = document.getElementById("add-button");
const clearButton = document.getElementById("clear-completed-button");
const emptyButton = document.getElementById("empty-button");
const infoDiv = document.getElementById("info");

addButton.addEventListener("click", addToDoItem);
clearButton.addEventListener("click", clearCompletedToDoItems);
emptyButton.addEventListener("click", emptyList);

function addToDoItem() {
  let detailText = detailEntryBox.value;
  let itemText = toDoEntryBox.value;

  if (itemText && detailText) {
    itemText = itemText + " | " + detailText;
  }

  if (itemText) {
    newToDoItem(itemText, false, "prepend");
    saveList();
    toDoEntryBox.value = "";
    detailEntryBox.value = "";
  } else {
    alert("Please enter a valid input.");
  }
}

function newToDoItem(_itemText, completed, type) {
  let toDoItem = document.createElement("li");
  toDoItem.innerText = _itemText;

  if (completed) {
    toDoItem.classList.add("completed");
  }

  toDoItem.addEventListener("click", toggleToDoItemState);
  toDoItem.addEventListener("dblclick", deleteTask);

  if (type === "append") {
    toDoList.appendChild(toDoItem);
  } else if (type === "prepend") {
    toDoList.insertBefore(toDoItem, toDoList.firstChild);
  }
}

function clearCompletedToDoItems() {
  let completedItems = toDoList.getElementsByClassName("completed");
  while (completedItems.length > 0) {
    completedItems.item(0).remove();
  }
  saveList();
}

function emptyList() {
  while (toDoList.firstChild) {
    toDoList.removeChild(toDoList.firstChild);
  }
  saveList();
}

function toggleToDoItemState() {
  this.classList.toggle("completed");
  saveList();
}

function deleteTask() {
  this.remove();
  saveList();
}

function saveList() {
  let toDos = [];
  for (let i = 0; i < toDoList.children.length; i++) {
    let toDoItem = toDoList.children[i];
    let toDoInfo = {
      task: toDoItem.innerText,
      completed: toDoItem.classList.contains("completed"),
    };
    toDos.push(toDoInfo);
  }
  localStorage.setItem("toDos", JSON.stringify(toDos));
  infoToggle();
}

function loadList() {
  let savedToDos = localStorage.getItem("toDos");
  if (savedToDos) {
    let toDos = JSON.parse(savedToDos);
    for (let i = 0; i < toDos.length; i++) {
      let toDo = toDos[i];
      newToDoItem(toDo.task, toDo.completed, "append");
    }
  }
  infoToggle();
}

function infoToggle() {
  if (toDoList.children.length === 0) {
    infoDiv.style.display = "block";
  } else {
    infoDiv.style.display = "none";
  }
}

loadList();
