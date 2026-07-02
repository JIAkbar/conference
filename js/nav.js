// js/nav.js — shared behavior for all pages
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  var currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === currentPath) {
      link.setAttribute("aria-current", "page");
    }
  });

  var tabButtons = document.querySelectorAll("[data-day-tab]");
  var tabPanels = document.querySelectorAll("[data-day-panel]");
  if (tabButtons.length && tabPanels.length) {
    tabButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-day-tab");
        tabButtons.forEach(function (b) {
          b.setAttribute("aria-selected", String(b === btn));
        });
        tabPanels.forEach(function (panel) {
          panel.hidden = panel.getAttribute("data-day-panel") !== target;
        });
      });
    });
  }
})();
