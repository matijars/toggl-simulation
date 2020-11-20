let sideMenu = document.querySelector(".side-menu");

let showMoreSection = document.querySelector(".show-more-section");
let showMoreBtn = document.querySelector("#show-more-btn");
let showMoreBtnArrow = document.querySelector(".fa-chevron-down");

let brand = document.querySelector("#brand");

let menuItems = document.querySelectorAll(".side-menu-item");

let workspace = document.querySelector(".workspace");
let workspaceArrow = document.querySelector(".workspace .fa-chevron-down");

const menuLinks = "./menu-links.json";

// Load menu items from json
fetch(menuLinks)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    const Analize = data[0].Analize.map((item) => {
      return `<div class="side-menu-item">
                <div class="icon">${item.icon}</div>
                <span>${item.span}</span>
              </div>`;
    }).join("");

    const Manage = data[1].Manage.map((item) => {
      return `<div class="side-menu-item">
                <div class="icon">${item.icon}</div>
                <span>${item.span}</span>
              </div>`;
    }).join("");

    const ShowMore = data[2].ShowMore.map((item) => {
      return `<div class="side-menu-item">
                <div class="icon">${item.icon}</div>
                <span>${item.span}</span>
              </div>`;
    }).join("");

    document.querySelector(".analize-section").insertAdjacentHTML("afterbegin", Analize);
    document.querySelector(".manage-section").insertAdjacentHTML("afterbegin", Manage);
    document.querySelector(".show-more-section").insertAdjacentHTML("afterbegin", ShowMore);
  });

// Menu active class
sideMenu.addEventListener(
  "click",
  function (e) {
    if (e.target.classList.contains("side-menu-item")) {
      sideMenu.querySelectorAll(".side-menu-item").forEach((item) => {
        item.classList.remove("active");
      });
      e.target.classList.add("active");
    }
  },
  true
);

// Manage menu section (Show more)
showMoreBtn.addEventListener("click", () => {
  showMoreSection.classList.toggle("active-section");

  if (showMoreBtnArrow.style.transform != "rotate(180deg)") {
    showMoreBtnArrow.style.transform = "rotate(180deg)";
    showMoreBtn.style.opacity = "1";
  } else {
    showMoreBtnArrow.style.transform = "rotate(0deg)";
    showMoreBtn.style.opacity = "0.5";
  }
});

// Workspace menu section
workspace.addEventListener("click", () => {
  workspace.classList.toggle("workspace-active");

  if (workspaceArrow.style.transform != "rotate(180deg)") {
    workspaceArrow.style.transform = "rotate(180deg)";
    workspaceArrow.style.color = "rgb(253, 229, 220)";
  } else {
    workspaceArrow.style.transform = "rotate(0deg)";
    workspaceArrow.style.color = "rgb(130, 113, 136)";
  }
});

// Responsive on window resise
window.onresize = () => {
  toggle();
};

function toggle() {
  if (window.innerWidth <= 1021) {
    brand.src = "./img/toggl-small.png";
  } else {
    brand.src = "./img/toggl.png";
  }
}

// Log content
let logCurrentDate = (document.querySelector(".log-current-date").innerHTML = moment().format(
  "dd, D MMM"
));

document.addEventListener("click", (e) => {
  let logOption = e.target;
  if (logOption.classList.contains("log-options-btn")) {
    let logItems = document.querySelectorAll(".log-item");

    logItems.forEach((item) => {
      item.style.pointerEvents = "none";
    });

    logOption.classList.toggle("options-btn-active");
    logOption.parentNode.parentNode.classList.toggle("log-item-active");
    logOption.parentNode.parentNode.style.pointerEvents = "auto";

    let icons = logOption.parentNode.children;
    for (let icon of icons) {
      icon.classList.toggle("log-action-icon-active");
    }

    logOption.parentNode.querySelector(".log-options").classList.toggle("log-options-open");
  } else if (logOption.classList.contains("delete-log")) {
    let logItems = document.querySelectorAll(".log-item");
    logItems.forEach((item) => {
      item.style.pointerEvents = "auto";
    });
    logOption.style.color = "red";
    logOption.parentNode.parentNode.parentNode.remove();
  } else {
    let logItems = document.querySelectorAll(".log-item");
    let logIcons = document.querySelectorAll(".log-action-icon");
    let logOptions = document.querySelectorAll(".log-options");
    let logOptionsBtns = document.querySelectorAll(".log-options-btn");

    logItems.forEach((item) => {
      item.classList.remove("log-item-active");
      item.style.pointerEvents = "auto";
    });

    logIcons.forEach((icon) => {
      icon.classList.remove("log-action-icon-active");
    });

    logOptions.forEach((option) => {
      option.classList.remove("log-options-open");
    });

    logOptionsBtns.forEach((btn) => {
      btn.classList.remove("options-btn-active");
    });
  }
});
