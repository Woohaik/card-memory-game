// Card Html Element
const
  cardContainer = document.querySelector(".card-container"),
  modal = document.querySelector('.bg-overlay'),
  attempts = document.querySelector('#attempts');


// Card Template
const cardTemplate = (type, index) => `
<div class="flip-card">
  <div class="card">
    <div class="card__front">
      <div class="card__corner up">
        <div class="card__corner__letter" style="color: ${type.color}">A</div>
        <img src="img/game/${type.name}.png" alt="card corner symbol">
      </div>
      <div class="card__corner down">
        <div class="card__corner__letter" style="color: ${type.color}">A</div>
        <img src="img/game/${type.name}.png" alt="card corner symbol">
      </div>
      <img class="card__center" src="img/game/${type.name}.png" alt="card center symbol">
    </div>
      <div class="card__back" onclick="evaluateClick(${index})">
        <img src="img/game/back_card.png" alt="card back face">
      </div>
  </div>
</div>
`;

// Constants
const flipedClassName = "fliped";
const theTimer = new Timer(timerHtml);
const cardTypes = [
  {
    name: "diamond",
    color: "red"
  },
  {
    name: "pica",
    color: "black"
  }
];

// variables
let thisGameCards = [], thisGameHTMLCards = [], thisGameMoves = 0, finishedTime = 0, thisGameAttempts = -1;

// Functions
const addAttempt = () => attempts.innerHTML = ++thisGameAttempts;

function setGame() {
  const selectedCards = [];
  addAttempt();
  functionalLoop(cardTypes.length, (number) => {  // CardTypes to use  
    selectedCards.push({ ...cardTypes[number - 1] }, { ...cardTypes[number - 1] });
  });
  thisGameCards = selectedCards.randomizeArray();
  cardContainer.innerHTML = thisGameCards.reduce((acc, ac, index) => acc + cardTemplate(ac, index), "");
  thisGameHTMLCards = document.querySelectorAll(".card");
}

const flipCard = ({ classList }) =>
  classList.contains(flipedClassName) ?
    classList.remove(flipedClassName) // If is already fliped remove
    : classList.add(flipedClassName)

function playAgain() {
  modal.style.display = "none";      // Hide modal
  resetGame();
}

const rotateBack = (indexes) => setTimeout(
  () => {
    indexes.forEach(index => {
      flipCard(thisGameHTMLCards[index]);
    })
  },
  500
);

const gameEnded = () => {
  finishedTime = theTimer.stop();
  const innerModal = modal.querySelector(".win-modal h2");
  innerModal.innerHTML = `You successfully finished the 4 card memory game with a total time of: ${millSecsToSecString(finishedTime)} and ${thisGameAttempts} retrys.`;
  modal.style.display = "block";
}

function evaluateClick(index) {
  if (thisGameMoves === 0) (theTimer.init(), ++thisGameMoves);
  flipCard(thisGameHTMLCards[index]);
  const otherFlipedCard = thisGameCards.find(({ done, fliped }) => fliped && !done);
  if (otherFlipedCard) {
    if (otherFlipedCard.name === thisGameCards[index].name) {   // If so check if are the same type
      otherFlipedCard.done = true;
      thisGameCards[index].done = true;
      otherFlipedCard.fliped = false;
      thisGameCards[index].fliped = false;
    } else {
      rotateBack([index, thisGameCards.indexOf(otherFlipedCard)]); // re-rotate both
      otherFlipedCard.fliped = false;
      addAttempt();
    }
  } else {
    thisGameCards[index].fliped = true; // There is not another fliped card
  }
  if (thisGameCards.every(singleCard => singleCard.done)) gameEnded(); // If all cards are done finish the game
}

function resetGame() {
  document.querySelector(".win-modal__save-score .form").style.display = "block";
  document.querySelector(".win-modal__save-score .saved").style.display = "none";
  theTimer.clearCurrentInterval()
  thisGameHTMLCards.forEach(card => card.classList.remove(flipedClassName));
  thisGameMoves = 0;
  thisGameAttempts = -1;
  setTimeout(() => {
    setGame();
  }, 400);
}

function submitScore() {
  const nameInput = document.getElementsByName("score")[0];
  const name = nameInput.value;
  if (!name) return alert("Add a Name.")
  saveScore({ name, time: finishedTime, fails: thisGameAttempts });
  document.querySelector(".win-modal__save-score .form").style.display = "none";
  document.querySelector(".win-modal__save-score .saved").style.display = "block";
}
