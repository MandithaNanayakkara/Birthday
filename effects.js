document.addEventListener('DOMContentLoaded', () => {
    // 1. Heart cursor trail & Sparkles
    let lastMove = 0;

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastMove > 50) { // Throttle
            lastMove = now;
            createParticle(e.clientX, e.clientY);
        }
    });

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'magic-particle';
        const types = ['💖', '✨', '💕', '⭐'];
        particle.innerText = types[Math.floor(Math.random() * types.length)];
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.fontSize = `${Math.random() * 10 + 10}px`;

        document.body.appendChild(particle);

        const deltaX = (Math.random() - 0.5) * 60;
        const deltaY = (Math.random() - 0.5) * 60 - 30;

        const animation = particle.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(0)`, opacity: 0 }
        ], {
            duration: Math.random() * 500 + 800,
            easing: 'ease-out'
        });

        animation.onfinish = () => particle.remove();
    }

    // 2. Floating Balloons from bottom
    setInterval(() => {
        if (Math.random() > 0.5) {
            spawnFloatingBalloon();
        }
    }, 2500);

    function spawnFloatingBalloon() {
        const balloon = document.createElement('div');
        const types = ['🎈', '🧸', '💖', '✨'];
        balloon.innerText = types[Math.floor(Math.random() * types.length)];
        balloon.style.position = 'fixed';
        balloon.style.left = `${Math.random() * 100}vw`;
        balloon.style.top = `110vh`;
        balloon.style.fontSize = `${Math.random() * 20 + 30}px`;
        balloon.style.pointerEvents = 'none';
        balloon.style.zIndex = '1';
        balloon.style.filter = 'drop-shadow(0 5px 5px rgba(0,0,0,0.2))';
        document.body.appendChild(balloon);

        const animation = balloon.animate([
            { transform: `translateY(0) rotate(${Math.random() * 20 - 10}deg)` },
            { transform: `translateY(-130vh) rotate(${Math.random() * 60 - 30}deg)` }
        ], {
            duration: Math.random() * 5000 + 7000,
            easing: 'linear'
        });

        animation.onfinish = () => balloon.remove();
    }

    // 3. Occasional Confetti & Sparkles
    setInterval(() => {
        if (Math.random() > 0.6 && typeof confetti === 'function') {
            confetti({
                particleCount: 15,
                spread: 60,
                startVelocity: 30,
                origin: { x: Math.random(), y: Math.random() * 0.2 }, // Random top positions
                colors: ['#ffe0e9', '#d17a8e', '#ffffff', '#e1b382', '#ff4b4b', '#c89666'],
                zIndex: 9998
            });
        }
    }, 4500);
});
