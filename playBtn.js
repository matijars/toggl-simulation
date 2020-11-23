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

  let bulkBtn = document.querySelector(".bulk-btn");
  let checkBtn = document.querySelectorAll(".check-input");

  if (window.getComputedStyle(bulkBtn).display === "none") {
    bulkBtn.style.display = "block";
  } else if (bulkBtn.classList.contains("bulk-btn-active")) {
    checkBtn.forEach((btn) => {
      btn.classList.add("check-input-active");
    });
  }

  updateTotalItems();
}
// Prinet time to html
function print(txt) {
  document.querySelector(".time-bar-time").innerHTML = txt;
}

function log() {
  let logInput = document.querySelector(".time-bar-input").value;
  let time = document.querySelector(".time-bar-time").textContent;

  let totalTimeHolder = document.querySelector(".total-time-holder");

  totalTimeHolder.insertAdjacentHTML(
    "afterend",
    `<div class="log-item">
      <div class="log-left">
        <label class="check-input">
         <input type="checkbox" class="checkbox item-checkbox"/>
        </label>
        <input
          class="log-input"
          type="text"
          value="${logInput}"
          placeholder="Add description"
        />
      </div>
      <div class="log-right">
        <i class="fas fa-tag log-action-icon"></i>
        <i class="fas fa-dollar-sign"></i>
        <span class="log-time">${time}</span>
        <i class="fas fa-play log-action-icon"></i>
        <i class="fas fa-ellipsis-v log-action-icon log-options-btn"></i>
        <div class='log-options'>
        <span>Duplicate</span>
        <span>Set as non-billable</span>
        <span>Go to project</span>
        <span class="delete-log">Delete</span>
        </div>
      </div>
    </div>`
  );
}
