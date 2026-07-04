// js/harvest-nav.js — Template C (Harvest): scroll-reveal only. The nav itself
// is a single persistent bar with a constant shadow (no scroll-triggered
// transform, per the source site's audited behavior) and per-page
// aria-current in markup, so no active-link JS is needed here.
(function () {
  var currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".h-nav__links a, .h-nav-dropdown-panel a").forEach(function (link) {
    if (link.getAttribute("href") === currentPath) {
      link.setAttribute("aria-current", "page");
      var parentDropdown = link.closest(".h-nav-dropdown");
      if (parentDropdown) {
        parentDropdown.querySelector(".h-nav-dropdown-trigger").classList.add("is-current-group");
      }
    }
  });

  var dropdowns = document.querySelectorAll(".h-nav-dropdown");
  dropdowns.forEach(function (dropdown) {
    var trigger = dropdown.querySelector(".h-nav-dropdown-trigger");
    if (!trigger) return;
    trigger.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = dropdown.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(isOpen));
      dropdowns.forEach(function (other) {
        if (other !== dropdown) {
          other.classList.remove("is-open");
          other.querySelector(".h-nav-dropdown-trigger").setAttribute("aria-expanded", "false");
        }
      });
    });
  });
  document.addEventListener("click", function (e) {
    dropdowns.forEach(function (dropdown) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("is-open");
        var trigger = dropdown.querySelector(".h-nav-dropdown-trigger");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      }
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      dropdowns.forEach(function (dropdown) {
        dropdown.classList.remove("is-open");
        var trigger = dropdown.querySelector(".h-nav-dropdown-trigger");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      });
    }
  });

  var revealEls = document.querySelectorAll(".h-reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach(function (el) { observer.observe(el); });
})();
