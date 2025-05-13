const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const successSound = document.getElementById("success-sfx");

let snake = [{ x: 160, y: 160 }];
let direction = "RIGHT";
let food = { x: 0, y: 0 };
let score = 0;

const box = 20;
let screenSize = Math.min(window.innerWidth, window.innerHeight) * 0.9;
let canvasSize = Math.floor(screenSize / 20) * 20; // keep divisible by 20
canvas.width = canvasSize;
canvas.height = canvasSize;

const targetScore = 50;

function draw() {
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "purple" : "#999";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "#f5a";
  ctx.fillRect(food.x, food.y, box, box);

  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "UP") headY -= box;
  if (direction === "DOWN") headY += box;

  if (
    headX < 0 || headY < 0 ||
    headX >= canvasSize || headY >= canvasSize ||
    snake.some((s, i) => i !== 0 && s.x === headX && s.y === headY)
  ) {
    clearInterval(game);
    alert("Game Over 😢");
    location.reload();
  }

  let newHead = { x: headX, y: headY };

  if (headX === food.x && headY === food.y) {
    score += 10;
    spawnFood();
    if (score >= targetScore) {
      clearInterval(game);
      successSound.play();
      lightUpScreen();
      setTimeout(() => {
        window.location.href = "memory.html"; // Next phase
      }, 3000);
    }
  } else {
    snake.pop();
  }

  snake.unshift(newHead);
}

function spawnFood() {
  food.x = Math.floor(Math.random() * (canvasSize / box)) * box;
  food.y = Math.floor(Math.random() * (canvasSize / box)) * box;
}

function changeDirection(e) {
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function setDirection(newDir) {
  if (newDir === "LEFT" && direction !== "RIGHT") direction = "LEFT";
  if (newDir === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
  if (newDir === "UP" && direction !== "DOWN") direction = "UP";
  if (newDir === "DOWN" && direction !== "UP") direction = "DOWN";
}


function lightUpScreen() {
  document.body.style.transition = "background 2s";
  document.body.style.background = "radial-gradient(circle, #7751a1, #000)";
}

startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  canvas.style.display = "block";
  document.addEventListener("keydown", changeDirection);
  spawnFood();
  game = setInterval(draw, 150);
});
