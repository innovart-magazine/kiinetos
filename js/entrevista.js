// --- Theme Handling ---
(function () {
  const saved = localStorage.getItem("kinetos-theme");
  if (saved === "light") document.body.classList.add("light-mode");
})();

// ===== LÓGICA PRINCIPAL =====
document.addEventListener("DOMContentLoaded", function() {
  // Footer Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Fade in animation
  setTimeout(function () {
    document.body.classList.add('loaded');
  }, 80);

  // Theme Toggle
  const themeBtn = document.getElementById("themeToggle");
  const iconMoon = document.getElementById("iconMoon");
  const iconSun = document.getElementById("iconSun");
  const themeLabel = document.getElementById("themeLabel");

  function applyTheme(isLight) {
    if (iconMoon) iconMoon.style.display = isLight ? "none" : "inline";
    if (iconSun) iconSun.style.display = isLight ? "inline" : "none";
    if (themeLabel) themeLabel.textContent = isLight ? "Claro" : "Oscuro";
  }

  if (themeBtn) {
    applyTheme(document.body.classList.contains("light-mode"));
    themeBtn.addEventListener("click", function () {
      document.body.classList.toggle("light-mode");
      const isLight = document.body.classList.contains("light-mode");
      localStorage.setItem("kinetos-theme", isLight ? "light" : "dark");
      applyTheme(isLight);
    });
  }

  // Transición de vuelta a la portada
  const backBtn = document.getElementById('interviews-link');
  if (backBtn) {
    backBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      document.body.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      document.body.style.opacity = '0';
      document.body.style.transform = 'scale(0.96)';
      setTimeout(function () {
        window.location.href = href;
      }, 650);
    });
  }

  // Transición para los botones "LEER ENTREVISTA"
  document.querySelectorAll('.card-button').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
          e.preventDefault();
          const href = this.getAttribute('href');
          if (!href) return;

          document.body.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          document.body.style.opacity = '0';
          document.body.style.transform = 'scale(0.95)';

          setTimeout(function() {
              window.location.href = href;
          }, 550);
      });
  });

  // Search Logic
  const searchBtn = document.getElementById("searchBtn");
  const searchContainer = document.getElementById("searchBarContainer");
  const searchInput = document.getElementById("searchInput");
  const articles = document.querySelectorAll("article.card-glow");

  if (searchBtn && searchContainer && searchInput) {
    searchBtn.addEventListener("click", function() {
      searchContainer.classList.toggle("open");
      if (searchContainer.classList.contains("open")) {
        searchInput.focus();
      } else {
        searchInput.value = "";
        filterArticles("");
      }
    });

    searchInput.addEventListener("input", function() {
      filterArticles(this.value.toLowerCase());
    });

    function filterArticles(term) {
      articles.forEach(article => {
        const text = article.textContent.toLowerCase();
        if (text.includes(term)) {
          article.style.display = "block";
        } else {
          article.style.display = "none";
        }
      });
    }
  }
});
