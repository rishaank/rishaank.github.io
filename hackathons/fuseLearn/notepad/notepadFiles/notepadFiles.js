const fileList = document.getElementById("file-list");
const timeList = document.getElementById("time-list");
const fileNameEntryBox = document.getElementById("file-name-entry-box");
const createButton = document.getElementById("create-button");
const deleteButton = document.getElementById("delete-button");
const infoDiv = document.getElementById("info");

createButton.addEventListener("click", addFile);
deleteButton.addEventListener("click", deleteFile);

function addFile() {
  let fileName = fileNameEntryBox.value.trim();
  if (!fileName) {
    alert("Please enter a valid input.");
    return;
  }

  let fileItems = Array.from(fileList.children);

  for (let i = 0; i < fileItems.length; i++) {
    let fileItem = fileItems[i];
    if (fileItem.innerText === fileName) {
      alert(
        "A file with that name already exists. Please choose a different name."
      );
      return;
    }
  }

  let currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let dateTime =
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
  let fileItem = document.createElement("li");
  let timeItem = document.createElement("li");
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
    let fileItems = Array.from(fileList.children);
    let fileIndex = -1;

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
  let files = [];
  for (let i = 0; i < fileList.children.length; i++) {
    let fileItem = fileList.children[i];
    let timeItem = timeList.children[i];
    let fileInfo = {
      name: fileItem.innerText,
      time: timeItem.innerText,
    };
    files.push(fileInfo);
  }
  localStorage.setItem("files", JSON.stringify(files));
  infoToggle();
}

function loadList() {
  let savedFiles = localStorage.getItem("files");
  if (savedFiles) {
    let files = JSON.parse(savedFiles);
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
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
