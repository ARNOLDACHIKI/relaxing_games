// Sound Effects
const flipSound = new Audio('assets/flip.mp3');
const matchSound = new Audio('assets/match.mp3');

// DOM Elements
const gameBoard = document.querySelector('.game');
const scoreElement = document.getElementById('score');
const resetButton = document.getElementById('reset-btn');

let firstCard = null;
let secondCard = null;
let score = 0;
let lockBoard = false;

// Array of paired emojis (Feel free to add more pairs and adjust grid)
const emojis = ["😀", "😀", "🐱", "🐱", "🍎", "🍎", "🎸", "🎸"];

// Initialize the game
function initGame() {
  // Reset board and score
  gameBoard.innerHTML = '';
  score = 0;
  updateScore();

  // Reset variables
  firstCard = null;
  secondCard = null;
  lockBoard = false;

  // Shuffle emojis and create cards
  const shuffledEmojis = [...emojis].sort(() => 0.5 - Math.random());
  shuffledEmojis.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;

    // Create front and back faces
    const frontFace = document.createElement('div');
    frontFace.classList.add('face', 'front');
    frontFace.textContent = '';
    
    const backFace = document.createElement('div');
    backFace.classList.add('face', 'back');
    backFace.textContent = emoji;
    
    card.appendChild(frontFace);
    card.appendChild(backFace);

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

// Update the score display
function updateScore() {
  scoreElement.textContent = score;
}

// Card Flip Functionality
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  flipSound.currentTime = 0;
  flipSound.play();
  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  // Check for match after a short delay to allow flip animation
  setTimeout(checkForMatch, 700);
}

// Check if the two flipped cards match
function checkForMatch() {
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    // If match, play sound, update score, and disable further clicking on these cards
    matchSound.currentTime = 0;
    matchSound.play();
    score += 10;
    updateScore();

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  } else {
    // Not a match: flip cards back
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
  }
  resetBoard();
}

// Reset tracking variables for next turn
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Reset game on button click
resetButton.addEventListener('click', initGame);

// Start the game on page load
initGame();
