// js/nav.js — shared behavior for all pages
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-active", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  var currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".site-nav a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === currentPath) {
      link.setAttribute("aria-current", "page");
      var parentDropdown = link.closest(".nav-dropdown");
      if (parentDropdown) {
        parentDropdown.querySelector(".nav-dropdown-trigger").classList.add("is-current-group");
      }
    }
  });

  // Dropdown submenus: click to open/close, close on outside click or Escape
  var dropdowns = document.querySelectorAll(".nav-dropdown");
  dropdowns.forEach(function (dropdown) {
    var trigger = dropdown.querySelector(".nav-dropdown-trigger");
    if (!trigger) return;
    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = dropdown.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(isOpen));
      dropdowns.forEach(function (other) {
        if (other !== dropdown) {
          other.classList.remove("is-open");
          other.querySelector(".nav-dropdown-trigger").setAttribute("aria-expanded", "false");
        }
      });
    });
  });
  document.addEventListener("click", function (e) {
    dropdowns.forEach(function (dropdown) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("is-open");
        var trigger = dropdown.querySelector(".nav-dropdown-trigger");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      }
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      dropdowns.forEach(function (dropdown) {
        dropdown.classList.remove("is-open");
        var trigger = dropdown.querySelector(".nav-dropdown-trigger");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      });
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
