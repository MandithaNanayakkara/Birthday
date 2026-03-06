document.addEventListener('DOMContentLoaded', () => {
    // Hide Loader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Welcome Screen Logic
    const enterBtn = document.getElementById('enterBtn');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const cakeScreen = document.getElementById('cakeScreen');
    const blowCandlesBtn = document.getElementById('blowCandlesBtn');

    const bgMusic = document.getElementById('bgMusic');
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    let isMusicPlaying = false;

    enterBtn.addEventListener('click', () => {
        welcomeScreen.classList.add('hidden');

        // Start background music
        if (bgMusic) {
            bgMusic.volume = 0.5;
            bgMusic.play().then(() => {
                isMusicPlaying = true;
                musicToggleBtn.classList.add('active'); // Fade in toggle button
            }).catch(e => console.log('Audio autoplay blocked:', e));
        }

        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ffe0e9', '#d17a8e', '#ffffff']
        });

        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            // Show Cake Screen
            cakeScreen.style.display = 'flex';
            // Trigger reflow
            void cakeScreen.offsetWidth;
            cakeScreen.classList.remove('hidden');

            // Play cake slide sequence
            const introSlides = document.querySelectorAll('#introSlideshow .slide');

            setTimeout(() => {
                introSlides[0].classList.remove('active');
                introSlides[1].classList.add('active');

                // Show button after animation (slide 2 logic)
                setTimeout(() => {
                    blowCandlesBtn.style.opacity = '1';
                    blowCandlesBtn.style.pointerEvents = 'auto';
                }, 1500);
            }, 3000); // Wait 3 seconds to show first image, then transition

        }, 1000); // Wait for transition out
    });

    if (musicToggleBtn) {
        musicToggleBtn.addEventListener('click', () => {
            if (isMusicPlaying) {
                bgMusic.pause();
                musicToggleBtn.innerText = '🔇';
                isMusicPlaying = false;
            } else {
                bgMusic.play();
                musicToggleBtn.innerText = '🎵';
                isMusicPlaying = true;
            }
        });
    }

    blowCandlesBtn.addEventListener('click', () => {
        // Change cake image to blown candles
        const bearCakeImg = document.getElementById('bearCakeImg');
        bearCakeImg.style.opacity = '0';
        setTimeout(() => {
            bearCakeImg.src = 'assets/bear_cake_off.png';
            bearCakeImg.style.opacity = '1';
        }, 500);

        // Show cheering bears
        const bearsCheeringImg = document.getElementById('bearsCheeringImg');
        const bearsCheeringImgLeft = document.getElementById('bearsCheeringImgLeft');
        bearsCheeringImg.style.opacity = '1';
        bearsCheeringImg.style.transform = 'translateY(0)';
        bearsCheeringImgLeft.style.opacity = '1';
        bearsCheeringImgLeft.style.transform = 'translateY(0) scaleX(-1)';

        // Update Text Message
        const cakeScreenTitle = document.getElementById('cakeScreenTitle');
        cakeScreenTitle.style.opacity = '0';
        setTimeout(() => {
            cakeScreenTitle.innerText = 'Make a wish Rachi 💖';
            cakeScreenTitle.style.opacity = '1';
        }, 500);

        // Hide Button
        blowCandlesBtn.style.opacity = '0';
        blowCandlesBtn.style.pointerEvents = 'none';

        // Confetti for blowing candles
        confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.5 },
            colors: ['#c89666', '#e1b382', '#ffffff', '#302b63']
        });

        // Add delay before unlocking the next page to let her enjoy the cheering moment
        setTimeout(() => {
            cakeScreen.classList.add('hidden');
            setTimeout(() => {
                cakeScreen.style.display = 'none';
                startAnimations(); // Show main site
            }, 1000);
        }, 4000); // 4 seconds of cheering and wish making before transition
    });

    // Reveal Animations
    function startAnimations() {
        // Handled completely by CSS / Interactive Bears now
    }

    // Interactive Bears Logic
    const bears = document.querySelectorAll('.interactive-bear');
    bears.forEach(bear => {
        bear.addEventListener('click', (e) => {
            bears.forEach(b => b.classList.remove('active'));
            bear.classList.add('active');
            setTimeout(() => bear.classList.remove('active'), 3000);

            const rect = bear.getBoundingClientRect();
            confetti({
                particleCount: 30, spread: 50,
                origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.width / 2) / window.innerHeight },
                colors: ['#ffe0e9', '#d17a8e', '#ffffff']
            });
        });
    });


    // Interactive Boxes Logic
    const boxes = document.querySelectorAll('.interactive-box');
    boxes.forEach(box => {
        box.addEventListener('click', () => {
            // Already opened
            if (box.classList.contains('active') && !box.dataset.type) return;

            // Close others (optional, but let's just make the message appear for this one)
            boxes.forEach(b => b.classList.remove('active'));
            box.classList.add('active');

            // Change image to open box magically
            const img = box.querySelector('img');
            img.style.transform = 'scale(1.2)';
            setTimeout(() => {
                img.src = 'assets/gift_box_open.png';
                img.style.transform = 'scale(1)';
            }, 150);

            // Hide the message after a while
            setTimeout(() => {
                box.classList.remove('active');
            }, 4000);

            // Handle Confetti Box Explosion
            if (box.dataset.type === 'confetti') {
                confetti({
                    particleCount: 300,
                    spread: 160,
                    origin: { y: 0.5 },
                    colors: ['#c89666', '#e1b382', '#ffffff', '#302b63', '#d17a8e']
                });
            } else {
                // Regular small confetti pop
                const rect = box.getBoundingClientRect();
                confetti({
                    particleCount: 50, spread: 70,
                    origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.width / 2) / window.innerHeight },
                    colors: ['#e1b382', '#ffffff', '#d17a8e']
                });
            }
        });
    });

    // Suspicious Button Logic
    const suspiciousBtn = document.getElementById('suspiciousBtn');
    const giantBearOverlay = document.getElementById('giantBearOverlay');
    const closeGiantBearBtn = document.getElementById('closeGiantBearBtn');

    if (suspiciousBtn) {
        suspiciousBtn.addEventListener('click', () => {
            // Screen shake
            document.body.classList.add('screen-shake');
            setTimeout(() => {
                document.body.classList.remove('screen-shake');

                // Show giant bear overlay
                giantBearOverlay.classList.add('active');

                // Huge Confetti Explosion
                confetti({
                    particleCount: 500,
                    spread: 200,
                    startVelocity: 60,
                    origin: { y: 0.6 },
                    colors: ['#ff4b4b', '#ffffff', '#302b63', '#d17a8e', '#c89666']
                });
            }, 500); // Wait for the 500ms shake to finish
        });
    }

    if (closeGiantBearBtn) {
        closeGiantBearBtn.addEventListener('click', () => {
            giantBearOverlay.classList.remove('active');
        });
    }

    // Secret Easter Eggs Logic
    const secrets = document.querySelectorAll('.secret-element');
    const mainPlayground = document.getElementById('mainPlayground');

    let toastTimeout;
    function showSecretToast() {
        let toast = document.getElementById('secretToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'secretToast';
            toast.className = 'secret-toast';
            toast.innerText = 'SECRET FOUND 🧸✨';
            document.body.appendChild(toast);
        }

        toast.classList.add('active');

        // Mini confetti from top
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.2 },
                colors: ['#ffe0e9', '#d17a8e', '#ffffff', '#e1b382']
            });
        }

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }

    secrets.forEach(secret => {
        secret.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent background click triggering twice
            showSecretToast();

            // tiny animation for the secret itself
            secret.style.transform = 'scale(1.5) rotate(360deg)';
            setTimeout(() => {
                secret.style.transform = '';
            }, 500);
        });
    });

    if (mainPlayground) {
        mainPlayground.addEventListener('click', (e) => {
            // Only trigger if they clicked exactly on the background, not on a bear or button
            if (e.target === mainPlayground) {
                showSecretToast();
                trackGlobalInteraction('main-background');
            }
        });
    }

    // --- Global Interaction Tracker ---
    const finalBtn = document.getElementById('finalSurpriseBtn');
    const interactionSet = new Set();

    function trackGlobalInteraction(id) {
        if (!interactionSet.has(id)) {
            interactionSet.add(id);
            // Need a reasonable amount of interactions to unlock final page
            if (interactionSet.size >= 8 && finalBtn) {
                finalBtn.style.display = 'block';
            }
        }
    }

    document.addEventListener('click', (e) => {
        const interactiveItem = e.target.closest('.interactive-bear, .interactive-box, .secret-element, .suspicious-btn, .play-action-btn');
        if (interactiveItem) {
            // Uniquely identify the item by combining class and whatever text it has
            const itemId = (interactiveItem.className || '') + (interactiveItem.textContent || '');
            trackGlobalInteraction(itemId);
        }
    });

});
