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
    var particles = [];
    document.querySelectorAll(".band--navy").forEach(function (hero) {
      var field = document.createElement("div");
      field.className = "particle-field";
      field.setAttribute("aria-hidden", "true");
      for (var i = 0; i < 36; i++) {
        var p = document.createElement("span");
        p.className = "particle";
        field.appendChild(p);
        particles.push({
          el: p,
          x: Math.random() * 100,
          y: Math.random() * 100,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -(0.4 + Math.random() * 0.9),
          rot: Math.random() * 360,
          vrot: (Math.random() - 0.5) * 24,
          phase: Math.random() * Math.PI * 2,
          freq: 0.12 + Math.random() * 0.28
        });
      }
      hero.insertBefore(field, hero.firstChild);
    });

    var lastTs = null;
    var tick = function (ts) {
      if (lastTs === null) lastTs = ts;
      var dt = (ts - lastTs) / 1000;
      lastTs = ts;
      particles.forEach(function (p) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.x < -5) p.x += 110; else if (p.x > 105) p.x -= 110;
        if (p.y < -5) p.y += 110; else if (p.y > 105) p.y -= 110;
        p.rot += p.vrot * dt;
        var s = 0.15 + 0.55 * (0.5 + 0.5 * Math.sin(ts / 1000 * p.freq * Math.PI * 2 + p.phase));
        p.el.style.left = p.x + "%";
        p.el.style.top = p.y + "%";
        p.el.style.opacity = Math.min(1, s * 1.3).toFixed(3);
        p.el.style.transform = "translate(-50%, -50%) rotate(" + p.rot.toFixed(1) + "deg) scale(" + s.toFixed(3) + ")";
      });
      requestAnimationFrame(tick);
    };
    if (particles.length) requestAnimationFrame(tick);
  }
})();
