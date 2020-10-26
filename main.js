let showMoreSection = document.querySelector(".show-more");
let showMoreBtn = document.querySelector("#show-more-btn");
let showMoreBtnArrow = document.querySelector(".fa-chevron-down");

let brand = document.querySelector("#brand");

let menuItems = document.querySelectorAll(".side-menu-item");

let workspace = document.querySelector(".workspace");
let workspaceArrow = document.querySelector(".workspace .fa-chevron-down");

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

menuItems.forEach((item) => {
  item.addEventListener("click", (item) => {
    item.target.parentElement.parentElement
      .querySelectorAll(".active")
      .forEach((e) => e.classList.remove("active"));
    item.target.classList.add("active");
  });
});

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
