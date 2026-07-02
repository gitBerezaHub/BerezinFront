const SIZES = [40, 70, 100];
const COLORS = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22'];
const FIELD_SIZE = 300;

const state = {
  isPlaying: false,
  score: 0,
  timeLeft: 0,
  intervalId: null,
};

const timeHeader = document.getElementById('time-header');
const timeSpan = document.getElementById('time');
const resultHeader = document.getElementById('result-header');
const resultSpan = document.getElementById('result');
const startBtn = document.getElementById('start');
const field = document.getElementById('game');
const durationInput = document.getElementById('game-time');

function startGame() {
  const duration = Math.max(5, parseFloat(durationInput.value) || 5);
  state.score = 0;
  state.timeLeft = duration;
  state.isPlaying = true;

  startBtn.style.display = 'none';
  resultHeader.classList.add('hide');
  timeHeader.classList.remove('hide');

  updateTime();
  spawnSquare();
  state.intervalId = setInterval(tick, 100);
}

function tick() {
  state.timeLeft = Math.round((state.timeLeft - 0.1) * 10) / 10;
  if (state.timeLeft <= 0) {
    state.timeLeft = 0;
    updateTime();
    endGame();
  } else {
    updateTime();
  }
}

function updateTime() {
  timeSpan.textContent = state.timeLeft.toFixed(1);
}

function spawnSquare() {
  const existing = field.querySelector('.target');
  if (existing) existing.remove();

  const size = SIZES[Math.floor(Math.random() * SIZES.length)];
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const x = Math.floor(Math.random() * (FIELD_SIZE - size));
  const y = Math.floor(Math.random() * (FIELD_SIZE - size));

  const square = document.createElement('div');
  square.className = 'target';
  square.style.position = 'absolute';
  square.style.width = size + 'px';
  square.style.height = size + 'px';
  square.style.background = color;
  square.style.left = x + 'px';
  square.style.top = y + 'px';

  field.appendChild(square);
}

function handleFieldClick(e) {
  if (!state.isPlaying) return;
  if (e.target.classList.contains('target')) {
    state.score++;
    spawnSquare();
  }
}

function endGame() {
  clearInterval(state.intervalId);
  state.intervalId = null;
  state.isPlaying = false;

  const existing = field.querySelector('.target');
  if (existing) existing.remove();

  startBtn.style.display = '';
  timeHeader.classList.add('hide');
  resultHeader.classList.remove('hide');
  resultSpan.textContent = state.score;
}

startBtn.addEventListener('click', startGame);
field.addEventListener('click', handleFieldClick);
