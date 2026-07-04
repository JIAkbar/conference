// js/harvest-nav.js — Template C (Harvest): scroll-reveal only. The nav itself
// is a single persistent bar with a constant shadow (no scroll-triggered
// transform, per the source site's audited behavior) and per-page
// aria-current in markup, so no active-link JS is needed here.
(function () {
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
