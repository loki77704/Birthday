const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let screenWidth = Math.min(window.innerWidth, 800);
let screenHeight = Math.min(window.innerHeight * 0.6, 400);

canvas.width = screenWidth;
canvas.height = screenHeight;


const jumpSfx = document.getElementById("jump-sfx");
const heartSfx = document.getElementById("heart-sfx");
const winSfx = document.getElementById("win-sfx");

// Game settings
let gravity = 0.5;
let keys = {};
let heartsCollected = 0;

// Player
const player = {
  x: 50,
  y: 300,
  w: 30,
  h: 30,
  color: "purple",
  vx: 0,
  vy: 0,
  onGround: false
};

// Platforms
const platforms = [
  { x: 0, y: 350, w: 800, h: 50 },
  { x: 200, y: 280, w: 100, h: 20 },
  { x: 350, y: 220, w: 100, h: 20 },
  { x: 500, y: 180, w: 100, h: 20 },
];

// Hearts
let hearts = [
  { x: 220, y: 250 },
  { x: 370, y: 190 },
  { x: 520, y: 150 },
  { x: 600, y: 300 },
  { x: 700, y: 320 }
];

function drawRect(obj, color) {
  ctx.fillStyle = color;
  ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
}

function drawHeart(x, y) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(x + 5, y + 5, 5, 0, Math.PI * 2);
  ctx.arc(x + 15, y + 5, 5, 0, Math.PI * 2);
  ctx.lineTo(x + 10, y + 20);
  ctx.closePath();
  ctx.fill();
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Gravity
  player.vy += gravity;
  player.y += player.vy;
  player.x += player.vx;

  // Controls
  if (keys["ArrowLeft"]) player.vx = -3;
  else if (keys["ArrowRight"]) player.vx = 3;
  else player.vx = 0;

  // Ground/platform collision
  player.onGround = false;
  for (let p of platforms) {
    if (
      player.x < p.x + p.w &&
      player.x + player.w > p.x &&
      player.y + player.h < p.y + 10 &&
      player.y + player.h + player.vy >= p.y
    ) {
      player.y = p.y - player.h;
      player.vy = 0;
      player.onGround = true;
    }
    drawRect(p, "#444");
  }

  // Jump
  if (keys["Space"] && player.onGround) {
    player.vy = -10;
    jumpSfx.play();
  }

  // Draw player
  drawRect(player, player.color);

  // Draw and collect hearts
  hearts = hearts.filter(h => {
    let collected = (
      player.x < h.x + 20 &&
      player.x + player.w > h.x &&
      player.y < h.y + 20 &&
      player.y + player.h > h.y
    );
    if (collected) {
      heartSfx.play();
      heartsCollected++;
    } else {
      drawHeart(h.x, h.y);
    }
    return !collected;
  });

  // Win check
  if (heartsCollected >= 5) {
    winSfx.play();
    setTimeout(() => {
      window.location.href = "final.html"; // Final phase
    }, 2000);
  }

  requestAnimationFrame(gameLoop);
}

// Controls
document.addEventListener("keydown", (e) => keys[e.code] = true);
document.addEventListener("keyup", (e) => keys[e.code] = false);

function moveLeft() {
  keys["ArrowLeft"] = true;
  setTimeout(() => keys["ArrowLeft"] = false, 200);
}

function moveRight() {
  keys["ArrowRight"] = true;
  setTimeout(() => keys["ArrowRight"] = false, 200);
}

function jump() {
  if (player.onGround) {
    player.vy = -10;
    jumpSfx.play();
  }
}


gameLoop();
