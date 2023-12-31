const mainDiv = document.getElementById("main");
const addonsDiv = document.getElementById("addons");

const lines = 16, columns = 16;
let grid = [columns];
let lost = false;
let fruit = [2];
let snake = [];
let points = 0;
let direction = 3;

const gridDisplay = document.createElement("div");
gridDisplay.textContent;
gridDisplay.id = "gridDisplay";

const pointsDisplay = document.createElement("p");
pointsDisplay.textContent = "Pontos: " + points;
pointsDisplay.id = "pointsDisplay";

mainDiv.appendChild(gridDisplay);
addonsDiv.appendChild(pointsDisplay);

function buildGrid() {
    for (let l = 0; l < lines; l++) {
        let ln = [];
        for (let c = 0; c < columns; c++) {
            ln[c] = 0
        }
        grid[l] = ln;
    }
}

function spawnSnake(x, y) {
    grid[x][y] = 1;
    snake.push([x, y]);
    for (let c = 0; c < 2; c++) {
        if (!x - (1 + c) <= 0) {
            grid[x][y - (1 + c)] = 1;
            snake.push([x, y - (1 + c)]);
        }
    }
}

function spawnFruit() {
    while (true) {
        let x = Math.floor(Math.random() * (lines + 1));
        let y = Math.floor(Math.random() * (columns + 1));
        if (grid[x][y] == 0) {
            grid[x][y] = 2;
            fruit[0] = x;
            fruit[1] = y;
            break;
        }
    }
}

function updtSnakeGrid() {
    buildGrid();
    for (const pos of snake) {
        grid[pos[0]][pos[1]] = 1;
    }
    updtFruitGrid();
}

function updtFruitGrid() {
    grid[fruit[0]][fruit[1]] = 2;
}

function consumeFruit() {
    grid[fruit[0]][fruit[1]] = 0;
    points++;
    pointsDisplay.textContent = "Pontos: " + points;
    spawnFruit();
    updtSnakeGrid();
}

function renderGrid() {
    gridDisplay.innerHTML = '';
    for (let l = 0; l < lines; l++) {
        let lineDisp = document.createElement("p")
        for (let c = 0; c < columns; c++) {
            switch (grid[l][c]) {
                case 0:
                    lineDisp.textContent += "[0]";
                    break;
                case 1:
                    lineDisp.textContent += (lost) ? "[x]" : "[1]";
                    break;
                case 2:
                    lineDisp.textContent += "[2]";
                    break;
            }
        }
        gridDisplay.appendChild(lineDisp);
    }
}

function resetGame() {
    window.location.reload();
}

function buildGame() {
    buildGrid();
    spawnSnake(5, 6);
    spawnFruit();
}

function checkNextPos(x, y) {

    if (grid[x][y] == 2) {
        return 2;
    }

    if (grid[x][y] == 0) {
        return 1;
    }

    if(y + 1 == columns || y - 1 < 0) {
        alert("Perdeu");
        lost = true;
        setTimeout(clearInterval(loop), 1000);
        resetGame();
        return 0;
    }

    alert("Perdeu");
    lost = true;
    setTimeout(clearInterval(loop), 1000);
    resetGame();
    return 0;
}

function move() {
    switch (direction) {
        case 0:
            var move = checkNextPos(snake[0][0] - 1, snake[0][1]);

            snake.unshift([snake[0][0] - 1, snake[0][1]]);
            if (move == 1) snake.pop();
            if (move == 2) consumeFruit();
            break;
        case 1:
            var move = checkNextPos(snake[0][0] + 1, snake[0][1]);

            snake.unshift([snake[0][0] + 1, snake[0][1]]);
            if (move == 1) snake.pop();
            if (move == 2) consumeFruit();
            break;
        case 2:
            var move = checkNextPos(snake[0][0], snake[0][1] - 1);

            snake.unshift([snake[0][0], snake[0][1] - 1]);
            if (move == 1) snake.pop();
            if (move == 2) consumeFruit();
            break;
        case 3:
            var move = checkNextPos(snake[0][0], snake[0][1] + 1);

            snake.unshift([snake[0][0], snake[0][1] + 1]);
            if (move == 1) snake.pop();
            if (move == 2) consumeFruit();
            break;
    }
    if (!lost) updtSnakeGrid();
    renderGrid();
}

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            direction = 0;
            break;
        case "ArrowDown":
            direction = 1;
            break;
        case "ArrowLeft":
            direction = 2;
            break;
        case "ArrowRight":
            direction = 3;
            break
    }
});

buildGame();

renderGrid();

const loop = setInterval(move, 200);
