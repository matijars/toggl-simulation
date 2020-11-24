// Get all DOM Elements
let sideMenu = document.querySelector(".side-menu");

let showMoreSection = document.querySelector(".show-more-section");
let showMoreBtn = document.querySelector("#show-more-btn");
let showMoreBtnArrow = document.querySelector(".fa-chevron-down");

let brand = document.querySelector("#brand");

let menuItems = document.querySelectorAll(".side-menu-item");

let workspace = document.querySelector(".workspace");
let workspaceArrow = document.querySelector(".workspace .fa-chevron-down");

const menuLinks = "./menu-links.json";

// Bulk
let bulkBtn = document.querySelector(".bulk-btn");
let bulkTotalHolder = document.querySelector(".bulk-total-holder");
let bulkCheckAll = document.querySelector("#bulkCheckAll");
let bulkSelected = document.querySelector("#bulk-selected");
let bulkTotal = document.querySelector("#bulk-total");
let bulkDelete = document.querySelector(".bulk-delete");

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

// Current date
let logCurrentDate = (document.querySelector(".log-current-date").innerHTML = moment().format(
  "dd, D MMM"
));

// Log options
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
    updateTotalItems();
    updateSelectedItems();
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

// Bulk button
bulkBtn.addEventListener("click", () => {
  bulkBtn.classList.toggle("bulk-btn-active");
  bulkTotalHolder.classList.toggle("show");
  let checkBtn = document.querySelectorAll(".check-input");
  updateTotalItems();

  checkBtn.forEach((btn) => {
    btn.classList.toggle("check-input-active");
  });
});

//Check all checkboxes
bulkCheckAll.addEventListener("change", () => {
  let itemCheckbox = document.querySelectorAll(".item-checkbox");

  if (bulkCheckAll.checked === true) {
    itemCheckbox.forEach((checkbox) => {
      checkbox.checked = true;
      bulkDelete.classList.add("bulk-delete-active");
    });
  } else {
    itemCheckbox.forEach((checkbox) => {
      checkbox.checked = false;
      bulkDelete.classList.add("bulk-delete-active");
    });
  }

  updateSelectedItems();
});

//Show selected checkboxes number
document.addEventListener("click", function (e) {
  let itemCheckbox = e.target;
  if (itemCheckbox.classList.contains("item-checkbox")) {
    bulkDelete.classList.add("bulk-delete-active");
    updateSelectedItems();
  }
});

// Bulk Delete Items
bulkDelete.addEventListener("click", function (e) {
  let itemCheckboxChecked = document.querySelectorAll(".item-checkbox:checked");
  if (itemCheckboxChecked.length > 0) {
    itemCheckboxChecked.forEach((checkbox) => {
      checkbox.closest(".log-item").remove();
    });
  }

  updateSelectedItems();
  updateTotalItems();
});

//Functions
updateTotalItems = () => {
  let totalItems = document.querySelectorAll(".log-item");
  bulkTotal.innerText = totalItems.length;
};

updateSelectedItems = () => {
  let itemCheckbox = document.querySelectorAll(".item-checkbox");
  let itemCheckboxChecked = document.querySelectorAll(".item-checkbox:checked");

  bulkSelected.innerText = itemCheckboxChecked.length;

  if (itemCheckboxChecked.length === itemCheckbox.length) {
    bulkCheckAll.checked = true;
  } else if (itemCheckboxChecked.length === 0) {
    bulkCheckAll.checked = false;
    bulkDelete.classList.remove("bulk-delete-active");
  }
};
