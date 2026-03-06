(function () {
    // Get the current year to handle this cleanly. 
    // March is month index 2 (Jan=0, Feb=1, Mar=2)
    let targetYear = new Date().getFullYear();
    let targetDate = new Date(targetYear, 2, 7, 0, 0, 0).getTime();

    // If today is past March 7th for this year, maybe target next year (but the user specifically said 07th march, so using current year's March 7th is perfect)
    if (new Date().getTime() > targetDate + (24 * 60 * 60 * 1000)) {
        // Technically past March 7th this year
        targetDate = new Date(targetYear + 1, 2, 7, 0, 0, 0).getTime();
    }

    const now = new Date().getTime();

    if (now < targetDate) {
        // Halt parsing & hide everything immediately so there is ZERO flash of the actual website
        document.write(`
            <style>
                body > *:not(#countdownOverlay) { display: none !important; }
                body { background: #f5e6e8 !important; overflow: hidden !important; margin: 0; padding: 0; }
                #countdownOverlay { 
                    display: flex !important; 
                    flex-direction: column; 
                    justify-content: center; 
                    align-items: center; 
                    height: 100vh; 
                    width: 100vw; 
                    text-align: center; 
                    font-family: 'Playfair Display', serif;
                    background: linear-gradient(135deg, #ffe0e9, #fff0f5);
                    color: #d17a8e;
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 999999;
                }
                .locked-bear {
                    width: 180px;
                    margin-bottom: 20px;
                    animation: floatUp 2s infinite alternate ease-in-out;
                    filter: drop-shadow(0 10px 15px rgba(0,0,0,0.2));
                }
                .locked-title {
                    font-size: 3.5rem;
                    margin-bottom: 10px;
                    padding: 0 20px;
                }
                .locked-desc {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.5rem;
                    color: #5a4b40;
                    margin-bottom: 40px;
                    max-width: 600px;
                    padding: 0 20px;
                }
                .timer-box {
                    font-family: 'Outfit', sans-serif;
                    font-size: 3.5rem;
                    font-weight: bold;
                    background: rgba(255, 255, 255, 0.9);
                    padding: 20px 50px;
                    border-radius: 30px;
                    box-shadow: 0 15px 35px rgba(209, 122, 142, 0.2);
                    border: 4px solid white;
                    color: #d17a8e;
                    min-width: 300px;
                }
            </style>
        `);

        document.addEventListener('DOMContentLoaded', () => {
            const overlay = document.createElement('div');
            overlay.id = 'countdownOverlay';
            overlay.innerHTML = `
                <img src="assets/bear_cake.png" alt="Bear Waiting" class="locked-bear">
                <h1 class="locked-title">No peeking, Rachi! 🙈</h1>
                <p class="locked-desc">The forest bears are still preparing your ultimate birthday surprises. Come back when the timer reaches zero!</p>
                <div class="timer-box" id="countdownTimer">Loading...</div>
            `;
            document.body.appendChild(overlay);

            // Update timer every second
            const timerInterval = setInterval(() => {
                const currentTime = new Date().getTime();
                const distance = targetDate - currentTime;

                if (distance <= 0) {
                    clearInterval(timerInterval);
                    location.reload(); // Reload securely to let her in!
                } else {
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    let timeString = `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
                    if (days > 0) {
                        timeString = `${days}d ` + timeString;
                    }

                    document.getElementById('countdownTimer').innerText = timeString;
                }
            }, 1000);
        });
    }
})();
