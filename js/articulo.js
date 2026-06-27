// ===== CONTROL DE PAGINACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.pages-container');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageIndicator = document.getElementById('pageIndicator');
    let currentPageIndex = 0;
    let totalPages = 0;

    function updateIndicator() {
        if (!pageIndicator) return;
        const pages = container.querySelectorAll('.page');
        totalPages = pages.length;
        let visibleIndex = 0;
        const scrollTop = container.scrollTop;
        const containerHeight = container.clientHeight;

        pages.forEach((page, idx) => {
            const rect = page.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const pageCenter = rect.top + rect.height/2 - containerRect.top;
            if (pageCenter >= 0 && pageCenter <= containerHeight) {
                visibleIndex = idx;
            }
        });

        currentPageIndex = visibleIndex;
        pageIndicator.textContent = `Página ${currentPageIndex+1} de ${totalPages}`;
        if (prevBtn) prevBtn.disabled = currentPageIndex === 0;
        if (nextBtn) nextBtn.disabled = currentPageIndex === totalPages - 1;
    }

    if (container) {
        container.addEventListener('scroll', updateIndicator);
        // Actualizar al cargar y al cambiar tamaño
        window.addEventListener('resize', updateIndicator);
        setTimeout(updateIndicator, 100);
    }

    // Botones de navegación
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPageIndex > 0) {
                const pages = container.querySelectorAll('.page');
                pages[currentPageIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const pages = container.querySelectorAll('.page');
            if (currentPageIndex < pages.length - 1) {
                pages[currentPageIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
});

// ===== Transición de vuelta a entrevistas =====
document.addEventListener('DOMContentLoaded', function() {
    const backBtn = document.querySelector('.back-btn');
    if (!backBtn) return;

    backBtn.addEventListener('click', function(e) {
        e.preventDefault();                 // Evita la navegación inmediata
        const href = this.getAttribute('href');

        // Aplica fade out + escala al body
        document.body.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        document.body.style.opacity = '0';
        document.body.style.transform = 'scale(0.96)';

        // Redirige después de que termine la transición
        setTimeout(function() {
            window.location.href = href;
        }, 650);
    });
});

// ===== CONTROL DE TEMA Y FOOTER =====
(function () {
  const saved = localStorage.getItem("kinetos-theme");
  if (saved === "light") document.body.classList.add("light-mode");
})();

document.addEventListener("DOMContentLoaded", function() {
  // Footer Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

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
});