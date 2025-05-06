const duration = 5 * 60; // 5 minutes in seconds
const bar = document.getElementById('bar');
const timeText = document.getElementById('time');

let timeLeft = duration;

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeText.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  
  const percentage = ((duration - timeLeft) / duration) * 100;
  bar.style.width = `${percentage}%`;

  if (timeLeft > 0) {
    timeLeft--;
    setTimeout(updateTimer, 1000);
  }
}

updateTimer();
