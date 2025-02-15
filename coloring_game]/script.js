let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let currentColor = 'black';
let brushSize = 20;

// Set color
function setColor(color) {
    currentColor = color;
}

// Brush size change
document.getElementById('brush-size').addEventListener('input', function () {
    brushSize = this.value;
});

// Drawing event
canvas.addEventListener('mousedown', function (event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    draw(x, y);
});

// Draw function
function draw(x, y) {
    ctx.fillStyle = currentColor;
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();
}

// Clear canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
