var cardList = document.getElementById("card-list");
var questionEntryBox = document.getElementById("question-entry-box");
var answerEntryBox = document.getElementById("answer-entry-box");
var addButton = document.getElementById("add-button");
var clearButton = document.getElementById("clear-hidden-button");
var emptyButton = document.getElementById("empty-button");
var reviewButton = document.getElementById("review-button");
var infoDiv = document.getElementById("info");

var questionList = [];
var answerList = [];

addButton.addEventListener("click", addCardItem);
clearButton.addEventListener("click", clearHiddenCardItems);
emptyButton.addEventListener("click", emptyList);
reviewButton.addEventListener("click", review);

function addCardItem() {
  var answerText = answerEntryBox.value;
  var questionText = questionEntryBox.value;

  if (questionText && answerText) {
    cardText = questionText + " | " + answerText;
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
  var cardItem = document.createElement("li");
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
  var hiddenCards = Array.from(cardList.getElementsByClassName("hidden"));
  hiddenCards.forEach((cardItem) => {
    cardItem.remove();
    const cardText = cardItem.innerText.split(" | ");
    questionList.splice(questionList.indexOf(cardText[0]), 1);
    answerList.splice(answerList.indexOf(cardText[1]), 1);
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
  const cardText = this.innerText.split(" | ");
  cardList.removeChild(this);
  questionList.splice(questionList.indexOf(cardText[0]), 1);
  answerList.splice(answerList.indexOf(cardText[1]), 1);
  saveList();
}

function saveList() {
  var cards = [];
  for (var i = 0; i < cardList.children.length; i++) {
    var cardItem = cardList.children[i];
    var cardInfo = {
      card: cardItem.innerText,
      hidden: cardItem.classList.contains("hidden"),
    };
    cards.push(cardInfo);
  }
  localStorage.setItem("cards", JSON.stringify(cards));
  localStorage.setItem("cardQuestions", JSON.stringify(questionList));
  localStorage.setItem("cardAnswers", JSON.stringify(answerList));
  infoToggle();
}

function loadList() {
  var savedCards = localStorage.getItem("cards");
  if (savedCards) {
    var cards = JSON.parse(savedCards);
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      newCardItem(card.card, card.hidden, "append");
    }
  }

  var savedQuestions = localStorage.getItem("cardQuestions");
  if (savedQuestions) {
    questionList = JSON.parse(savedQuestions);
  } else {
    questionList = [];
  }

  var savedAnswers = localStorage.getItem("cardAnswers");
  if (savedAnswers) {
    answerList = JSON.parse(savedAnswers);
  } else {
    answerList = [];
  }

  infoToggle();
}

function infoToggle() {
  if (cardList.children.length === 0) {
    infoDiv.style.display = "block";
  } else {
    infoDiv.style.display = "none";
  }
}

function review() {
  if (cardList.children.length < 4) {
    alert("You need atleast 4 cards to enter review mode.");
  } else {
    window.location.href = "./reviewMode/review.html";
  }
}
loadList();
