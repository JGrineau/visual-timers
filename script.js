const FULL_DASH_ARRAY = 565.48;
const TIME_LIMIT = 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;

const progressCircle = document.querySelector('.progress');
const timeDisplay = document.getElementById('time');

const timer = setInterval(() => {
  timePassed++;
  timeLeft = TIME_LIMIT - timePassed;

  // Update time text
  timeDisplay.textContent = timeLeft;

  // Update stroke dashoffset
  const offset = FULL_DASH_ARRAY * (timeLeft / TIME_LIMIT);
  progressCircle.style.strokeDashoffset = offset;

  if (timeLeft <= 0) {
    clearInterval(timer);
  }
}, 1000);
