
// ---- Theme ----
(function () {
  const saved = localStorage.getItem("kinetos-theme");
  if (saved === "light") document.body.classList.add("light-mode");
})();

document.addEventListener("DOMContentLoaded", function () {
  // Footer Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Splash
  const splash = document.getElementById("splash");
  if (splash) {
    setTimeout(function () {
      splash.classList.add("hide");
      setTimeout(function () { splash.style.display = "none"; }, 850);
    }, 1400);
  }

  // Theme toggle
  const btn = document.getElementById("themeToggle");
  const iconMoon = document.getElementById("iconMoon");
  const iconSun = document.getElementById("iconSun");
  const lbl = document.getElementById("themeLabel");

  function applyTheme(isLight) {
    iconMoon.style.display = isLight ? "none" : "inline";
    iconSun.style.display = isLight ? "inline" : "none";
    if (lbl) lbl.textContent = isLight ? "Claro" : "Oscuro";
  }
  applyTheme(document.body.classList.contains("light-mode"));

  btn.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    localStorage.setItem("kinetos-theme", isLight ? "light" : "dark");
    applyTheme(isLight);
  });

  // Smooth transition to entrevistas
  const link = document.getElementById("interviews-link");
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.href;
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "0";
    setTimeout(function () { window.location.href = href; }, 520);
  });
});