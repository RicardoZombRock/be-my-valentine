const hearts = document.getElementById('hearts');
const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const backBtn = document.getElementById('backBtn');
const card = document.getElementById('card');
const buttons = document.querySelector('.buttons');

// Floating hearts generation
function createHeart() {
  const h = document.createElement('div');
  h.className = 'heart';
  const heartSymbols = ['💖', '💕', '💗', '💓', '💝'];
  h.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
  h.style.left = Math.random() * 100 + 'vw';
  h.style.setProperty('--drift', (Math.random() - 0.5) * 100 + 'px');
  h.style.animationDuration = (6 + Math.random() * 4) + 's';
  h.style.animationDelay = Math.random() * 2 + 's';
  return h;
}

// Generate hearts continuously
setInterval(() => {
  const h = createHeart();
  hearts.appendChild(h);
  setTimeout(() => h.remove(), 10000);
}, 400);

// Initial hearts
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    hearts.appendChild(createHeart());
  }, i * 200);
}

// No button behavior - escapes from mouse
let noButtonTimeout;

noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moveNoButton();
});

function moveNoButton() {
  clearTimeout(noButtonTimeout);
  noBtn.style.pointerEvents = 'none';

  const buttonsRect = buttons.getBoundingClientRect();
  const noBtnRect = noBtn.getBoundingClientRect();

  // Calculate safe boundaries
  const maxX = buttons.clientWidth - noBtn.offsetWidth - 10;
  const maxY = buttons.clientHeight - noBtn.offsetHeight - 10;

  // Random position within boundaries
  const newX = Math.max(5, Math.random() * maxX);
  const newY = Math.max(5, Math.random() * maxY);

  noBtn.style.left = newX + 'px';
  noBtn.style.top = newY + 'px';
  noBtn.style.transform = 'translate(0, 0)';

  // Re-enable pointer after animation
  noButtonTimeout = setTimeout(() => {
    noBtn.style.pointerEvents = 'auto';
  }, 400);
}

// Yes button - flip card
yesBtn.addEventListener('click', () => {
  card.classList.add('flipped');
  createConfetti();
});

// Back button - return to front
backBtn.addEventListener('click', () => {
  card.classList.remove('flipped');
});

// Confetti effect when clicking Yes
function createConfetti() {
  const colors = ['#FF1493', '#FF69B4', '#FFB7D5', '#FFC0CB'];
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.left = '50%';
      confetti.style.top = '50%';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = '50%';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '9999';

      document.body.appendChild(confetti);

      const angle = Math.random() * Math.PI * 2;
      const velocity = 5 + Math.random() * 5;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;

      let x = 0, y = 0, opacity = 1;

      const animation = setInterval(() => {
        x += vx;
        y += vy;
        opacity -= 0.02;

        confetti.style.transform = `translate(${x}px, ${y}px)`;
        confetti.style.opacity = opacity;

        if (opacity <= 0) {
          clearInterval(animation);
          confetti.remove();
        }
      }, 20);
    }, i * 15);
  }
}

// Gallery photos click effect
document.querySelectorAll('.photo').forEach(photo => {
  photo.addEventListener('click', function () {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = '';
    }, 150);
  });
});