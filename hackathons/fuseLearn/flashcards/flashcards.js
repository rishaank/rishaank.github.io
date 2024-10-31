const cardList = document.getElementById("card-list");
const questionEntryBox = document.getElementById("question-entry-box");
const answerEntryBox = document.getElementById("answer-entry-box");
const addButton = document.getElementById("add-button");
const clearButton = document.getElementById("clear-hidden-button");
const emptyButton = document.getElementById("empty-button");
const reviewButton = document.getElementById("review-button");
const infoDiv = document.getElementById("info");

let questionList = [];
let answerList = [];

addButton.addEventListener("click", addCardItem);
clearButton.addEventListener("click", clearHiddenCardItems);
emptyButton.addEventListener("click", emptyList);
reviewButton.addEventListener("click", review);

function addCardItem() {
  const answerText = answerEntryBox.value;
  const questionText = questionEntryBox.value;

  if (questionText && answerText) {
    const cardText = `${questionText} | ${answerText}`;
    newCardItem(cardText, false, "prepend");
    questionList.unshift(questionText);
    answerList.unshift(answerText);
    saveList();
    questionEntryBox.value = "";
    answerEntryBox.value = "";
  } else {
    alert("Please enter a valid question and answer.");
  }
}

function newCardItem(_cardText, hidden, type) {
  const cardItem = document.createElement("li");
  cardItem.innerText = _cardText;

  if (hidden) {
    cardItem.classList.add("hidden");
  }

  cardItem.addEventListener("click", toggleCardVisibility);
  cardItem.addEventListener("dblclick", deleteCard);

  if (type === "append") {
    cardList.appendChild(cardItem);
  } else if (type === "prepend") {
    cardList.insertBefore(cardItem, cardList.firstChild);
  }
  infoToggle();
}

function clearHiddenCardItems() {
  const hiddenCards = Array.from(cardList.getElementsByClassName("hidden"));
  hiddenCards.forEach((cardItem) => {
    cardItem.remove();
    const [questionText, answerText] = cardItem.innerText.split(" | ");
    questionList.splice(questionList.indexOf(questionText), 1);
    answerList.splice(answerList.indexOf(answerText), 1);
  });
  saveList();
}

function emptyList() {
  while (cardList.firstChild) {
    cardList.removeChild(cardList.firstChild);
    questionList.shift();
    answerList.shift();
  }
  saveList();
}

function toggleCardVisibility() {
  this.classList.toggle("hidden");
  saveList();
}

function deleteCard() {
  const [questionText, answerText] = this.innerText.split(" | ");
  cardList.removeChild(this);
  questionList.splice(questionList.indexOf(questionText), 1);
  answerList.splice(answerList.indexOf(answerText), 1);
  saveList();
}

function saveList() {
  const cards = Array.from(cardList.children).map((cardItem) => ({
    card: cardItem.innerText,
    hidden: cardItem.classList.contains("hidden"),
  }));
  localStorage.setItem("cards", JSON.stringify(cards));
  localStorage.setItem("cardQuestions", JSON.stringify(questionList));
  localStorage.setItem("cardAnswers", JSON.stringify(answerList));
  infoToggle();
}

function loadList() {
  const savedCards = localStorage.getItem("cards");
  if (savedCards) {
    const cards = JSON.parse(savedCards);
    cards.forEach((card) => newCardItem(card.card, card.hidden, "append"));
  }

  questionList = JSON.parse(localStorage.getItem("cardQuestions")) || [];
  answerList = JSON.parse(localStorage.getItem("cardAnswers")) || [];

  infoToggle();
}

function infoToggle() {
  infoDiv.style.display = cardList.children.length === 0 ? "block" : "none";
}

function review() {
  if (cardList.children.length < 4) {
    alert("You need at least 4 cards to enter review mode.");
  } else {
    window.location.href = "./reviewMode/review.html";
  }
}

loadList();
