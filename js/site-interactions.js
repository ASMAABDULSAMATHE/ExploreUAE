
// Open or close the navigation menu on small screens.
const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
if (menuButton && mainNav) {
  menuButton.addEventListener("click", function () {
    const menuIsOpen = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", menuIsOpen);
    menuButton.textContent = menuIsOpen ? "×" : "☰";
  });
}
// Filter emirate cards by the selected category.
const filterButtons = document.querySelectorAll(".filter-button");
const emirateCards = document.querySelectorAll(".emirate-card");
const filterStatus = document.querySelector(".filter-status");
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const filter = button.dataset.filter;
    let visibleCount = 0;
    filterButtons.forEach(function (item) {
      item.classList.remove("selected");
    });
    button.classList.add("selected");
    emirateCards.forEach(function (card) {
      const tags = card.dataset.tags.split(" ");
      const shouldShow = filter === "all" || tags.includes(filter);
      card.hidden = !shouldShow;
      if (shouldShow) {
        visibleCount++;
      }
    });
    if (filterStatus) {
      filterStatus.textContent =
        filter === "all"
          ? "Showing all seven emirates."
          : "Showing " + visibleCount + " emirates.";
    }
  });
});
// Text shown in the details popup for each emirate.
const emirateInfo = {
  "abu-dhabi": {
    title: "Abu Dhabi",
    description:
      "The UAE capital offers landmark architecture, museums, island experiences, and desert landscapes.",
    tip: "Visit a cultural landmark and enjoy an evening along the Corniche."
  },
  dubai: {
    title: "Dubai",
    description:
      "Dubai is known for its skyline, lively neighbourhoods, shopping, beaches, and historic creekside areas.",
    tip: "Explore the old creek area, then enjoy a view of the modern skyline."
  },
  sharjah: {
    title: "Sharjah",
    description:
      "Sharjah is a destination for museums, traditional architecture, arts, and waterfront spaces.",
    tip: "Spend a morning around the heritage area and visit a museum."
  },
  ajman: {
    title: "Ajman",
    description:
      "Ajman offers a relaxed coastal stay, a heritage museum, and a long seafront.",
    tip: "Plan a beach day and visit the historic fort."
  },
  "umm-al-quwain": {
    title: "Umm Al Quwain",
    description:
      "Umm Al Quwain is known for its quieter pace, coastline, mangroves, and open water.",
    tip: "Look for a guided kayaking trip through the mangroves."
  },
  "ras-al-khaimah": {
    title: "Ras Al Khaimah",
    description:
      "Ras Al Khaimah brings together mountain scenery, desert experiences, beaches, and historic sites.",
    tip: "Choose a mountain or coastal activity for your visit."
  },
  fujairah: {
    title: "Fujairah",
    description:
      "Fujairah is on the UAE east coast, with mountain scenery, historic sites, and the Gulf of Oman.",
    tip: "Visit a heritage site, then explore the east-coast shoreline."
  }
};
// Open the details popup when a visitor clicks "Learn more".
const detailsDialog = document.querySelector(".details-dialog");
if (detailsDialog) {
  document.querySelectorAll(".learn-button").forEach(function (button) {
    button.addEventListener("click", function () {
      const info = emirateInfo[button.dataset.emirate];
      detailsDialog.querySelector(".dialog-title").textContent = info.title;
      detailsDialog.querySelector(".dialog-description").textContent =
        info.description;
      detailsDialog.querySelector(".dialog-tip").textContent = info.tip;
      detailsDialog.showModal();
    });
  });
  detailsDialog
    .querySelector(".close-dialog")
    .addEventListener("click", function () {
      detailsDialog.close();
    });
  detailsDialog
    .querySelector(".done-button")
    .addEventListener("click", function () {
      detailsDialog.close();
    });
}
