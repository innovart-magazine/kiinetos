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

  // Fade in animation (directional based on previous navigation)
  const navDir = sessionStorage.getItem('kinetos-nav-dir');
  if (navDir === 'left') {
    document.body.style.transform = 'translateX(30px)';
  } else if (navDir === 'right') {
    document.body.style.transform = 'translateX(-30px)';
  } else {
    document.body.style.transform = 'scale(0.97)';
  }
  sessionStorage.removeItem('kinetos-nav-dir');
  
  // Force reflow
  void document.body.offsetWidth;

  setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.style.transform = 'translateX(0) scale(1)';
  }, 30);

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

  // Transición de vuelta a la portada y entre secciones
  const backBtns = document.querySelectorAll('#interviews-link, .nav-center-link, header a[href="entrevista.html"], header a[href="capacitaciones.html"], header a[href="visitas.html"]');
  backBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      
      const currentPath = window.location.pathname.split('/').pop();
      if (!href || href === '#' || href === currentPath) return;

      // Determinar dirección si estamos navegando en el menú de pills
      const menuOrder = ['entrevista.html', 'capacitaciones.html', 'visitas.html'];
      const targetPage = href.split('/').pop();
      
      const targetIdx = menuOrder.indexOf(targetPage);
      const currentIdx = menuOrder.indexOf(currentPath);
      
      document.body.style.transition = 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      document.body.style.opacity = '0';

      if (targetIdx !== -1 && currentIdx !== -1) {
          // Navegación direccional
          if (targetIdx > currentIdx) {
              // Va a la derecha, la página actual sale hacia la izquierda
              document.body.style.transform = 'translateX(-30px)';
              sessionStorage.setItem('kinetos-nav-dir', 'left'); // La nueva página entrará desde la derecha (moviéndose hacia la izq)
          } else {
              // Va a la izquierda, la página actual sale hacia la derecha
              document.body.style.transform = 'translateX(30px)';
              sessionStorage.setItem('kinetos-nav-dir', 'right'); // La nueva página entrará desde la izquierda (moviéndose hacia la der)
          }
      } else {
          // Animación por defecto (scale down)
          document.body.style.transform = 'scale(0.96)';
      }

      setTimeout(function () {
        window.location.href = href;
      }, 300);
    });
  });

  // Transición para los botones "LEER ENTREVISTA"
  document.querySelectorAll('.card-button').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
          e.preventDefault();
          const href = this.getAttribute('href');
          if (!href) return;

          document.body.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          document.body.style.opacity = '0';
          document.body.style.transform = 'scale(0.95)';

          setTimeout(function() {
              window.location.href = href;
          }, 350);
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

// Manejo de la caché de retroceso (bfcache) para evitar pantalla negra
window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
        document.body.style.opacity = '1';
        document.body.style.transform = 'none';
    }
});
