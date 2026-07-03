// js/theme.js — light/dark/system theme toggle, persisted in localStorage
(function () {
  function resolve(pref) {
    if (pref === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return pref;
  }

  function apply(pref) {
    document.documentElement.setAttribute("data-theme", resolve(pref));
    document.querySelectorAll("[data-theme-btn]").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-theme-btn") === pref);
    });
  }

  var current = localStorage.getItem("theme") || "system";
  apply(current);

  document.querySelectorAll("[data-theme-btn]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      current = btn.getAttribute("data-theme-btn");
      localStorage.setItem("theme", current);
      apply(current);
    });
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    if (current === "system") apply("system");
  });
})();
