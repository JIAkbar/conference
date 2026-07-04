// js/template-switch.js — floating pill toggle between however many template
// versions the current page has. Reads a JSON list from data-templates
// instead of a hardcoded pair, so adding a 3rd/4th/5th template is just
// adding another entry to that list — no JS changes needed.
(function () {
  var el = document.querySelector(".template-switch");
  if (!el) return;

  var current = el.getAttribute("data-current");
  var templates;
  try { templates = JSON.parse(el.getAttribute("data-templates")); } catch (e) { templates = null; }
  if (!templates || !templates.length) return;

  try { localStorage.setItem("icsaetTemplate", current); } catch (e) {}

  templates.forEach(function (t) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = t.label;
    btn.classList.toggle("is-active", t.key === current);
    if (t.key !== current) {
      btn.addEventListener("click", function () {
        window.location.href = t.url;
      });
    }
    el.appendChild(btn);
  });
})();
