var toDoList = document.getElementById("todo-list");
var toDoEntryBox = document.getElementById("todo-entry-box");
var addButton = document.getElementById("add-button");
var clearButton = document.getElementById("clear-completed-button");
var emptyButton = document.getElementById("empty-button");

addButton.addEventListener("click", addToDoItem);
clearButton.addEventListener("click", clearCompletedToDoItems);
emptyButton.addEventListener("click", emptyList);

function addToDoItem() {
  var itemText = toDoEntryBox.value;
  if (itemText) {
    newToDoItem(itemText, false, "prepend");
    saveList();
    toDoEntryBox.value = "";
  } else {
    alert("Please enter a valid input");
  }
}

function newToDoItem(_itemText, completed, type) {
  var toDoItem = document.createElement("li");
  toDoItem.innerText = _itemText;

  if (completed) {
    toDoItem.classList.add("completed");
  }

  toDoItem.addEventListener("dblclick", toggleToDoItemState);

  if (type === "append") {
    toDoList.appendChild(toDoItem);
  } else if (type === "prepend") {
    toDoList.insertBefore(toDoItem, toDoList.firstChild);
  }
}

function clearCompletedToDoItems() {
  var completedItems = toDoList.getElementsByClassName("completed");
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

function saveList() {
  var toDos = [];
  for (var i = 0; i < toDoList.children.length; i++) {
    var toDoItem = toDoList.children[i];
    var toDoInfo = {
      task: toDoItem.innerText,
      completed: toDoItem.classList.contains("completed"),
    };
    toDos.push(toDoInfo);
  }
  localStorage.setItem("toDos", JSON.stringify(toDos));
}

function loadList() {
  var savedToDos = localStorage.getItem("toDos");
  if (savedToDos) {
    var toDos = JSON.parse(savedToDos);
    for (var i = 0; i < toDos.length; i++) {
      var toDo = toDos[i];
      newToDoItem(toDo.task, toDo.completed, "append");
    }
  }
}

loadList();
