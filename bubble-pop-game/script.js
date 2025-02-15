// Score variables
let score = 0;
const scoreElement = document.getElementById('score');
const gameArea = document.getElementById('game-area');
const popSound = new Audio('assets/pop.mp3');

// Function to update the displayed score
function updateScore() {
  scoreElement.textContent = score;
}

// Function to create a new bubble
function createBubble() {
  let bubble = document.createElement("div");
  bubble.classList.add("bubble");
  gameArea.appendChild(bubble);

  // Set bubble position randomly within viewport bounds
  const bubbleSize = 50;
  let x = Math.random() * (window.innerWidth - bubbleSize);
  let y = Math.random() * (window.innerHeight - bubbleSize);
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;

  // Bubble click event: play sound, update score, and remove bubble
  bubble.addEventListener("click", () => {
    popSound.currentTime = 0;
    popSound.play();
    bubble.remove();
    score += 10;
    updateScore();
  });

  // Automatically remove bubble after 4 seconds if not clicked
  setTimeout(() => {
    if (bubble.parentNode) {
      bubble.remove();
    }
  }, 4000);
}

// Create bubbles at intervals
setInterval(createBubble, 1000);

// Update game area dimensions on window resize
window.addEventListener('resize', () => {
  gameArea.style.width = window.innerWidth + 'px';
  gameArea.style.height = window.innerHeight + 'px';
});
