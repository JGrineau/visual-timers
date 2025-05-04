const FULL_DASH_ARRAY = 565.48;
const TIME_LIMIT = 600; // 10 minutes in seconds
let timePassed = 0;
let timeLeft = TIME_LIMIT;

const progressCircle = document.querySelector('.progress');
const timeDisplay = document.getElementById('time');

const timer = setInterval(() => {
  timePassed++;
  timeLeft = TIME_LIMIT - timePassed;

  // Format time as MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  // Update circle stroke
  const offset = FULL_DASH_ARRAY * (timeLeft / TIME_LIMIT);
  progressCircle.style.strokeDashoffset = offset;

  if (timeLeft <= 0) {
    clearInterval(timer);
  }
}, 1000);
