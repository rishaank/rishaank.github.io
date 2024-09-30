var fileList = document.getElementById("file-list");
var timeList = document.getElementById("time-list");
var fileNameEntryBox = document.getElementById("file-name-entry-box");
var createButton = document.getElementById("create-button");
var deleteButton = document.getElementById("delete-button");
var infoDiv = document.getElementById("info");

createButton.addEventListener("click", addFile);
deleteButton.addEventListener("click", deleteFile);

function addFile() {
  var fileName = fileNameEntryBox.value.trim();
  if (!fileName) {
    alert("Please enter a valid input.");
    return;
  }

  var fileItems = Array.from(fileList.children);

  for (var i = 0; i < fileItems.length; i++) {
    var fileItem = fileItems[i];
    if (fileItem.innerText === fileName) {
      alert(
        "A file with that name already exists. Please choose a different name."
      );
      return;
    }
  }

  var currentDate = new Date();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  var dateTime =
    currentDate.getMonth() +
    1 +
    "/" +
    currentDate.getDate() +
    "/" +
    currentDate.getFullYear() +
    " " +
    hours +
    ":" +
    minutes;

  newFile(fileName, dateTime, "prepend");
  saveList();
  fileNameEntryBox.value = "";
}

function newFile(_itemText, _dateTime, type) {
  var fileItem = document.createElement("li");
  var timeItem = document.createElement("li");
  fileItem.innerText = _itemText;
  timeItem.innerText = _dateTime;

  fileItem.addEventListener("click", openFile);

  if (type === "append") {
    fileList.appendChild(fileItem);
    timeList.appendChild(timeItem);
  } else if (type === "prepend") {
    fileList.insertBefore(fileItem, fileList.firstChild);
    timeList.insertBefore(timeItem, timeList.firstChild);
  }
}

function deleteFile() {
  let deleteFile = prompt("Please enter the file name to be deleted.");

  if (deleteFile) {
    var fileItems = Array.from(fileList.children);
    var fileIndex = -1;

    for (let i = 0; i < fileItems.length; i++) {
      if (fileItems[i].innerText === deleteFile) {
        fileIndex = i;
        break;
      }
    }

    if (fileIndex > -1) {
      fileList.removeChild(fileList.children[fileIndex]);
      timeList.removeChild(timeList.children[fileIndex]);
      saveList();
    } else {
      alert("File not found.");
    }
  }
}

function saveList() {
  var files = [];
  for (var i = 0; i < fileList.children.length; i++) {
    var fileItem = fileList.children[i];
    var timeItem = timeList.children[i];
    var fileInfo = {
      name: fileItem.innerText,
      time: timeItem.innerText,
    };
    files.push(fileInfo);
  }
  localStorage.setItem("files", JSON.stringify(files));
  infoToggle();
}

function loadList() {
  var savedFiles = localStorage.getItem("files");
  if (savedFiles) {
    var files = JSON.parse(savedFiles);
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      newFile(file.name, file.time, "append");
    }
  }
  infoToggle();
}

function infoToggle() {
  if (fileList.children.length === 0) {
    fileList.style.display = "none";
    timeList.style.display = "none";
    infoDiv.style.display = "block";
  } else {
    fileList.style.display = "block";
    timeList.style.display = "block";
    infoDiv.style.display = "none";
  }
}

function openFile() {
  window.location.href = `../notepad.html?file=${this.innerText}`;
}

loadList();
