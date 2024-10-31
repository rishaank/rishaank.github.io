const timerCircle = document.getElementById("timerCircle");
const timerText = document.getElementById("timerText");
const timerDetail = document.getElementById("timerDetail");
const timerStartBtn = document.getElementById("timerStart");
const timerStopBtn = document.getElementById("timerStop");
const timerResetBtn = document.getElementById("timerReset");

const workTime = 1500; // 25 minutes
const breakTime = 300; // 5 minutes
let timerSeconds = workTime;
let timerRunning = false;
let breakRunning = false;
let timerInterval;

function getInitialDiameter() {
  return parseFloat(getComputedStyle(timerCircle.parentElement).width);
}

let initialDiameter = getInitialDiameter();

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
  let currentDiameter = parseFloat(getComputedStyle(timerCircle).width);
  let decrement = initialDiameter / totalTime;
  let newDiameter = currentDiameter - decrement;
  timerCircle.style.width = newDiameter + "px";
  timerCircle.style.height = newDiameter + "px";
}

function resizeCircle() {
  initialDiameter = getInitialDiameter();
  let elapsed = workTime - timerSeconds;
  let newDiameter = initialDiameter * (1 - elapsed / workTime);
  timerCircle.style.width = newDiameter + "px";
  timerCircle.style.height = newDiameter + "px";
}

window.addEventListener("resize", resizeCircle);

updateTimerDisplay();
resetCircleSize();
