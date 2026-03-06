document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.getElementById('wheel');
    const spinBtn = document.getElementById('spinBtn');
    const modal = document.getElementById('surpriseModal');
    const title = document.getElementById('surpriseTitle');
    const text = document.getElementById('surpriseText');
    const closeBtn = document.getElementById('closeSurpriseModal');
    const animatedBear = document.getElementById('animatedBear');

    let currentRotation = 0;
    let isSpinning = false;

    // Define the segments. Conic gradient starts at 0 (top) and goes clockwise.
    // 0-60: Bear Hug
    // 60-120: Confetti
    // 120-180: Joke
    // 180-240: Birthday Wish
    // 240-300: Secret Message
    // 300-360: Cute Animation
    const segments = [
        {
            id: 'bear-hug',
            min: 0,
            max: 60,
            title: 'Bear Hug! 🤗',
            text: 'You won a huge, warm Bear Hug from the forest bears!\nSending you so much love today.',
            type: 'standard'
        },
        {
            id: 'confetti',
            min: 60,
            max: 120,
            title: 'Confetti Shower! 🎊',
            text: 'You get an epic confetti shower! Yayyy! 🎉',
            type: 'confetti'
        },
        {
            id: 'joke',
            min: 120,
            max: 180,
            title: 'A Funny Joke! 😂',
            text: 'Why do bears have fur coats?\n\nBecause they would look silly in plastic jackets! 🐻👘',
            type: 'standard'
        },
        {
            id: 'wish',
            min: 180,
            max: 240,
            title: 'Birthday Wish! 🎂',
            text: 'Wishing you the most magical, amazing birthday Rachi.\nEverything you wish for will come true! ✨',
            type: 'standard'
        },
        {
            id: 'secret',
            min: 240,
            max: 300,
            title: 'Secret Message! 💌',
            text: 'psst... the forest bears have a secret: you are the best thing that ever happened to this world! 💖',
            type: 'standard'
        },
        {
            id: 'animation',
            min: 300,
            max: 360,
            title: 'Cute Animation! 🧸',
            text: 'The cheering bears have arrived just for you!\nHave a bear-y good birthday!',
            type: 'animation'
        }
    ];

    spinBtn.addEventListener('click', () => {
        if (isSpinning) return;
        isSpinning = true;
        spinBtn.disabled = true;
        spinBtn.innerText = 'SPINNING... 💫';

        // Add 5-8 extra full rotations + a random angle
        const spins = (Math.floor(Math.random() * 4) + 5) * 360;
        const extraDeg = Math.floor(Math.random() * 360);

        currentRotation += spins + extraDeg;

        // CSS transition is set to 4s in styles
        wheel.style.transform = `rotate(${currentRotation}deg)`;

        setTimeout(() => {
            isSpinning = false;
            spinBtn.disabled = false;
            spinBtn.innerText = 'SPIN AGAIN! ✨';

            // Calculate which segment is exactly at the top (0 degrees).
            // When wheel rotates by currentRotation degrees clockwise,
            // the top pointer is pointing to the original angle: -currentRotation
            const normalizedRotation = currentRotation % 360;
            const pointerAngle = (360 - normalizedRotation) % 360;

            const winningSegment = segments.find(s => pointerAngle >= s.min && pointerAngle < s.max);

            showResult(winningSegment);
        }, 4000);
    });

    function showResult(segment) {
        title.innerText = segment.title;
        text.innerHTML = segment.text.replace(/\n/g, '<br>');

        animatedBear.style.display = 'none';

        if (segment.type === 'confetti') {
            triggerConfetti();
        } else if (segment.type === 'animation') {
            animatedBear.style.display = 'block';
            confetti({
                particleCount: 100,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#ffe0e9', '#d17a8e', '#ffffff']
            });
        }

        modal.classList.add('active');
    }

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        animatedBear.style.display = 'none'; // reset just in case
    });

    function triggerConfetti() {
        if (typeof confetti === 'function') {
            const duration = 3000;
            const end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#e69ab0', '#d17a8e', '#f5e6e8', '#c89666', '#e1b382']
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#e69ab0', '#d17a8e', '#f5e6e8', '#c89666', '#e1b382']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    }
});
