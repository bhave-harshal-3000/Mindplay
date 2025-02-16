

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 600;
    canvas.height = 600;

    const tileSize = 40;
    let startTime, endTime;
    let totalMoves = 0, validMoves = 0, wrongMoves = 0;
    let gameStarted = false;

    let maze = generateRandomMaze(15, 15);
    const player = { x: 1, y: 1 };
    const goal = { x: maze[0].length - 2, y: maze.length - 2 };

    const playerImage = new Image();
    playerImage.src = "https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png";
    const goalImage = new Image();
    goalImage.src = "https://img.icons8.com/color/48/000000/flag.png";

    const moveSound = new Audio("https://assets.mixkit.co/active_storage/sfx/3005/3005-preview.mp3");
    const winSound = new Audio("https://assets.mixkit.co/active_storage/sfx/1069/1069-preview.mp3");

    moveSound.volume = 0.5;
    winSound.volume = 0.5;

    function generateRandomMaze(rows, cols) {
        let maze = Array.from({ length: rows }, () => Array(cols).fill(1));

        function carvePath(x, y) {
            maze[y][x] = 0;
            const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]].sort(() => Math.random() - 0.5);

            for (let [dx, dy] of directions) {
                const nx = x + dx * 2, ny = y + dy * 2;
                if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && maze[ny][nx] === 1) {
                    maze[y + dy][x + dx] = 0;
                    carvePath(nx, ny);
                }
            }
        }

        carvePath(1, 1);
        maze[rows - 3][cols - 2] = 0;
        maze[rows - 2][cols - 2] = 0;
        return maze;
    }

    function drawMaze() {
        for (let row = 0; row < maze.length; row++) {
            for (let col = 0; col < maze[row].length; col++) {
                ctx.fillStyle = maze[row][col] === 1 ? "#333" : "#fff";
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            }
        }
    }

    function drawPlayer() {
        ctx.drawImage(playerImage, player.x * tileSize, player.y * tileSize, tileSize, tileSize);
    }

    function drawGoal() {
        ctx.drawImage(goalImage, goal.x * tileSize, goal.y * tileSize, tileSize, tileSize);
    }

    function showWinPopup(time) {
        alert(`You completed the maze in ${time} seconds! 🎉`);
        winSound.play();
    }

    document.addEventListener("keydown", (event) => {
        if (!gameStarted) return;

        let newX = player.x, newY = player.y;
        totalMoves++;

        if (event.key === "ArrowUp") newY--;
        if (event.key === "ArrowDown") newY++;
        if (event.key === "ArrowLeft") newX--;
        if (event.key === "ArrowRight") newX++;

        if (maze[newY] && maze[newY][newX] === 0) {
            player.x = newX;
            player.y = newY;
            validMoves++;
            moveSound.play();
        } else {
            wrongMoves++;
        }

        if (player.x === goal.x && player.y === goal.y) {
            endTime = Date.now();
            const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
            showWinPopup(timeTaken);
            saveScore(timeTaken);
        }

        draw();
    });

    function saveScore(timeTaken) {
        let problemSolving = (100 - (timeTaken * 5)).toFixed(2);
        if (problemSolving < 0) problemSolving = 0;

        fetch("http://localhost:5500/api/score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ problemSolving: parseFloat(problemSolving) })
        })
        .then(response => response.json())
        .then(() => console.log("Score saved successfully!"))
        .catch(error => console.error("Error:", error));
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMaze();
        drawGoal();
        drawPlayer();
    }

    window.startGame = () => {
        maze = generateRandomMaze(15, 15);
        player.x = 1;
        player.y = 1;
        startTime = Date.now();
        totalMoves = 0;
        validMoves = 0;
        wrongMoves = 0;
        gameStarted = true;
        draw();
    };

    window.onload = draw;
});
