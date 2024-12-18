let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const prevGuesses = document.querySelector(".guesses");
const lowOrHi = document.querySelector(".lowOrHi");
const remaining = document.querySelector(".lastResult");
const startOver = document.querySelector(".resultParas");

const p = document.createElement("p");
let numGuesses = 0;
let playGame = true;

if (playGame) {
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("Please enter a valid number.");
  } else if (guess > 100) {
    alert("Please enter a number less than or equal to 100");
  } else if (guess < 1) {
    alert("Please enter a number greater than or equal to 1");
  } else {
    if (numGuesses === 10) {
      displayGuess(guess);
      displayMessage(`Game Over! The number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(
      `CONGRATULATIONS! You have guessed the number ${randomNumber}`
    );
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(`Number is LOW. Guess Higher!`);
  } else if (guess > randomNumber) {
    displayMessage(`Number is HIGH. Guess Lower!`);
  }
}

function displayGuess(guess) {
  userInput.value = "";
  prevGuesses.innerHTML += `${guess},  `;
  numGuesses++;
  remaining.innerHTML = `${10 - numGuesses}`;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  p.classList.add("button");
  p.textContent = "Start New Game";
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector("#newGame") || p;
  newGameButton.addEventListener("click", function (e) {
    randomNumber = parseInt(Math.random() * 100 + 1);
    numGuesses = 0;
    lowOrHi.innerHTML = "";
    prevGuesses.innerHTML = "";
    remaining.innerHTML = `10`;
    userInput.removeAttribute("disabled");
    startOver.removeChild(p);
    playGame = true;
  });
}
