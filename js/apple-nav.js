// js/apple-nav.js — Template B: two-layer sticky nav (global nav + section sub-nav)
(function () {
  var nav = document.querySelector(".apple-nav");
  var subnav = document.querySelector(".apple-subnav");
  var hero = document.querySelector(".apple-hero");

  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("is-stuck", window.scrollY > 4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (subnav && hero) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          subnav.classList.toggle("is-visible", !entry.isIntersecting);
        });
      },
      { rootMargin: "-" + (44 + 1) + "px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(hero);
  }

  var subnavLinks = document.querySelectorAll(".apple-subnav__links a[href^='#']");
  if (subnavLinks.length) {
    var sections = Array.prototype.map.call(subnavLinks, function (a) {
      return document.getElementById(a.getAttribute("href").slice(1));
    }).filter(Boolean);
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          subnavLinks.forEach(function (a) {
            a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
          });
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  var revealEls = document.querySelectorAll(".apple-reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }
})();
