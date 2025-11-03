// 🌟 Page Navigation
function showPage(pageNum) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(`page${pageNum}`).classList.add('active');
}

// 🎁 Gift Card Creator
document.getElementById('giftForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('senderName').value;
  const msg = document.getElementById('giftMessage').value;
  document.getElementById('giftOutput').innerHTML = `
    <div class="card">
      <h3>🎁 From: ${name}</h3>
      <p>${msg}</p>
      <p>— Sent with love 💖</p>
    </div>
  `;
  e.target.reset();
});

// 📝 Guestbook
document.getElementById('guestForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('guestName').value;
  const msg = document.getElementById('guestMessage').value;
  const entry = document.createElement('p');
  entry.textContent = `💌 ${name}: ${msg}`;
  document.getElementById('guestList').appendChild(entry);
  e.target.reset();
});

// 🎉 Confetti Effect
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;
const confetti = Array(150).fill().map(() => ({
  x: Math.random() * confettiCanvas.width,
  y: Math.random() * confettiCanvas.height,
  r: Math.random() * 6 + 2,
  dx: Math.random() - 0.5,
  dy: Math.random() + 1,
  color: `hsl(${Math.random() * 360}, 100%, 70%)`
}));

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
    ctx.fillStyle = c.color;
    ctx.fill();
    c.x += c.dx;
    c.y += c.dy;
    if (c.y > confettiCanvas.height) c.y = 0;
  });
  requestAnimationFrame(drawConfetti);
}
drawConfetti();
// 🎵 Music Control + Auto-start on First Tap
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('musicBtn');
let musicStarted = false;

function playMusic() {
  music.play()
    .then(() => {
      musicBtn.textContent = '⏸ Pause Music';
      musicStarted = true;
    })
    .catch(err => {
      console.log('Autoplay blocked:', err);
    });
}

// Button toggle (play/pause)
musicBtn.addEventListener('click', () => {
  if (music.paused) {
    playMusic();
  } else {
    music.pause();
    musicBtn.textContent = '🎵 Play Music';
  }
});

// 🪄 Auto-start on first page interaction (click/tap)
document.body.addEventListener('click', () => {
  if (!musicStarted) {
    playMusic();
  }
}, { once: true }); // runs only 

// ⏳ Countdown + Thank You Switch
function updateCountdown() {
  const targetDate = new Date("Nov 15, 2025 00:00:00").getTime();
  const now = new Date().getTime();
  const distance = targetDate - now;
  const thankPage = document.getElementById("page6");

  if (distance <= 0) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    thankPage.classList.add("active");
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("countdown").innerHTML =
    `${days}d ${hours}h ${mins}m ${secs}s until the big day 🎂`;
}
setInterval(updateCountdown, 1000);
updateCountdown();