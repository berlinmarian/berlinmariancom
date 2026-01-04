let backgrounds = ['backgrounds/background1.png'];
let currentIndex = 0;
const bgLayer = document.getElementById('bg-layer');

function loadMoreBackgrounds() {
    let i = 2;
    function check() {
        if (i > 20) return; // safety limit
        let img = new Image();
        img.onload = () => {
            backgrounds.push(`backgrounds/background${i}.png`);
            i++;
            check();
        };
        img.onerror = () => {
            // check for background.png if not included
            if (!backgrounds.includes('backgrounds/background.png')) {
                let img2 = new Image();
                img2.onload = () => {
                    backgrounds.push('backgrounds/background.png');
                };
                img2.src = 'backgrounds/background.png';
            }
        };
        img.src = `backgrounds/background${i}.png`;
    }
    check();
}

loadMoreBackgrounds();

const button = document.getElementById('bg-switch');
button.addEventListener('click', () => {
    bgLayer.style.opacity = '0';
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % backgrounds.length;
        bgLayer.style.backgroundImage = `url('${backgrounds[currentIndex]}')`;
        bgLayer.style.opacity = '1';
    }, 250);
});