const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

// ===== Player =====
const player = {
  x: 0,
  y: 60,
  width: 30,
  height: 30,
  color: "lime",
  dx: 0,
  dy: 0,
  speed: 4,
  gravity: 0.6,
  jumpPower: -12,
  onGround: false,
  lives: 3
};

// ===== Stage Objects (DRAFT dari gambar) =====

// Ground & Platform
const platforms = [
  { x: 0, y: 350, width: 800, height: 50 },    // ground awal

  // // platform melayang g1
  { x: 180, y: 280, width: 200, height: 15 },
  { x: 340, y: 200, width: 150, height: 15 },
  { x: 150, y: 140, width: 130, height: 15 },


  { x: 950, y: 280, width: 1300, height: 185 },  // ground tengah

  // // platform melayang g2
  { x: 1250, y: 200, width: 100, height: 15 },
  { x: 1450, y: 130, width: 100, height: 15 },
  { x: 1290, y: 60, width: 100, height: 15 },
  { x: 1480, y: -40, width: 100, height: 15 },
  { x: 1380, y: -140, width: 100, height: 15 },

  // tangga blok
  { x: 2200, y: -20, width: 50, height: 300 },
  { x: 2150, y: 30, width: 50, height: 250 },
  { x: 2100, y: 80, width: 50, height: 200 },
  { x: 2050, y: 130, width: 50, height: 150 },
  { x: 2000, y: 180, width: 50, height: 100 },
  { x: 1950, y: 230, width: 50, height: 50 },

  //platfrom melayang
  { x: 2450, y: 130, width: 100, height: 15 },
  { x: 2650, y: 50, width: 100, height: 15 },
  { x: 2850, y: -30, width: 100, height: 15 },

  { x: 3150, y: 210, width: 300, height: 15 },
  { x: 3550, y: 130, width: 100, height: 15 },
  { x: 3750, y: 50, width: 100, height: 15 },

  //kumpulan ground
  { x: 4000, y: 10, width: 60, height:  400},
  { x: 4210, y: 160, width: 60, height:  400},
  { x: 4420, y: 80, width: 60, height:  400},
  { x: 4630, y: 10, width: 60, height:  400},

  { x: 4840, y: 160, width: 1300, height: 400 },  // ground akhir
 
  //platform melayang g3
  { x: 5040, y: 50, width: 100, height: 15 },
  { x: 5240, y: -30, width: 100, height: 15 },
];

// Coins
const coins = [
  //ground #1
  { x: 165, y: 120, collected: false },
  { x: 185, y: 120, collected: false },
  { x: 215, y: 55, collected: false },
  { x: 235, y: 55, collected: false },
  { x: 225, y: 35, collected: false },

  //ground #2
  { x: 1420, y: -240, collected: false },
  { x: 1440, y: -240, collected: false },

  //platform melayang
  { x: 2350, y: -120, collected: false },
  { x: 2800, y: -50, collected: false },
  { x: 3300, y: 80, collected: false },

  //kumpulan ground
  { x: 4230, y: 130, collected: false },

];

// Spikes (segitiga)
const spikes = [
  { x: 1170, y: 260, width: 40, height: 20 },
  { x: 1210, y: 260, width: 40, height: 20 },
  { x: 1250, y: 260, width: 40, height: 20 },
  { x: 1290, y: 260, width: 40, height: 20 },
  { x: 1330, y: 260, width: 40, height: 20 },
  { x: 1370, y: 260, width: 40, height: 20 },
  { x: 1410, y: 260, width: 40, height: 20 },
  { x: 1450, y: 260, width: 40, height: 20 },
  { x: 1490, y: 260, width: 40, height: 20 },
  { x: 1530, y: 260, width: 40, height: 20 },
  { x: 1570, y: 260, width: 40, height: 20 },
  { x: 1610, y: 260, width: 40, height: 20 },
  { x: 1650, y: 260, width: 40, height: 20 },
  { x: 1690, y: 260, width: 40, height: 20 },
  { x: 1730, y: 260, width: 40, height: 20 }
];

// Enemies dengan patrol
const enemies = [
  { x: 200, y: 248, width: 30, height: 30, dir: -1, speed: 2, minX: 180, maxX: 380 },
  { x: 1900, y: 248, width: 30, height: 30, dir: -1, speed: 2, minX: 1800, maxX: 1940 },
  { x: 3180, y: 180, width: 30, height: 30, dir: 1, speed: 2, minX: 3150, maxX: 3460 }
];

