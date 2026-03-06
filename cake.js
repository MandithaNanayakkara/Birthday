document.addEventListener('DOMContentLoaded', () => {
    // UI Elements
    const optionsPanel = document.getElementById('optionsPanel');
    const stepTitle = document.getElementById('stepTitle');
    const bearMessageBox = document.getElementById('bearMessageBox');

    // Cake Visual Elements
    const cakeDisplay = document.getElementById('cakeDisplay');
    const cakeBase = document.getElementById('cakeBase');
    const cakeFrosting = document.getElementById('cakeFrosting');
    const cakeDecor = document.getElementById('cakeDecor');

    // Buttons
    const finishCakeBtn = document.getElementById('finishCakeBtn');
    const cutCakeBtn = document.getElementById('cutCakeBtn');

    // Modal
    const modal = document.getElementById('surpriseModal');
    const modalTitle = document.getElementById('surpriseTitle');
    const modalText = document.getElementById('surpriseText');
    const closeModalBtn = document.getElementById('closeSurpriseModal');

    // Game State
    let currentStep = 0;
    const selections = {
        base: null,
        frosting: null,
        decor: null
    };

    const steps = [
        {
            title: "Step 1: Choose Base",
            options: [
                { id: "base-vanilla", label: "🍰 Vanilla Cake", css: "base-vanilla", isCupcake: false },
                { id: "base-chocolate", label: "🎂 Chocolate Cake", css: "base-chocolate", isCupcake: false },
                { id: "base-cupcake", label: "🧁 Cupcake Tower", css: "base-cupcake", isCupcake: true },
            ],
            type: "base",
            getMessage: () => "Nice choice Rachi! 🧸"
        },
        {
            title: "Step 2: Choose Frosting",
            options: [
                { id: "frosting-strawberry", label: "🍓 Strawberry", css: "frosting-strawberry" },
                { id: "frosting-chocolate", label: "🍫 Chocolate", css: "frosting-chocolate" },
                { id: "frosting-cream", label: "🍦 Cream", css: "frosting-cream" },
            ],
            type: "frosting",
            getMessage: () => "This cake is getting delicious! ✨"
        },
        {
            title: "Step 3: Add Decorations",
            options: [
                { id: "decor-bear", label: "🧸 Bear Topper", content: "🧸" },
                { id: "decor-sprinkles", label: "🎉 Party Sprinkles", content: "🎉" },
                { id: "decor-hearts", label: "💖 Hearts", content: "💖" },
                { id: "decor-candles", label: "🎈 Candles", content: "🕯️" },
            ],
            type: "decor",
            getMessage: () => "Rachi is a professional baker now! Bear approved 🧸"
        }
    ];

    function renderOptions() {
        if (currentStep >= steps.length) {
            optionsPanel.innerHTML = "";
            stepTitle.innerText = "All done! Ready to present?";
            finishCakeBtn.classList.add('visible');
            return;
        }

        const stepData = steps[currentStep];
        stepTitle.innerText = stepData.title;
        optionsPanel.innerHTML = "";

        stepData.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt.label;

            // Check if selected
            if (selections[stepData.type] && selections[stepData.type].id === opt.id) {
                btn.classList.add('selected');
            }

            btn.addEventListener('click', () => {
                selections[stepData.type] = opt;
                applySelection(stepData.type, opt);
                bearMessageBox.innerText = stepData.getMessage();

                // Pop the message box slightly
                bearMessageBox.style.transform = 'scale(1.05)';
                setTimeout(() => bearMessageBox.style.transform = 'scale(1)', 200);

                // Small Confetti
                if (typeof confetti === 'function') {
                    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
                }

                // Go to next step after a tiny delay
                setTimeout(() => {
                    currentStep++;
                    renderOptions();
                }, 500);
            });
            optionsPanel.appendChild(btn);
        });
    }

    function applySelection(type, opt) {
        if (type === 'base') {
            cakeBase.className = 'cake-layer cake-base active ' + opt.css;
            if (opt.isCupcake) {
                cakeDisplay.classList.add('is-cupcake');
            } else {
                cakeDisplay.classList.remove('is-cupcake');
            }
        } else if (type === 'frosting') {
            cakeFrosting.className = 'cake-layer cake-frosting active ' + opt.css;
        } else if (type === 'decor') {
            cakeDecor.className = 'cake-layer cake-decor active';
            cakeDecor.innerText = opt.content;
            // Visual pop
            cakeDecor.style.transform = 'scale(1.2)';
            setTimeout(() => cakeDecor.style.transform = 'scale(1)', 300);
        }
    }

    // Initialize
    renderOptions();

    // Finish Cake
    finishCakeBtn.addEventListener('click', () => {
        finishCakeBtn.style.display = 'none';
        stepTitle.style.display = 'none';

        // Big Confetti & Balloons
        triggerConfetti(2500);

        bearMessageBox.innerText = "Perfect! This cake was made with love for Rachi 🧸❤️";

        setTimeout(() => {
            modalTitle.innerText = "Congratulations! 🏆";

            let extraMsg = '';
            if (selections.decor && selections.decor.id === 'decor-bear') {
                extraMsg = '<br><br>✨ <span style="color:#d17a8e; font-weight:bold;">Secret Unlocked:</span><br> Rachi unlocked the Bear Cake 🧸🎂!';
            }

            modalText.innerHTML = "You unlocked the <strong style='color:#c89666;'>Birthday Baker Award</strong>! 🎂🏆" + extraMsg;
            modal.classList.add('active');

            if (closeModalBtn) {
                closeModalBtn.onclick = () => {
                    modal.classList.remove('active');
                    cutCakeBtn.classList.add('visible');
                };
            }
        }, 1500);
    });

    cutCakeBtn.addEventListener('click', () => {
        cutCakeBtn.classList.remove('visible');

        // Slice animation using a clip-path class defined in HTML
        cakeBase.classList.add('cut-slice');
        cakeFrosting.classList.add('cut-slice');

        // Another burst
        if (typeof confetti === 'function') {
            confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 }, colors: ['#ff4b4b', '#ffffff', '#e69ab0'] });
        }

        bearMessageBox.innerText = "Happy Birthday Rachi! 🎉🍰";
    });

    function triggerConfetti(durationInput) {
        if (typeof confetti === 'function') {
            const duration = durationInput || 3000;
            const end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 5, angle: 60, spread: 55, origin: { x: 0 },
                    colors: ['#e69ab0', '#d17a8e', '#f5e6e8', '#c89666', '#e1b382']
                });
                confetti({
                    particleCount: 5, angle: 120, spread: 55, origin: { x: 1 },
                    colors: ['#e69ab0', '#d17a8e', '#f5e6e8', '#c89666', '#e1b382']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    }
});
