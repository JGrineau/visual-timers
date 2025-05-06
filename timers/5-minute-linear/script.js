const fill = document.getElementById("fill");
const timeDisplay = document.getElementById("time");

let totalTime = 5 * 60; // 5 minutes in seconds
let timeLeft = totalTime;

const updateTimer = () => {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const percent = (timeLeft / totalTime) * 100;
  fill.style.width = `${percent}%`;

  if (timeLeft > 0) {
    timeLeft--;
    setTimeout(updateTimer, 1000);
  }
};

updateTimer();
