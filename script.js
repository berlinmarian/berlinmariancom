let backgrounds = ['backgrounds/background1.png'];
let currentIndex = 0;
let layer1 = document.getElementById('bg-layer1');
let layer2 = document.getElementById('bg-layer2');
let currentBgElement = layer1;
let nextBgElement = layer2;

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
    let nextIndex = (currentIndex + 1) % backgrounds.length;
    nextBgElement.style.backgroundImage = `url('${backgrounds[nextIndex]}')`;
    nextBgElement.style.opacity = '1';
    currentBgElement.style.opacity = '0';
    // Swap elements
    [currentBgElement, nextBgElement] = [nextBgElement, currentBgElement];
    currentIndex = nextIndex;
});

// Collapsible sections
const toggles = document.querySelectorAll('.section-toggle');
toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const content = toggle.nextElementSibling;
        content.classList.toggle('open');
        toggle.classList.toggle('active');
    });
});

// Navigation with section opening
const navLinks = document.querySelectorAll('.navigation a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            // Open the section if closed
            const content = targetElement.querySelector('.section-content');
            const toggle = targetElement.querySelector('.section-toggle');
            if (content && !content.classList.contains('open')) {
                content.classList.add('open');
                toggle.classList.add('active');
            }
        }
    });
});