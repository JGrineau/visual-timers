const TIME_LIMIT = 120;
let timePassed = 0;
let timeLeft = TIME_LIMIT;

const bar = document.getElementById("bar");
const timeText = document.getElementById("time");

const timer = setInterval(() => {
  timePassed++;
  timeLeft = TIME_LIMIT - timePassed;
  timeText.textContent = timeLeft;

  const progress = (timeLeft / TIME_LIMIT) * 100;
  bar.style.width = `${progress}%`;

  if (timeLeft <= 0) {
    clearInterval(timer);
  }
}, 1000);
