const FULL_DASH_ARRAY = 565.48;
const TIME_LIMIT = 300; // 5 minutes = 300 seconds
let timePassed = 0;
let timeLeft = TIME_LIMIT;

const progressCircle = document.querySelector('.progress');
const timeDisplay = document.getElementById('time');

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

const timer = setInterval(() => {
  timePassed++;
  timeLeft = TIME_LIMIT - timePassed;

  // Update time text
  timeDisplay.textContent = formatTime(timeLeft);

  // Update stroke dashoffset
  const offset = FULL_DASH_ARRAY * (timeLeft / TIME_LIMIT);
  progressCircle.style.strokeDashoffset = offset;

  if (timeLeft <= 0) {
    clearInterval(timer);
  }
}, 1000);

// Set the initial time format when the page loads
timeDisplay.textContent = formatTime(TIME_LIMIT);
