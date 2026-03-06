document.addEventListener('DOMContentLoaded', () => {

    // Twinkling stars background
    const bg = document.getElementById('starryBg');
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 + 1; // 1 to 4px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = Math.random();
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        bg.appendChild(star);
    }

    // Launch Fireworks + Confetti loop
    function launchFirework() {
        if (typeof confetti === 'function') {
            const duration = 15 * 1000;
            const end = Date.now() + duration;

            (function frame() {
                // launch a few confetti from left edge
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#ffe0e9', '#d17a8e', '#ffffff', '#e1b382', '#ff4b4b', '#c89666']
                });
                // and from right edge
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#ffe0e9', '#d17a8e', '#ffffff', '#e1b382', '#ff4b4b', '#c89666']
                });

                // Random center firework bursts
                if (Math.random() < 0.1) {
                    confetti({
                        particleCount: 100,
                        spread: 100,
                        startVelocity: 40,
                        origin: {
                            x: Math.random() * 0.6 + 0.2, // Between 0.2 and 0.8
                            y: Math.random() * 0.4 + 0.1  // Between 0.1 and 0.5 (top half)
                        },
                        colors: ['#ffe0e9', '#d17a8e', '#ffffff', '#c89666']
                    });
                }

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                } else {
                    // Loop again after short delay
                    setTimeout(launchFirework, 2000);
                }
            }());
        }
    }

    // Start celebrations after page cinematic entrance
    setTimeout(launchFirework, 2000);
});
