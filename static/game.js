const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let gravity = 0.3;
let upwardForce = -8;

// Player
let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 15,
    dy: 0,
    color: "cyan"
};

// Celestial bodies
let bodies = [];
const colors = ["yellow", "white", "orange", "lightblue", "pink"];
for (let i = 0; i < 10; i++) {
    bodies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 10 + Math.random() * 20,
        color: colors[Math.floor(Math.random() * colors.length)]
    });
}

document.addEventListener("click", function (e) {
    let angle = Math.atan2(e.clientY - player.y, e.clientX - player.x);
    player.dy = Math.sin(angle) * -10;
    player.dx = Math.cos(angle) * 5;
});

function drawPlayer() {
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
}

function drawBodies() {
    bodies.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
    });
}

function detectCollision() {
    bodies.forEach(b => {
        let dx = player.x - b.x;
        let dy = player.y - b.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < player.radius + b.radius) {
            score++;
            document.getElementById("score").innerText = "Score: " + score;
            player.dy = upwardForce;
        }
    });
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply gravity
    player.dy += gravity;
    player.y += player.dy;
    if (player.dx) player.x += player.dx;

    // Floor collision
    if (player.y + player.radius > canvas.height) {
        player.y = canvas.height - player.radius;
        player.dy = 0;
    }

    drawBodies();
    drawPlayer();
    detectCollision();

    requestAnimationFrame(update);
}

update();
