let playBtn = document.querySelector(".play-btn");
let playBtnClr = "#dd6fd1";
let playBtnPauseClr = "#FF897A";

// Play button
playBtn.addEventListener("click", (e) => {
  let btn = e.target;

  btn.toggleAttribute("active");

  if (btn.hasAttribute("active")) {
    btn.style.color = playBtnPauseClr;
    btn.className = "fas fa-stop-circle play-btn";
    start();
  } else {
    btn.className = "fas fa-play-circle play-btn";
    btn.style.color = "";
    reset();
  }
});

// Convert time to a format of hours, minutes, seconds
function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let formattedHH = hh.toString().padStart(1, "0");
  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");

  return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

// Time variables
let startTime;
let elapsedTime = 0;
let timerInterval;

// Start and reset functions
function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 1000);
}

function reset() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  log();

  print("0:00:00");
  document.querySelector(".time-bar-input").value = "";
}
// Prinet time to html
function print(txt) {
  document.querySelector(".time-bar-time").innerHTML = txt;
}

function log() {
  let logInput = document.querySelector(".time-bar-input").value;
  let time = document.querySelector(".time-bar-time").textContent;

  let test = document.querySelector(".log-current-date");

  test.insertAdjacentHTML(
    "afterend",
    `<div class="log-item">
      <input
        class="log-input"
        type="text"
        value="${logInput}"
        placeholder="Add description"
      />
      <div class="log-right">
        <i class="fas fa-tag log-action-icon"></i>
        <i class="fas fa-dollar-sign"></i>
        <span class="log-time">${time}</span>
        <i class="fas fa-play log-action-icon"></i>
        <i class="fas fa-ellipsis-v log-action-icon"></i>
      </div>
    </div>`
  );
}
