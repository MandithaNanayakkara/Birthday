document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const scoreValue = document.getElementById('scoreValue');
    const titleDisplay = document.getElementById('titleDisplay');
    const masterModal = document.getElementById('masterModal');
    const keepPlayingBtn = document.getElementById('keepPlayingBtn');

    let score = 0;
    let hasShownMasterModal = false;

    const bearImages = [
        'assets/bear_1.png',
        'assets/bear_2.png',
        'assets/bear_3.png',
        'assets/bear_4.png',
        'assets/waving_bear.png'
    ];

    function updateTitle() {
        if (score < 5) {
            titleDisplay.innerText = 'Bear Beginner';
        } else if (score < 10) {
            titleDisplay.innerText = 'Bear Trainer';
        } else {
            titleDisplay.innerText = 'Bear Master 🧸';
            if (!hasShownMasterModal) {
                showMasterModal();
            }
        }
    }

    function showMasterModal() {
        hasShownMasterModal = true;
        masterModal.classList.add('active');
        triggerEpicConfetti();
    }

    keepPlayingBtn.addEventListener('click', () => {
        masterModal.classList.remove('active');
    });

    function triggerEpicConfetti() {
        if (typeof confetti === 'function') {
            const duration = 5000;
            const end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 7,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#ffe0e9', '#d17a8e', '#ffffff', '#c89666', '#e1b382']
                });
                confetti({
                    particleCount: 7,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#ffe0e9', '#d17a8e', '#ffffff', '#c89666', '#e1b382']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    }

    function spawnBear() {
        const bear = document.createElement('img');
        const randomBearContent = bearImages[Math.floor(Math.random() * bearImages.length)];
        bear.src = randomBearContent;
        bear.className = 'falling-bear';

        const size = Math.random() * 40 + 60; // 60px to 100px
        bear.style.width = `${size}px`;

        // Prevent creating bears outside horizontally
        const startPosX = Math.random() * (window.innerWidth - size);
        bear.style.left = `${startPosX}px`;
        bear.style.top = `-120px`;

        // Prevent dragging the image instead of clicking it
        bear.ondragstart = () => false;

        gameContainer.appendChild(bear);

        const fallDuration = Math.random() * 3000 + 4000; // 4 to 7 seconds

        const animation = bear.animate([
            { transform: 'translateY(0) rotate(0deg)' },
            { transform: `translateY(${window.innerHeight + 150}px) rotate(${Math.random() * 360 - 180}deg)` }
        ], {
            duration: fallDuration,
            easing: 'linear'
        });

        // Handle both mousedown and touchstart for mobile/desktop support
        const catchBear = (e) => {
            e.preventDefault(); // Stop double firing from touch vs mouse
            animation.pause();

            let clientX = e.clientX;
            let clientY = e.clientY;

            // Handle touch coordinates
            if (e.touches && e.touches.length > 0) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            }

            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 20,
                    spread: 40,
                    origin: {
                        x: clientX / window.innerWidth,
                        y: clientY / window.innerHeight
                    },
                    colors: ['#d17a8e', '#c89666', '#ffffff']
                });
            }

            const floatText = document.createElement('div');
            floatText.className = 'floating-text';
            floatText.innerText = '+1';
            floatText.style.left = `${clientX - 10}px`;
            floatText.style.top = `${clientY - 20}px`;
            gameContainer.appendChild(floatText);

            setTimeout(() => floatText.remove(), 1000);

            score++;
            scoreValue.innerText = score;
            updateTitle();

            bear.remove();
        };

        bear.addEventListener('mousedown', catchBear);
        bear.addEventListener('touchstart', catchBear);

        animation.onfinish = () => {
            if (gameContainer.contains(bear)) {
                bear.remove();
            }
        };

        // Increase difficulty slightly after 10 points
        const speedMultiplier = score >= 10 ? 0.7 : 1;
        const nextSpawn = (Math.random() * 800 + 600) * speedMultiplier;
        setTimeout(spawnBear, nextSpawn);
    }

    // Start game loop safely
    setTimeout(spawnBear, 1000);
});
