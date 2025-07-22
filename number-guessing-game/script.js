// Constants and state
let min = 1;
let max = 100;
let secretNumber;
let attempts = 0;
let bestScore = null;
let guessLimit = 5;
let wrongGuesses = 0;

// DOM Elements
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const resetBtn = document.getElementById("reset-btn");
const feedback = document.getElementById("feedback");
const attemptsDisplay = document.querySelector("#attempts span");
const highScoreDisplay = document.querySelector("#high-score span");
const levelSelect = document.getElementById("level");

// Generate a new random number
function generateNumber() {
  secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  attempts = 0;
  wrongGuesses = 0;
  attemptsDisplay.textContent = attempts;
  feedback.textContent = "";
  guessInput.disabled = false;
  guessBtn.disabled = false;
}

generateNumber(); // Initial game start

// Handle guessing
guessBtn.addEventListener("click", () => {
  const userGuess = Number(guessInput.value);

  if (!userGuess || userGuess < min || userGuess > max) {
    feedback.textContent = `Please enter a number between ${min} and ${max}`;
    return;
  }

  attempts++;
  attemptsDisplay.textContent = attempts;

  if (userGuess === secretNumber) {
    feedback.textContent = `Correct! The number was ${secretNumber}`;
    guessInput.disabled = true;
    guessBtn.disabled = true;

    if (!bestScore || attempts < bestScore) {
      bestScore = attempts;
      highScoreDisplay.textContent = bestScore;
    }
  } else {
    wrongGuesses++;
    if (userGuess < secretNumber) {
      feedback.textContent = "Too low.";
    } else {
      feedback.textContent = "Too high.";
    }

    if (wrongGuesses === guessLimit) {
      const hint = secretNumber % 2 === 0
        ? "Hint: The number is even."
        : "Hint: The number is odd.";
      feedback.textContent += " " + hint;
    }
  }

  guessInput.value = "";
  guessInput.focus();
});

// Reset game
resetBtn.addEventListener("click", () => {
  generateNumber();
  guessInput.value = "";
  feedback.textContent = "Game reset.";
});

// Handle difficulty change
levelSelect.addEventListener("change", () => {
  max = Number(levelSelect.value);
  document.getElementById("max").textContent = max;
  generateNumber();
});

