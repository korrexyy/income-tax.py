const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const startBtn = document.getElementById('startBtn');
const fireBtn = document.getElementById('fireBtn');
const message = document.getElementById('message');

const keys = {
  left: false,
  right: false,
};

const pointer = {
  active: false,
  x: canvas.width / 2,
};

const player = {
  x: canvas.width / 2 - 20,
  y: canvas.height - 60,
  width: 40,
  height: 40,
  speed: 8,
};

let bullets = [];
let enemies = [];
let score = 0;
let lives = 3;
let gameRunning = false;
let lastTime = 0;
let spawnTimer = 0;
let shootCooldown = 0;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function resetGame() {
  score = 0;
  lives = 3;
  bullets = [];
  enemies = [];
  player.x = canvas.width / 2 - player.width / 2;
  player.y = canvas.height - 60;
  pointer.x = player.x + player.width / 2;
  scoreDisplay.textContent = score;
  livesDisplay.textContent = lives;
  message.textContent = 'Destroy the enemy ships!';
}

function createEnemy() {
  const size = 28 + Math.random() * 18;
  const x = Math.random() * (canvas.width - size);

  enemies.push({
    x,
    y: -size,
    width: size,
    height: size,
    speed: 1.5 + Math.random() * 2,
  });
}

function shoot() {
  if (!gameRunning || shootCooldown > 0) return;

  bullets.push({
    x: player.x + player.width / 2 - 3,
    y: player.y - 12,
    width: 6,
    height: 18,
    speed: 8,
  });

  shootCooldown = 220;
}

function updatePlayer() {
  if (keys.left) player.x -= player.speed;
  if (keys.right) player.x += player.speed;

  if (pointer.active) {
    const targetX = clamp(pointer.x - player.width / 2, 0, canvas.width - player.width);
    const difference = targetX - player.x;
    player.x += difference * 0.22;
  }

  player.x = clamp(player.x, 0, canvas.width - player.width);
}

function updateBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].y -= bullets[i].speed;

    if (bullets[i].y + bullets[i].height < 0) {
      bullets.splice(i, 1);
    }
  }
}

function updateEnemies() {
  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].y += enemies[i].speed;

    if (enemies[i].y > canvas.height) {
      enemies.splice(i, 1);
      lives -= 1;
      livesDisplay.textContent = lives;

      if (lives <= 0) {
        endGame();
      }
    }
  }
}

function checkCollisions() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = enemies.length - 1; j >= 0; j--) {
      const bullet = bullets[i];
      const enemy = enemies[j];

      const hit =
        bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y;

      if (hit) {
        bullets.splice(i, 1);
        enemies.splice(j, 1);
        score += 10;
        scoreDisplay.textContent = score;
        break;
      }
    }
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];
    const hitPlayer =
      enemy.x < player.x + player.width &&
      enemy.x + enemy.width > player.x &&
      enemy.y < player.y + player.height &&
      enemy.y + enemy.height > player.y;

    if (hitPlayer) {
      enemies.splice(i, 1);
      lives -= 1;
      livesDisplay.textContent = lives;

      if (lives <= 0) {
        endGame();
      }
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.moveTo(player.x + player.width / 2, player.y);
  ctx.lineTo(player.x + player.width, player.y + player.height);
  ctx.lineTo(player.x, player.y + player.height);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(player.x + player.width / 2 - 3, player.y + 8, 6, 14);
}

function drawBullets() {
  ctx.fillStyle = '#facc15';
  bullets.forEach((bullet) => {
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  });
}

function drawEnemies() {
  ctx.fillStyle = '#f87171';
  enemies.forEach((enemy) => {
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    ctx.fillStyle = '#fee2e2';
    ctx.fillRect(enemy.x + 6, enemy.y + 8, enemy.width - 12, 6);
    ctx.fillStyle = '#f87171';
  });
}

function drawStars() {
  ctx.fillStyle = '#e2e8f0';
  for (let i = 0; i < 50; i++) {
    const x = (i * 71) % canvas.width;
    const y = (i * 53) % canvas.height;
    ctx.fillRect(x, y, 2, 2);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  drawPlayer();
  drawBullets();
  drawEnemies();
}

function update(delta) {
  if (!gameRunning) return;

  updatePlayer();
  updateBullets();

  spawnTimer += delta;
  if (spawnTimer > 900) {
    createEnemy();
    spawnTimer = 0;
  }

  if (shootCooldown > 0) {
    shootCooldown -= delta;
  }

  updateEnemies();
  checkCollisions();
}

function gameLoop(timestamp) {
  const delta = timestamp - lastTime;
  lastTime = timestamp;

  update(delta);
  draw();
  requestAnimationFrame(gameLoop);
}

function startGame() {
  resetGame();
  gameRunning = true;
  startBtn.textContent = 'Restart Game';
  message.textContent = 'Fight off the alien ships!';
}

function endGame() {
  gameRunning = false;
  message.textContent = `Game over! Final score: ${score}`;
  startBtn.textContent = 'Play Again';
}

function updatePointerPosition(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (event.clientX - rect.left) * scaleX;
  pointer.x = clamp(x, 0, canvas.width);
  pointer.active = true;
}

window.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();

  if (key === 'arrowleft' || key === 'a') keys.left = true;
  if (key === 'arrowright' || key === 'd') keys.right = true;

  if (event.code === 'Space') {
    event.preventDefault();
    shoot();
  }
});

window.addEventListener('keyup', (event) => {
  const key = event.key.toLowerCase();

  if (key === 'arrowleft' || key === 'a') keys.left = false;
  if (key === 'arrowright' || key === 'd') keys.right = false;
});

canvas.addEventListener('pointerdown', (event) => {
  updatePointerPosition(event);
  shoot();
});

canvas.addEventListener('pointermove', (event) => {
  if (event.pointerType === 'mouse' && event.buttons === 0) {
    pointer.active = false;
    return;
  }

  updatePointerPosition(event);
});

canvas.addEventListener('pointerup', () => {
  pointer.active = false;
});

canvas.addEventListener('pointerleave', () => {
  pointer.active = false;
});

fireBtn.addEventListener('click', shoot);
startBtn.addEventListener('click', startGame);

resetGame();
draw();
requestAnimationFrame(gameLoop);
