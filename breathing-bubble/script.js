// Get references to the bubble element and toggle button
const bubble = document.querySelector('.bubble');
const toggleBtn = document.getElementById('toggleBtn');

let isAnimating = true;

// Toggle the animation on button click
toggleBtn.addEventListener('click', () => {
  if (isAnimating) {
    bubble.style.animationPlayState = 'paused';
    toggleBtn.textContent = 'Start';
  } else {
    bubble.style.animationPlayState = 'running';
    toggleBtn.textContent = 'Pause';
  }
  isAnimating = !isAnimating;
});
