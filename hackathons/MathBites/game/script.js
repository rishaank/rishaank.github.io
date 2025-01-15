const concept = localStorage.getItem("concept");

//top bar
const timeText = document.getElementById("timeText");
const correctNum = document.getElementById("correctNum");
const questionNum = document.getElementById("questionNum");
const wrongNum = document.getElementById("wrongNum");
const completedNum = document.getElementById("completedNum");
const showAnswerButton = document.getElementById("showAnswerButton");
const hideAnswerButton = document.getElementById("hideAnswerButton");

//question
const questionText = document.getElementById("questionText");
const personImage = document.getElementById("personImage");

//answer
const answerText = document.getElementById("answerText");

//submit
const submitButton = document.getElementById("submitButton");

//boxes
const questionBox = document.getElementById("questionBox");
const answerBox = document.getElementById("answerBox");
const calcBox = document.getElementById("calcBox");

//bottom bar
const topicText = document.getElementById("topicText");
const showCalcButton = document.getElementById("showCalcButton");
const hideCalcButton = document.getElementById("hideCalcButton");

//fraction inputs
const fractionInput = document.getElementById("fractionInput");
const numeratorInput = document.getElementById("numeratorInput");
const denominatorInput = document.getElementById("denominatorInput");

//decimal inputs
const decimalInput = document.getElementById("decimalInput");
const decimalNumInput = document.getElementById("decimalNumInput");

let numCorrect = 0;
let numWrong = 0;
let numRevealed = 0;
let numCompleted = 0;

let answerRevealed = false;
let firstTimeRevealed = false;
let calcShown = false;

let answerNumerator;
let answerDenominator;

let answerDecimal;

const textboxElement = document.getElementById("textbox");
const miniTextboxElement = document.getElementById("miniTextbox");

let num1 = 0;
let num2 = null;
let sign = "";

const ingredients = ["flour", "sugar", "butter", "milk", "eggs"];
const recipes = ["cake", "cookie", "bread", "pie", "muffin"];

const fractionRatioQuestions = [
  "The recipe calls for [fraction1] cup of (ingredient1), but I'm doubling the batch. How many cups of (ingredient1) do I need?",
  "I need a ratio of [wholeNumber1] parts (ingredient1) to [wholeNumber2] parts (ingredient2) for the perfect (recipe1). If I'm using [wholeNumber3] cups of (ingredient1), how much (ingredient2) should I add?",
];
const decimalsPercentageQuestions = [
  "My cake recipe is for a [wholeNumber1]-pound cake, but I only want to make [percent1] of it. How many pounds of cake should I bake?",
  "A (recipe1) recipe calls for [decimal1] cups of sugar. I accidentally added [decimal2] cups! By what percentage did I go over the original amount?",
];

numeratorInput.addEventListener("keydown", preventDashes);
denominatorInput.addEventListener("keydown", preventDashes);
decimalNumInput.addEventListener("keydown", preventDashes);

document.addEventListener("DOMContentLoaded", function () {
  document.title = "Math Bites | " + concept;
  topicText.textContent = concept;
  generateQuestion();
  showInput();
});

function preventDashes(event) {
  if (event.key === "-") {
    event.preventDefault();
  }
}

function answerToggle() {
  if (answerRevealed) {
    answerRevealed = false;
    showAnswerButton.alt = "View Answer";
    showAnswerButton.title = "View Answer";
    hideAnswerButton.alt = "";
    hideAnswerButton.title = "";
    hideAnswerButton.classList.add("overlayHidden");
    answerBox.style.display = "none";
  } else {
    answerRevealed = true;
    showAnswerButton.alt = "Hide Answer";
    showAnswerButton.title = "Hide Answer";
    hideAnswerButton.alt = "Hide Answer";
    hideAnswerButton.title = "Hide Answer";
    hideAnswerButton.classList.remove("overlayHidden");
    answerBox.style.display = "flex";

    if (!firstTimeRevealed) {
      questionNum.textContent = (
        parseInt(questionNum.textContent) + 1
      ).toString();
      firstTimeRevealed = true;
    }
  }
}

