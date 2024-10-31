const textbox = document.getElementById("textbox");
const saveButton = document.getElementById("saveButton");
const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");
const sentenceCount = document.getElementById("sentenceCount");
const urlParams = new URLSearchParams(window.location.search);
const fileName = urlParams.get("file");

function save() {
  saveButton.innerHTML = "Saving";

  setTimeout(() => {
    saveButton.innerHTML = "Saving.";
  }, 250);

  setTimeout(() => {
    saveButton.innerHTML = "Saving..";
  }, 500);

  setTimeout(() => {
    saveButton.innerHTML = "Saving...";
  }, 750);

  localStorage.setItem(fileName, textbox.value);

  setTimeout(() => {
    saveButton.innerHTML = "Saved!";
  }, 1000);

  setTimeout(() => {
    saveButton.innerHTML = "Save";
  }, 1500);
}

function load() {
  if (fileName) {
    textbox.value = localStorage.getItem(fileName);
  }
}

function updateMetrics() {
  const text = textbox.value;
  const cursorPos = textbox.selectionStart;

  const charCountTotal = text.length;
  const wordCountTotal = text.match(/\b\S+\b/g)?.length || 0;
  const sentenceCountTotal = text.match(/[^.!?]*[.!?]/g)?.length || 0;

  const textBeforeCursor = text.substring(0, cursorPos);
  const charNumber = cursorPos;
  const wordNumber = textBeforeCursor.match(/\b\S+\b/g)?.length || 0;
  const sentenceNumber = textBeforeCursor.match(/[^.!?]*[.!?]/g)?.length || 0;

  charCount.textContent = `character ${charNumber} of ${charCountTotal} characters`;
  wordCount.textContent = `word ${wordNumber} of ${wordCountTotal} words`;
  sentenceCount.textContent = `sentence ${sentenceNumber} of ${sentenceCountTotal} sentences`;
}

textbox.addEventListener("input", updateMetrics);
textbox.addEventListener("click", updateMetrics);
textbox.addEventListener("keyup", updateMetrics);

setInterval(save, 30000);
load();
updateMetrics();
