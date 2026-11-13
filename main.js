(function () {
  var root = document.documentElement;
  var status = document.getElementById("lang-status");
  var group = document.getElementById("lang-switch");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var descriptions = {
    nl: "Felsy is een freelance studio in Zoetermeer voor het ontwerp en de ontwikkeling van websites en webapps. KvK 92309798.",
    en: "Felsy is a freelance studio in Zoetermeer for the design and development of websites and web apps. KvK 92309798."
  };
  var titles = {
    nl: "Felsy — websites en webapps",
    en: "Felsy — websites and web apps"
  };

  function apply(lang, fromUser) {
    var next = lang === "en" ? "en" : "nl";
    root.lang = next;
    if (group) {
      group.setAttribute("aria-label", next === "nl" ? "Taal" : "Language");
    }
    document.querySelectorAll("[data-lang-set]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang-set") === next ? "true" : "false");
    });
    document.title = titles[next];
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", descriptions[next]);
    if (fromUser) {
      try {
        localStorage.setItem("felsy-lang", next);
      } catch (e) {}
      if (status) {
        status.textContent = next === "nl" ? "Taal: Nederlands" : "Language: English";
      }
      if (!reduce) {
        document.body.classList.remove("is-turning");
        void document.body.offsetWidth;
        document.body.classList.add("is-turning");
      }
    }
  }

  if (group) {
    group.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-lang-set]");
      if (!btn) return;
      apply(btn.getAttribute("data-lang-set"), true);
    });
  }

  var stored = "nl";
  try {
    stored = localStorage.getItem("felsy-lang") === "en" ? "en" : "nl";
  } catch (e) {}
  apply(root.lang === "en" ? "en" : stored, false);
})();
