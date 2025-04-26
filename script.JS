// script.js

let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
    const guess = parseInt(document.getElementById("guess").value);
    attempts++;
    
    let message = "";
    
    if (guess === secretNumber) {
        message = `Congratulations! You guessed the correct number in ${attempts} attempts!`;
        document.getElementById("restart-btn").style.display = "block";
    } else if (guess < secretNumber) {
        message = "Too low! Try again.";
    } else {
        message = "Too high! Try again.";
    }
    
    document.getElementById("message").textContent = message;
    document.getElementById("attempts").textContent = `Attempts: ${attempts}`;
}

function restartGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1; // Generate new random number
    attempts = 0;
    
    document.getElementById("guess").value = "";
    document.getElementById("message").textContent = "";
    document.getElementById("attempts").textContent = `Attempts: 0`;
    document.getElementById("restart-btn").style.display = "none";
}

