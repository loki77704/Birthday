const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let screenWidth = Math.min(window.innerWidth, 800);
let screenHeight = Math.min(window.innerHeight * 0.6, 400);

canvas.width = screenWidth;
canvas.height = screenHeight;

const jumpSfx = document.getElementById('jump-sfx');
const heartSfx = document.getElementById('heart-sfx');
const winSfx = document.getElementById('win-sfx');

// Game settings
let gravity = 0.5;
// let keys = {};  // Replaced with controls object
let heartsCollected = 0;
let cameraOffset = 0; // For scrolling

// Player
const player = {
    x: 50,
    y: 300,
    w: 30,
    h: 30,
    color: 'purple',
    vx: 0,
    vy: 0,
    onGround: false
};

// Platforms
const platforms = [
    { x: 0, y: 350, w: 800, h: 50 },
    { x: 200, y: 280, w: 100, h: 20 },
    { x: 350, y: 220, w: 100, h: 20 },
    { x: 500, y: 180, w: 100, h: 20 }
];

// Hearts
let hearts = [
    { x: 220, y: 250 },
    { x: 370, y: 190 },
    { x: 520, y: 150 },
    { x: 600, y: 300 },
    { x: 700, y: 320 }
];

// New Controls Object
let controls = {
    left: false,
    right: false,
    jump: false
};

function drawRect(obj, color) {
    ctx.fillStyle = color;
    ctx.fillRect(obj.x - cameraOffset, obj.y, obj.w, obj.h); // Apply camera offset
}

function drawHeart(x, y) {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x + 5 - cameraOffset, y + 5, 5, 0, Math.PI * 2); // Apply camera offset
    ctx.arc(x + 15 - cameraOffset, y + 5, 5, 0, Math.PI * 2); // Apply camera offset
    ctx.lineTo(x + 10 - cameraOffset, y + 20); // No offset needed here
    ctx.closePath();
    ctx.fill();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gravity
    player.vy += gravity;
    player.y += player.vy;

    // Controls - Using controls object
    if (controls.left) player.vx = -3;
    else if (controls.right) player.vx = 3;
    else player.vx = 0;

    player.x += player.vx;


    // Ground/platform collision
    player.onGround = false;
    for (let p of platforms) {
        if (
            player.x < p.x + p.w &&
            player.x + player.w > p.x &&
            player.y < p.y + p.h &&
            player.y + player.h > p.y
        ) {
            if (player.vy >= 0) { // Only adjust if falling or on platform
                player.y = p.y - player.h;
                player.vy = 0;
                player.onGround = true;
            }
        }
        drawRect(p, '#444'); // Draw platform with offset
    }

    // Jump - Using controls object
    if (controls.jump && player.onGround) {
        player.vy = -10;
        jumpSfx.play();
        controls.jump = false; // Reset jump flag
    }

    // Draw player
    drawRect(player, player.color); // Draw player with offset

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
            drawHeart(h.x, h.y); // Draw heart with offset
        }
        return !collected;
    });

    // Win check
    if (heartsCollected >= 5) {
        winSfx.play();
        setTimeout(() => {
            window.location.href = 'final.html'; // Final phase
        }, 2000);
    }

    // Camera follow (simple horizontal)
    let targetCameraOffset = player.x - canvas.width / 2;
    cameraOffset = targetCameraOffset;
    cameraOffset = Math.max(0, Math.min(cameraOffset, 800 - canvas.width)); // Keep within level bounds


    requestAnimationFrame(gameLoop);
}

// Controls - Event Listeners
document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') controls.left = true;
    if (e.code === 'ArrowRight') controls.right = true;
    if (e.code === 'Space') controls.jump = true;
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowLeft') controls.left = false;
    if (e.code === 'ArrowRight') controls.right = false;
    if (e.code === 'Space') controls.jump = false;
});

// Mobile Controls (Touch Events)
function moveLeft() {
    controls.left = true;
    setTimeout(() => controls.left = false, 200); // Short tap
}

function moveRight() {
    controls.right = true;
    setTimeout(() => controls.right = false, 200);
}

function jump() {
    controls.jump = true;
    setTimeout(() => controls.jump = false, 200);
}


gameLoop();
