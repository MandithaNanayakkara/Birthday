const messages = [
    "Rachi is amazing 💖",
    "Best girlfriend ever 🥰",
    "Certified cute bear 🧸",
    "My entire heart ❤️",
    "I love you so much 🥺",
    "You are so beautiful ✨",
    "My favorite person 🌎"
];

const container = document.getElementById('gameContainer');

function createBalloon() {
    const balloon = document.createElement('img');
    // Using the same cute balloon image we already generated
    balloon.src = 'assets/bear_balloons.png';
    balloon.className = 'floating-balloon-game';

    // Random horizontal position
    const startX = Math.random() * (window.innerWidth - 150);
    balloon.style.left = `${startX}px`;

    // Random hue to make balloons different colors!
    const randomHue = Math.floor(Math.random() * 360);
    balloon.style.filter = `hue-rotate(${randomHue}deg)`;

    // Add to container
    container.appendChild(balloon);

    // Animation float up
    let y = window.innerHeight;
    const speed = Math.random() * 2 + 1; // Random speed between 1 and 3
    let driftX = Math.random() * 2 - 1; // Slight left/right drift
    let currentX = startX;

    function move() {
        y -= speed;
        currentX += driftX;

        balloon.style.transform = `translateY(${y - window.innerHeight}px)`;
        balloon.style.left = `${currentX}px`;

        if (y < -200) {
            // Remove balloon if it floats off screen
            balloon.remove();
        } else {
            requestAnimationFrame(move);
        }
    }

    requestAnimationFrame(move);

    // Click to pop
    balloon.addEventListener('click', (e) => {
        const popX = e.clientX;
        const popY = e.clientY;

        // 1. Confetti pop at mouse location!
        confetti({
            particleCount: 50,
            spread: 80,
            origin: {
                x: popX / window.innerWidth,
                y: popY / window.innerHeight
            },
            colors: ['#ffe0e9', '#d17a8e', '#ffffff'] // Soft colors
        });

        // 2. Play sound? (Skipping to keep it simple, but we can do visual feedback!)

        // 3. Show random message
        const msg = document.createElement('div');
        msg.className = 'popped-message';
        msg.innerText = messages[Math.floor(Math.random() * messages.length)];
        msg.style.left = `${popX}px`;
        msg.style.top = `${popY}px`;
        // Center text over click
        msg.style.transform = 'translate(-50%, -50%)';

        container.appendChild(msg);

        // Remove message after animation
        setTimeout(() => msg.remove(), 2000);

        // Remove balloon visually
        balloon.remove();
    });
}

// Spawn balloons infinitely
setInterval(createBalloon, 800);
