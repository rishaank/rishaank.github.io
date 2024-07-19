var timerCircle = document.getElementById("timerCircle");
var timerText = document.getElementById("timerText");
var timerDetail = document.getElementById("timerDetail");
var timerStartBtn = document.getElementById("timerStart");
var timerStopBtn = document.getElementById("timerStop");
var timerResetBtn = document.getElementById("timerReset");

var workTime = 1500; // 25 minutes
var breakTime = 300; // 5 minutes
var timerSeconds = workTime;
var timerRunning = false;
var breakRunning = false;
var timerInterval;

function getInitialDiameter() {
  return parseFloat(getComputedStyle(timerCircle.parentElement).width);
}

var initialDiameter = getInitialDiameter();

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
        updateCircleSize(workTime);
        updateTimerDisplay();
      } else {
        alert("Time for a 5 minute break!");
        clearIntervals();
        timerSeconds = breakTime;
        resetCircleSize();
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
        updateCircleSize(breakTime);
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
  resetCircleSize();
  timerDetail.innerHTML = "Time to Work!";
  updateTimerDisplay();
}

function resetCircleSize() {
  timerCircle.style.width = initialDiameter + "px";
  timerCircle.style.height = initialDiameter + "px";
}

function updateCircleSize(totalTime) {
  var currentDiameter = parseFloat(getComputedStyle(timerCircle).width);
  var decrement = initialDiameter / totalTime;
  var newDiameter = currentDiameter - decrement;
  timerCircle.style.width = newDiameter + "px";
  timerCircle.style.height = newDiameter + "px";
}

function resizeCircle() {
  initialDiameter = getInitialDiameter();
  var elapsed = workTime - timerSeconds;
  var newDiameter = initialDiameter * (1 - elapsed / workTime);
  timerCircle.style.width = newDiameter + "px";
  timerCircle.style.height = newDiameter + "px";
}

window.addEventListener("resize", resizeCircle);

updateTimerDisplay();
resetCircleSize();
