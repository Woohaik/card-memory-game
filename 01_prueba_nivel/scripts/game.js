// Html Element
const cardContainer = document.querySelector(".card-container");
// Template
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
    <div>
      <div class="card__back" onclick="evaluateClick(event, ${index})">
        <img src="img/game/back_card.png" alt="card back face">
      </div>
    </div>
  </div>
</div>
`;
// Constants
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


class gameType {
    constructor() {

    }
}