// Portal (aktif setelah semua coin terkumpul)
const portal = { x: 5280, y: -60, width: 40, height: 40, active: false };

// ===== Controls =====
const keys = {};
document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

// ===== Update Loop =====
let loopId;
function update() {
  // Movement
  player.dx = 0;
  if (keys["ArrowLeft"]) player.dx = -player.speed;
  if (keys["ArrowRight"]) player.dx = player.speed;
  if (keys["Space"] && player.onGround) {
    player.dy = player.jumpPower;
    player.onGround = false;
  }

  // Gravity
  player.dy += player.gravity;
  player.x += player.dx;
  player.y += player.dy;

  // Platform collision
  player.onGround = false;
  for (let p of platforms) {
    if (player.x < p.x + p.width &&
        player.x + player.width > p.x &&
        player.y + player.height > p.y &&
        player.y + player.height < p.y + p.height &&
        player.dy >= 0) {
      player.y = p.y - player.height;
      player.dy = 0;
      player.onGround = true;
    }
  }

  // Enemy patrol
  for (let e of enemies) {
    e.x += e.speed * e.dir;
    if (e.x <= e.minX || e.x + e.width >= e.maxX) {
      e.dir *= -1;
    }
  }

  // Coin collection
  for (let c of coins) {
    if (!c.collected &&
        player.x < c.x + 10 &&
        player.x + player.width > c.x &&
        player.y < c.y + 10 &&
        player.y + player.height > c.y) {
      c.collected = true;
    }
  }

  // Portal muncul kalau semua coin terkumpul
  portal.active = coins.every(c => c.collected);

  // Collision spikes
  for (let s of spikes) {
    if (player.x < s.x + s.width &&
        player.x + player.width > s.x &&
        player.y + player.height > s.y) {
      return gameOver();
    }
  }

  // Collision enemies
  for (let e of enemies) {
    if (player.x < e.x + e.width &&
        player.x + player.width > e.x &&
        player.y < e.y + e.height &&
        player.y + player.height > e.y) {
      return gameOver();
    }
  }

  // Collision portal
  if (portal.active &&
      player.x < portal.x + portal.width &&
      player.x + player.width > portal.x &&
      player.y < portal.y + portal.height &&
      player.y + player.height > portal.y) {
    return winGame();
  }

  // Jatuh keluar layar
  if (player.y > canvas.height + 200) {
    return gameOver();
  }

  draw();
  loopId = requestAnimationFrame(update);
}

// ===== Draw =====
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Camera
  ctx.save();
  let cameraX = -player.x + canvas.width / 2;
  let cameraY = 0;
  if (player.y < canvas.height / 2) {
    cameraY = -player.y + canvas.height / 2;
  }
  ctx.translate(cameraX, cameraY);

  // Platforms
  ctx.fillStyle = "orange";
  for (let p of platforms) ctx.fillRect(p.x, p.y, p.width, p.height);

  // Coins
  ctx.fillStyle = "yellow";
  for (let c of coins) {
    if (!c.collected) {
      ctx.beginPath();
      ctx.arc(c.x, c.y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Spikes segitiga
  ctx.fillStyle = "gray";
  for (let s of spikes) {
    ctx.beginPath();
    ctx.moveTo(s.x, s.y + s.height);
    ctx.lineTo(s.x + s.width / 2, s.y);
    ctx.lineTo(s.x + s.width, s.y + s.height);
    ctx.closePath();
    ctx.fill();
  }

  // Enemies
  ctx.fillStyle = "red";
  for (let e of enemies) ctx.fillRect(e.x, e.y, e.width, e.height);

  // Portal
  if (portal.active) {
    ctx.fillStyle = "purple";
    ctx.beginPath();
    ctx.arc(portal.x, portal.y, 20, 0, Math.PI * 2);
    ctx.fill();
  }

  // Player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  ctx.restore();

  // HUD
  ctx.fillStyle = "black";
  ctx.fillText(
    "Coins: " + coins.filter(c => c.collected).length + "/" + coins.length,
    20,
    20
  );
}

// ===== Game State =====
function gameOver() {
  document.getElementById("losePopup").style.display = "block";
  cancelAnimationFrame(loopId);
}

function winGame() {
  document.getElementById("winPopup").style.display = "block";
  cancelAnimationFrame(loopId);
}

function restartGame() {
  window.location.reload();
}

function goHome() {
  window.location.href = "index.html"; // ubah sesuai kebutuhan
}

update();
