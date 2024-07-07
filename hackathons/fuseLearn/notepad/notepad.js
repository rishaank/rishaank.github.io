var textbox = document.getElementById("textbox");
var saveButton = document.getElementById("saveButton");
var charCount = document.getElementById("charCount");
var wordCount = document.getElementById("wordCount");
var sentenceCount = document.getElementById("sentenceCount");

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

  localStorage.setItem("Notes", textbox.value);

  setTimeout(() => {
    saveButton.innerHTML = "Saved!";
  }, 1000);

  setTimeout(() => {
    saveButton.innerHTML = "Save";
  }, 1500);
}

function load() {
  var savedNotes = localStorage.getItem("Notes");

  if (savedNotes) {
    textbox.value = savedNotes;
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
