document.addEventListener('DOMContentLoaded', () => {
    const slices = document.querySelectorAll('.cake-slice');
    const modal = document.getElementById('surpriseModal');
    const title = document.getElementById('surpriseTitle');
    const text = document.getElementById('surpriseText');
    const closeBtn = document.getElementById('closeSurpriseModal');

    const surprises = {
        '1': {
            title: 'Coupon Unlocked! 🎫',
            text: 'One Free Hug!\nRedeemable anytime, anywhere. 🤗'
        },
        '2': {
            title: 'Bear Joke 😂',
            text: 'What do you call a bear with no teeth?\n\nA gummy bear! 🐻'
        },
        '3': {
            title: 'A gentle reminder 💖',
            text: 'You are my favourite human!'
        },
        '4': {
            title: 'Party Time! 🎊',
            text: 'Confetti burst incoming!!! 💥'
        },
        '5': {
            title: 'Secret Clue 🕵️‍♀️',
            text: 'Check under your pillow for a real gift... 🎁'
        }
    };

    slices.forEach(slice => {
        slice.addEventListener('click', () => {
            const sliceId = slice.getAttribute('data-slice');
            const surprise = surprises[sliceId];

            if (sliceId === '4') {
                // Trigger Confetti multiple times for a big burst
                triggerConfetti();
            }

            title.innerText = surprise.title;
            // Handle newlines in text by using innerHTML with <br> or just keep style white-space: pre-wrap
            text.innerHTML = surprise.text.replace(/\n/g, '<br>');
            modal.classList.add('active');
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
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
