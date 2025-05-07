const totalTime = 10 * 60; // 10 minutes in seconds
let timeLeft = totalTime;

const bar = document.getElementById("bar");
const timeDisplay = document.getElementById("time");

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function updateTimer() {
  timeLeft--;

  const percent = ((totalTime - timeLeft) / totalTime) * 100;
  bar.style.width = `${percent}%`;
  timeDisplay.textContent = formatTime(timeLeft);

  if (timeLeft <= 0) {
    clearInterval(timer);
    timeDisplay.textContent = "0:00";
    bar.style.width = "100%";
  }
}

timeDisplay.textContent = formatTime(timeLeft);
const timer = setInterval(updateTimer, 1000);
