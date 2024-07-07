var timerCircle = document.getElementById("timerCircle");
var timerText = document.getElementById("timerText");
var timerDetail = document.getElementById("timerDetail");
var timerStartBtn = document.getElementById("timerStart");
var timerStopBtn = document.getElementById("timerStop");
var timerResetBtn = document.getElementById("timerReset");

var workTime = 1500;
var breakTime = 300;
var timerSeconds = workTime;
var timerRunning = false;
var breakRunning = false;
var timerInterval;
var initialSize = 200;

var workSize = initialSize / workTime - 1;
var breakSize = initialSize / breakTime - 1;

timerCircle.style.width = initialSize + "px";
timerCircle.style.height = initialSize + "px";

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function updateTimerDisplay() {
  timerText.innerHTML = formatTime(timerSeconds);
}

function clearIntervals() {
  clearInterval(timerInterval);
  timerRunning = false;
  breakRunning = false;
}

function timerStart() {
  if (!timerRunning && !breakRunning) {
    timerDetail.innerHTML = "Time to Work!";
    timerRunning = true;
    timerInterval = setInterval(function () {
      if (timerSeconds > 0) {
        timerSeconds--;
        timerCircle.style.width =
          parseFloat(timerCircle.style.width) - workSize + "px";
        timerCircle.style.height =
          parseFloat(timerCircle.style.height) - workSize + "px";
        updateTimerDisplay();
      } else {
        alert("Time for a 5 minute break!");
        clearIntervals();
        timerSeconds = breakTime;
        timerCircle.style.width = initialSize + "px";
        timerCircle.style.height = initialSize + "px";
        breakTimer();
      }
    }, 1000);
  }
}

function breakTimer() {
  if (!breakRunning) {
    timerDetail.innerHTML = "Take a Break!";
    breakRunning = true;
    timerInterval = setInterval(function () {
      if (timerSeconds > 0) {
        timerSeconds--;
        timerCircle.style.width =
          parseFloat(timerCircle.style.width) - breakSize + "px";
        timerCircle.style.height =
          parseFloat(timerCircle.style.height) - breakSize + "px";
        updateTimerDisplay();
      } else {
        alert("Back to work!");
        clearIntervals();
        timerReset();
      }
    }, 1000);
  }
}

function timerStop() {
  clearIntervals();
}

function timerReset() {
  clearIntervals();
  timerSeconds = workTime;
  timerCircle.style.width = initialSize + "px";
  timerCircle.style.height = initialSize + "px";
  timerDetail.innerHTML = "Time to Work!";
  updateTimerDisplay();
}

updateTimerDisplay();
