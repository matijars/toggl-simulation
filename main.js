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
window.onresize = function () {
  toggle();
};

function toggle() {
  if (window.innerWidth <= 1021) {
    brand.src = "./img/toggl-small.png";
  } else {
    brand.src = "./img/toggl.png";
  }
}
