const textboxElement = document.getElementById("textbox");
const miniTextboxElement = document.getElementById("miniTextbox");
let num1 = 0;
let num2 = null;
let sign = "";

const historyList = document.getElementById("historyList");

function addHistoryItem() {
  const itemText = `${num1} ${getSignSymbol(sign)} ${num2} = ${
    textboxElement.innerHTML
  }`;
  newHistoryItem(itemText);
}

function newHistoryItem(itemText) {
  const historyItem = document.createElement("li");
  historyItem.innerText = itemText;
  historyList.insertBefore(historyItem, historyList.firstChild);
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

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (/\d/.test(key)) {
    appendNumber(parseInt(key));
  } else if (key === ".") {
    decimal();
  } else if (key === "+") {
    add();
  } else if (key === "-") {
    subtract();
  } else if (key === "*" || key === "x") {
    multiply();
  } else if (key === "/") {
    divide();
  } else if (key === "^") {
    exponent();
  } else if (key === "Enter" || key === "=") {
    calculate();
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "Escape" || key === "c") {
    clearCalculator();
  } else if (key === "Delete") {
    textboxElement.innerHTML = "0";
  }
});

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
    textboxElement.innerHTML = "";
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
    textboxElement.innerHTML = "";
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
    textboxElement.innerHTML = "";
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
    textboxElement.innerHTML = "";
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
    textboxElement.innerHTML = "";
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
    addHistoryItem();
    num1 = result;
  }

  miniTextboxElement.innerHTML = "";
}

function clearCalculator() {
  textboxElement.innerHTML = "0";
  miniTextboxElement.innerHTML = "";
  sign = "";
  num1 = 0;
  num2 = null;
  historyList.innerHTML = "";
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
