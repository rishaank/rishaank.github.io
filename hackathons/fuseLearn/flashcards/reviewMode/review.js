var questionList = [];
var answerList = [];

var questionText = document.getElementById("question-text");
var answerButton1 = document.getElementById("answer-button-1");
var answerButton2 = document.getElementById("answer-button-2");
var answerButton3 = document.getElementById("answer-button-3");
var answerButton4 = document.getElementById("answer-button-4");

var nextQuestionButton = document.getElementById("next-question-button");
nextQuestionButton.addEventListener("click", nextQuestion);

var incorrectSign = document.getElementById("incorrect-sign");
var incorrectText = document.getElementById("incorrect-text");

var correctSign = document.getElementById("correct-sign");
var correctText = document.getElementById("correct-text");

var correctScore = document.getElementById("correct-score");
var incorrectScore = document.getElementById("incorrect-score");

var incorrectCardText = document.getElementById("incorrect-card-text");

var currentQuestionNumber;

function loadLists() {
  var savedQuestions = localStorage.getItem("cardQuestions");
  questionList = JSON.parse(savedQuestions);

  var savedAnswers = localStorage.getItem("cardAnswers");
  answerList = JSON.parse(savedAnswers);

  if (
    questionList &&
    answerList &&
    questionList.length >= 4 &&
    answerList.length >= 4
  ) {
    refreshQA(1);
  }
}

function randomNumber(min, max, ...impossibleValues) {
  let random = Math.floor(Math.random() * (max - min + 1)) + min;

  while (impossibleValues.includes(random)) {
    random = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return random;
}

function refreshQA(questionNumber) {
  currentQuestionNumber = questionNumber;
  questionNumber -= 1;
  questionText.innerText = questionList[questionNumber];
  incorrectCardText.innerText =
    questionList[questionNumber] + " | " + answerList[questionNumber];

  const buttonAnswers = [];
  const correctButtonIndex = randomNumber(0, 3);

  buttonAnswers[correctButtonIndex] = answerList[questionNumber];

  const incorrectAnswersPool = [...answerList];
  incorrectAnswersPool.splice(questionNumber, 1);

  for (let i = 0; i < 4; i++) {
    if (i === correctButtonIndex) {
      continue;
    }
    const randomIndex = randomNumber(0, incorrectAnswersPool.length - 1);
    buttonAnswers[i] = incorrectAnswersPool.splice(randomIndex, 1)[0];
  }

  answerButton1.innerText = buttonAnswers[0];
  answerButton2.innerText = buttonAnswers[1];
  answerButton3.innerText = buttonAnswers[2];
  answerButton4.innerText = buttonAnswers[3];

  answerButton1.onclick = function () {
    checkCorrect(answerButton1, buttonAnswers[correctButtonIndex]);
  };
  answerButton2.onclick = function () {
    checkCorrect(answerButton2, buttonAnswers[correctButtonIndex]);
  };
  answerButton3.onclick = function () {
    checkCorrect(answerButton3, buttonAnswers[correctButtonIndex]);
  };
  answerButton4.onclick = function () {
    checkCorrect(answerButton4, buttonAnswers[correctButtonIndex]);
  };
}

function checkCorrect(clickedButton, correctButton) {
  QAToggle("hide");
  if (clickedButton.innerText === correctButton) {
    correctToggle("show");
    correctScore.innerText = (parseInt(correctScore.innerText) + 1).toString();
  } else {
    incorrectToggle("show");
    incorrectScore.innerText = (
      parseInt(incorrectScore.innerText) + 1
    ).toString();
  }
}

function QAToggle(toggle) {
  if (toggle === "hide") {
    questionText.style.display = "none";
    answerButton1.style.display = "none";
    answerButton2.style.display = "none";
    answerButton3.style.display = "none";
    answerButton4.style.display = "none";
  } else {
    questionText.style.display = "block";
    answerButton1.style.display = "block";
    answerButton2.style.display = "block";
    answerButton3.style.display = "block";
    answerButton4.style.display = "block";
  }
}

function incorrectToggle(toggle) {
  if (toggle === "hide") {
    incorrectSign.style.display = "none";
    incorrectText.style.display = "none";
    nextQuestionButton.style.display = "none";
    incorrectCardText.style.display = "none";
  } else {
    incorrectSign.style.display = "block";
    incorrectText.style.display = "block";
    nextQuestionButton.style.display = "block";
    incorrectCardText.style.display = "block";
  }

  correctSign.style.display = "none";
  correctText.style.display = "none";
}

function correctToggle(toggle) {
  if (toggle === "hide") {
    correctSign.style.display = "none";
    correctText.style.display = "none";
    nextQuestionButton.style.display = "none";
  } else {
    correctSign.style.display = "block";
    correctText.style.display = "block";
    nextQuestionButton.style.display = "block";
  }

  incorrectSign.style.display = "none";
  incorrectText.style.display = "none";
  incorrectCardText.style.display = "none";
}

function nextQuestion() {
  QAToggle("show");
  incorrectToggle("hide");
  correctToggle("hide");
  refreshQA(randomNumber(1, questionList.length, currentQuestionNumber));
}

loadLists();
