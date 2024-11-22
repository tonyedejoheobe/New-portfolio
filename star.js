//star effect

const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to fill the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const shootingStars = [];

// Function to generate a random color
function getRandomColor() {
    const colors = ['#FFFFFF', '#FFDD00', '#FF5733', '#33FF57', '#3357FF', '#FF33A1'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function drawStar(x, y, radius, color, glowing = false, opacity = 1) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity; // Set opacity for the star
    ctx.shadowColor = glowing ? color : 'transparent'; // Glow color
    ctx.shadowBlur = glowing ? 20 : 0; // Blur radius for glowing effect
    ctx.fill();
    ctx.closePath();
    ctx.globalAlpha = 1; // Reset opacity for other elements
}

function createStars(numStars) {
    for (let i = 0; i < numStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 2 + 1; // Random radius between 1 and 3
        const color = Math.random() < 0.3 ? getRandomColor() : '#FFFFFF'; // 30% chance for a brighter color
        stars.push({ x, y, radius, color, opacity: Math.random() }); // Initialize with random opacity
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    stars.forEach(star => {
        // Always apply glowing effect
        drawStar(star.x, star.y, star.radius, star.color, true, star.opacity);
    });
    shootingStars.forEach(shootingStar => {
        drawStar(shootingStar.x, shootingStar.y, shootingStar.radius, shootingStar.color, true, shootingStar.opacity);
    });
}

function changeStarOpacity() {
    stars.forEach(star => {
        // Randomly decide to set opacity to either 0 or a random value between 0.3 and 1
        if (Math.random() < 0.05) { // Reduced chance to change opacity
            star.opacity = Math.random() < 0.5 ? 0 : Math.random() * 0.7 + 0.3; // 50% chance to be invisible, otherwise between 0.3 and 1
        }
    });
    draw();
}

function createShootingStar() {
    const radius = 3; // Fixed radius for shooting star
    const color = getRandomColor(); // Random color for the shooting star
    const speed = Math.random() * 5 + 3; // Speed of the shooting star

    // Randomly choose a direction to enter from
    const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
    let x, y, directionX, directionY;

    switch (edge) {
        case 0: // Top
            x = Math.random() * canvas.width; // Random x position at the top
            y = 0; // Start at the top
            directionX = (Math.random() - 0.5) * 2; // Random horizontal direction
            directionY = speed; // Move downwards
            break;
        case 1: // Right
            x = canvas.width; // Start at the right
            y = Math.random() * canvas.height; // Random y position
            directionX = -speed; // Move left
            directionY = (Math.random() - 0.5) * 2; // Random vertical direction
            break;
        case 2: // Bottom
            x = Math.random() * canvas.width; // Random x position at the bottom
            y = canvas.height; // Start at the bottom
            directionX = (Math.random() - 0.5) * 2; // Random horizontal direction
            directionY = -speed; // Move upwards
            break;
        case 3: // Left
            x = 0; // Start at the left
            y = Math.random() * canvas.height; // Random y position
            directionX = speed; // Move right
            directionY = (Math.random() - 0.5) * 2; // Random vertical direction
            break;
    }

    shootingStars.push({ x, y, radius, color, speed, directionX, directionY });
}

function updateShootingStars() {
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        const shootingStar = shootingStars[i];
        shootingStar.x += shootingStar.directionX; // Move in x direction
        shootingStar.y += shootingStar.directionY; // Move in y direction

        // Remove the shooting star if it goes off the screen
        if (shootingStar.x < 0 || shootingStar.x > canvas.width || shootingStar.y < 0 || shootingStar.y > canvas.height) {
            shootingStars.splice(i, 1);
        }
    }
}

function animate() {
    updateShootingStars();
    draw();
    requestAnimationFrame(animate); // Call animate again for the next frame
}

// Gradually change the opacity of stars every 300ms (slower effect)
setInterval(() => {
    changeStarOpacity();
}, 300);

// Create stars and start the animation
createStars(50); // Create 50 stars
animate(); // Start the animation

// Create a shooting star every 40 seconds
setInterval(() => {
    createShootingStar();
}, 40000);

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw(); // Redraw stars on resize
});

// Draw the stars for the first time
draw();