function calcToggle() {
  if (calcShown) {
    calcShown = false;
    showCalcButton.alt = "Show Calculator";
    showCalcButton.title = "Show Calculator";
    hideCalcButton.alt = "";
    hideCalcButton.title = "";
    hideCalcButton.classList.add("overlayHidden");
    calcBox.style.display = "none";
    questionBox.style.marginRight = auto;
  } else {
    calcShown = true;
    showCalcButton.alt = "Hide Calculator";
    showCalcButton.title = "Hide Calculator";
    hideCalcButton.alt = "Hide Calculator";
    hideCalcButton.title = "Hide Calculator";
    hideCalcButton.classList.remove("overlayHidden");
    calcBox.style.display = "flex";
    questionBox.style.marginRight = 0;
  }
}

function submit() {
  let userNumerator, userDenominator, userDecimal;
  if (concept === "Fractions and Ratios") {
    userNumerator = numeratorInput.value;
    userDenominator = denominatorInput.value;
  } else if (concept === "Decimals and Percentages") {
    userDecimal = decimalNumInput.value;
  }

  if (concept === "Fractions and Ratios") {
    if (!userNumerator || !userDenominator) {
      alert("Please enter an answer before submitting.");
      return;
    }
  } else if (concept === "Decimals and Percentages") {
    if (!userDecimal) {
      alert("Please enter an answer before submitting.");
      return;
    }
  }

  if (answerRevealed) {
    answerToggle();
  }

  let isCorrect = false;

  if (
    (concept === "Fractions and Ratios" &&
      userNumerator == answerNumerator &&
      userDenominator == answerDenominator) ||
    (concept === "Decimals and Percentages" && userDecimal == answerDecimal)
  ) {
    isCorrect = true;
  }

  completedNum.textContent = (
    parseInt(completedNum.textContent) + 1
  ).toString();

  if (concept === "Fractions and Ratios") {
    numeratorInput.value = "";
    denominatorInput.value = "";
  } else if (concept === "Decimals and Percentages") {
    decimalNumInput.value = "";
  }

  if (isCorrect) {
    correctNum.textContent = (parseInt(correctNum.textContent) + 1).toString();
    alert("Correct! Click OK to continue.");
    generateQuestion();
    return;
  } else {
    wrongNum.textContent = (parseInt(wrongNum.textContent) + 1).toString();
    answerToggle();
  }

  alert(
    "Sorry thats wrong, take a look at the correct answer and hide it to continue."
  );

  hideAnswerButton.addEventListener("click", generateQuestion, {
    once: true,
  });
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomDecimal() {
  let wholeNumber = getRandomInt(1, 10);
  let decimal = getRandomInt(1, 10);
  return `${wholeNumber}.${decimal}`;
}

function generateQuestion() {
  firstTimeRevealed = false;
  let randomInt = 0;
  if (concept === "Fractions and Ratios") {
    randomInt = getRandomInt(0, fractionRatioQuestions.length);
    question = fractionRatioQuestions[randomInt];

    if (randomInt === 0) {
      numerator1 = getRandomInt(1, 9);
      denominator1 = getRandomInt(1, 9);
      fraction1 = `${numerator1}/${denominator1}`;

      ingredient1 = ingredients[getRandomInt(0, ingredients.length)];

      question = question.replaceAll("[fraction1]", fraction1);
      question = question.replaceAll("(ingredient1)", ingredient1);

      //answer
      answerNumerator = numerator1 * 2;
      answerDenominator = denominator1;
      answerFraction = `${answerNumerator}/${answerDenominator}`;
    } else if (randomInt === 1) {
      wholeNumber1 = getRandomInt(1, 10);
      wholeNumber2 = getRandomInt(1, 10);
      while (wholeNumber2 === wholeNumber1) {
        wholeNumber2 = getRandomInt(1, 10);
      }
      wholeNumber3 = getRandomInt(1, 10);
      while (wholeNumber3 === wholeNumber2 || wholeNumber3 === wholeNumber1) {
        wholeNumber3 = getRandomInt(1, 10);
      }

      ingredient1 = ingredients[getRandomInt(0, ingredients.length)];
      ingredient2 = ingredients[getRandomInt(0, ingredients.length)];
      while (ingredient2 === ingredient1) {
        ingredient2 = ingredients[getRandomInt(0, ingredients.length)];
      }

      recipe1 = recipes[getRandomInt(0, recipes.length)];

      question = question.replaceAll("[wholeNumber1]", wholeNumber1);
      question = question.replaceAll("[wholeNumber2]", wholeNumber2);
      question = question.replaceAll("[wholeNumber3]", wholeNumber3);

      question = question.replaceAll("(ingredient1)", ingredient1);
      question = question.replaceAll("(ingredient2)", ingredient2);

      question = question.replaceAll("(recipe1)", recipe1);

      //answer
      answerNumerator = wholeNumber2 * wholeNumber3;
      answerDenominator = wholeNumber1;
      answerFraction = `${answerNumerator}/${answerDenominator}`;
    }
    questionText.innerHTML = question;
    answerText.innerHTML = answerFraction;
  } else if (concept === "Decimals and Percentages") {
    randomInt = getRandomInt(0, decimalsPercentageQuestions.length);
    question = decimalsPercentageQuestions[randomInt];

    if (randomInt === 0) {
      wholeNumber1 = getRandomInt(1, 10);

      percent1 = getRandomInt(1, 80) + "%";

      question = question.replaceAll("[wholeNumber1]", wholeNumber1);

      question = question.replaceAll("[percent1]", percent1);

      //answer
      answerDecimal = (wholeNumber1 * (parseInt(percent1) / 100)).toFixed(1);
    } else if (randomInt === 1) {
      recipe1 = recipes[getRandomInt(0, recipes.length)];

      decimal1 = getRandomDecimal();
      decimal2 = getRandomDecimal();
      while (decimal2 <= decimal1) {
        decimal2 = getRandomDecimal();
      }

      question = question.replaceAll("(recipe1)", recipe1);

      question = question.replaceAll("[decimal1]", decimal1);

      question = question.replaceAll("[decimal2]", decimal2);

      //answer
      answerDecimal = (((decimal2 - decimal1) / decimal1) * 100).toFixed(1);
    }

    questionText.innerHTML = question;
    answerText.innerHTML = answerDecimal;
  }
  randomInt = getRandomInt(1, 7);
  personImage.src = `../images/people/${randomInt}.png`;
}

function showInput() {
  if (concept === "Fractions and Ratios") {
    fractionInput.style.display = "flex";
  } else if (concept === "Decimals and Percentages") {
    decimalInput.style.display = "flex";
  }
}

function getSignSymbol(sign) {
  switch (sign) {
    case "add":
      return "+";
    case "subtract":
      return "-";
    case "multiply":
      return "x";
    case "divide":
      return "÷";
    case "power":
      return "^";
    default:
      return "";
  }
}

function appendNumber(number) {
  textboxElement.innerHTML =
    textboxElement.innerHTML === "0"
      ? number
      : textboxElement.innerHTML + number;
}

function decimal() {
  if (!textboxElement.innerHTML.includes(".")) {
    textboxElement.innerHTML += ".";
  }
}

function replaceLastOperator(newOperator) {
  miniTextboxElement.innerHTML =
    miniTextboxElement.innerHTML.slice(0, -3) + newOperator;
}

function add() {
  if (textboxElement.innerHTML !== "") {
    num1 = parseFloat(textboxElement.innerHTML);
    miniTextboxElement.innerHTML = textboxElement.innerHTML + " + ";
    textboxElement.innerHTML = "0";
    sign = "add";
    num2 = null;
  } else if (sign !== "") {
    replaceLastOperator("+");
    sign = "add";
  }
}

function subtract() {
  if (textboxElement.innerHTML !== "") {
    num1 = parseFloat(textboxElement.innerHTML);
    miniTextboxElement.innerHTML = textboxElement.innerHTML + " - ";
    textboxElement.innerHTML = "0";
    sign = "subtract";
    num2 = null;
  } else if (sign !== "") {
    replaceLastOperator("-");
    sign = "subtract";
  }
}

function multiply() {
  if (textboxElement.innerHTML !== "") {
    num1 = parseFloat(textboxElement.innerHTML);
    miniTextboxElement.innerHTML = textboxElement.innerHTML + " x ";
    textboxElement.innerHTML = "0";
    sign = "multiply";
    num2 = null;
  } else if (sign !== "") {
    replaceLastOperator("x");
    sign = "multiply";
  }
}

function divide() {
  if (textboxElement.innerHTML !== "") {
    num1 = parseFloat(textboxElement.innerHTML);
    miniTextboxElement.innerHTML = textboxElement.innerHTML + " ÷ ";
    textboxElement.innerHTML = "0";
    sign = "divide";
    num2 = null;
  } else if (sign !== "") {
    replaceLastOperator("÷");
    sign = "divide";
  }
}

function exponent() {
  if (textboxElement.innerHTML !== "") {
    num1 = parseFloat(textboxElement.innerHTML);
    miniTextboxElement.innerHTML = textboxElement.innerHTML + " ^ ";
    textboxElement.innerHTML = "0";
    sign = "power";
    num2 = null;
  } else if (sign !== "") {
    replaceLastOperator("^");
    sign = "power";
  }
}

function calculate() {
  if (textboxElement.innerHTML !== "") {
    if (num2 === null) {
      num2 = parseFloat(textboxElement.innerHTML);
    } else {
      num1 = parseFloat(textboxElement.innerHTML);
    }
  }

  let result;
  if (sign === "add") {
    result = num1 + num2;
  } else if (sign === "subtract") {
    result = num1 - num2;
  } else if (sign === "multiply") {
    result = num1 * num2;
  } else if (sign === "divide") {
    if (num2 === 0) {
      miniTextboxElement.innerHTML = "Error";
      return;
    } else {
      result = num1 / num2;
    }
  } else if (sign === "power") {
    result = Math.pow(num1, num2);
  }

  if (result !== undefined) {
    textboxElement.innerHTML = result;
    num1 = result;
  }

  miniTextboxElement.innerHTML = "0";
}

function clearCalculator() {
  textboxElement.innerHTML = "0";
  miniTextboxElement.innerHTML = "";
  sign = "";
  num1 = 0;
  num2 = null;
}

function signSwitch() {
  if (textboxElement.innerHTML.includes("-")) {
    textboxElement.innerHTML = textboxElement.innerHTML.replace("-", "");
  } else if (textboxElement.innerHTML !== "0") {
    textboxElement.innerHTML = "-" + textboxElement.innerHTML;
  }
}

function backspace() {
  if (textboxElement.innerHTML.length > 1) {
    textboxElement.innerHTML = textboxElement.innerHTML.slice(0, -1);
  } else {
    textboxElement.innerHTML = "0";
  }
}

let elapsedTime = 0;
setInterval(function () {
  elapsedTime += 1;
  const hours = Math.floor(elapsedTime / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = elapsedTime % 60;

  let timeString;
  if (hours > 0) {
    timeString =
      hours +
      ":" +
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0");
  } else if (minutes > 0) {
    timeString = minutes + ":" + String(seconds).padStart(2, "0");
  } else {
    timeString = String(seconds) + "s";
  }

  timeText.textContent = timeString;
}, 1000);
