"use strict";

const player0Section = document.querySelector(".player--0");
const player1Section = document.querySelector(".player--1");
const cumulatedScore0 = document.getElementById("score--0");
const cumulatedScore1 = document.getElementById("score--1");
const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const diceImage = document.querySelector(".dice");

let currentScore, activePlayer, playing, cumulatedScores;

const init = () => {
  cumulatedScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  cumulatedScore0.textContent = 0;
  cumulatedScore1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  diceImage.classList.add("hidden");
  player0Section.classList.add("player--active");
  player0Section.classList.remove("player--winner");
  player1Section.classList.remove("player--active");
  player1Section.classList.remove("player--winner");
};

init();

const changePlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Section.classList.toggle("player--active");
  player1Section.classList.toggle("player--active");
};

btnNew.addEventListener("click", init);

btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);
    diceImage.src = `img/dice-${dice}.png`;
    diceImage.classList.remove("hidden");

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      changePlayer();
    }
  }

  // if (player0Section.classList.contains("player--active")) {
  //   currentScore0.textContent =
  //     dice !== 1 ? Number(currentScore0.textContent) + dice : 0;

  //   if (dice === 1) changePlayer();
  // } else if (player1Section.classList.contains("player--active")) {
  //   currentScore1.textContent =
  //     dice !== 1 ? Number(currentScore1.textContent) + dice : 0;

  //   if (dice === 1) changePlayer();
  // }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    cumulatedScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      cumulatedScores[activePlayer];

    if (cumulatedScores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      diceImage.classList.add("hidden");
    } else {
      changePlayer();
    }
  }

  // if (player0Section.classList.contains("player--active")) {
  //   cumulatedScore0.textContent =
  //     Number(cumulatedScore0.textContent) + Number(currentScore0.textContent);
  //   currentScore0.textContent = 0;
  //   changePlayer();
  // } else {
  //   cumulatedScore1.textContent =
  //     Number(cumulatedScore1.textContent) + Number(currentScore1.textContent);
  //   currentScore1.textContent = 0;
  //   changePlayer();
  // }
});
