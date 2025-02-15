document.addEventListener("DOMContentLoaded", () => {
    const maze = document.getElementById("maze");
    const message = document.getElementById("message");

    const winSound = new Audio("assets/win-sound.mp3");
    const moveSound = new Audio("assets/move-sound.mp3");

    // Maze Layout (0 = empty, 1 = wall, 2 = player, 3 = goal)
    const mazeLayout = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 1, 0, 0, 3, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    let playerPos = { x: 1, y: 1 };

    function drawMaze() {
        maze.innerHTML = "";
        for (let y = 0; y < mazeLayout.length; y++) {
            for (let x = 0; x < mazeLayout[y].length; x++) {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                if (mazeLayout[y][x] === 1) cell.classList.add("wall");
                if (mazeLayout[y][x] === 2) {
                    cell.classList.add("player");
                    playerPos = { x, y };
                }
                if (mazeLayout[y][x] === 3) cell.classList.add("goal");
                cell.dataset.x = x;
                cell.dataset.y = y;
                maze.appendChild(cell);
            }
        }
    }

    function movePlayer(dx, dy) {
        let newX = playerPos.x + dx;
        let newY = playerPos.y + dy;

        if (mazeLayout[newY][newX] !== 1) {
            mazeLayout[playerPos.y][playerPos.x] = 0;
            playerPos = { x: newX, y: newY };
            mazeLayout[playerPos.y][playerPos.x] = 2;

            moveSound.play();

            if (mazeLayout[newY][newX] === 3) {
                message.innerText = "🎉 You Win!";
                winSound.play();
            }

            drawMaze();
        }
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") movePlayer(1, 0);
        if (event.key === "ArrowLeft") movePlayer(-1, 0);
        if (event.key === "ArrowDown") movePlayer(0, 1);
        if (event.key === "ArrowUp") movePlayer(0, -1);
    });

    drawMaze();
});
