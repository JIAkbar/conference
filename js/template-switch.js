// js/template-switch.js — floating pill toggle between Template A ("classic")
// and Template B ("apple") versions of the SAME page. Only wired on the 3
// demo pages that have both versions (Home, Speakers, Program).
(function () {
  var el = document.querySelector(".template-switch");
  if (!el) return;
  var current = el.getAttribute("data-current");
  var targets = {
    classic: el.getAttribute("data-classic"),
    apple: el.getAttribute("data-apple")
  };
  try { localStorage.setItem("icsaetTemplate", current); } catch (e) {}

  el.querySelectorAll("button[data-target]").forEach(function (btn) {
    var key = btn.getAttribute("data-target");
    btn.classList.toggle("is-active", key === current);
    if (key !== current) {
      btn.addEventListener("click", function () {
        window.location.href = targets[key];
      });
    }
  });
})();
