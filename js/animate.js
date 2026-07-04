// js/animate.js — scroll reveal + header scroll shadow, respects prefers-reduced-motion
(function () {
  var revealEls = document.querySelectorAll(".reveal");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (!reduceMotion) {
    document.querySelectorAll(".band--navy").forEach(function (hero) {
      var field = document.createElement("div");
      field.className = "particle-field";
      field.setAttribute("aria-hidden", "true");
      for (var i = 0; i < 36; i++) {
        var p = document.createElement("span");
        p.className = "particle";
        p.style.left = (Math.random() * 100) + "%";
        p.style.top = (Math.random() * 100) + "%";
        p.style.transform = "rotate(" + Math.round(Math.random() * 360) + "deg)";
        p.style.animationDelay = (Math.random() * 5).toFixed(2) + "s";
        p.style.animationDuration = (4 + Math.random() * 3).toFixed(2) + "s";
        field.appendChild(p);
      }
      hero.insertBefore(field, hero.firstChild);
    });
  }
})();
