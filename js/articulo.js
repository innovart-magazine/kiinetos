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
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.clientWidth;

        let minDistance = Infinity;

        pages.forEach((page, idx) => {
            const rect = page.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            const distance = Math.abs(rect.left - containerRect.left);
            if (distance < minDistance) {
                minDistance = distance;
                visibleIndex = idx;
            }
        });

        currentPageIndex = visibleIndex;
        pageIndicator.textContent = `Página ${currentPageIndex+1} de ${totalPages}`;
        if (prevBtn) prevBtn.disabled = currentPageIndex === 0;
        if (nextBtn) nextBtn.disabled = currentPageIndex === totalPages - 1;
    }

    // Ocultar nav-pages al hacer scroll vertical en las páginas
    const navPages = document.querySelector('.nav-pages');
    let scrollTimeout;

    if (container) {
        const pages = container.querySelectorAll('.page');
        pages.forEach(page => {
            page.addEventListener('scroll', () => {
                if (navPages) {
                    navPages.style.opacity = '0';
                    navPages.style.pointerEvents = 'none';
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(() => {
                        navPages.style.opacity = '';
                        navPages.style.pointerEvents = '';
                    }, 400);
                }
            }, { passive: true });
        });

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
                pages[currentPageIndex - 1].scrollIntoView({ behavior: 'smooth', inline: 'start' });
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const pages = container.querySelectorAll('.page');
            if (currentPageIndex < pages.length - 1) {
                pages[currentPageIndex + 1].scrollIntoView({ behavior: 'smooth', inline: 'start' });
            }
        });
    }
});

// ===== Transición de vuelta a entrevistas =====
document.addEventListener('DOMContentLoaded', function() {
    const backBtns = document.querySelectorAll('.back-btn, .nav-center-link');
    
    backBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
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
    });
  }
});

// Manejo de la caché de retroceso (bfcache) para evitar pantalla negra
window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
        document.body.style.opacity = '1';
        document.body.style.transform = 'none';
    }
});

// ===== ACORDEÓN DE VIDEOS =====
document.addEventListener('DOMContentLoaded', function() {
    const accordions = document.querySelectorAll('.accordion-item');
    
    accordions.forEach(acc => {
        const header = acc.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = acc.classList.contains('active');
            
            // Cerrar todos los acordeones (Efecto exclusivo)
            accordions.forEach(item => {
                item.classList.remove('active');
                const content = item.querySelector('.accordion-content');
                if (content) {
                    content.style.maxHeight = null;
                    

                }
            });
            
            // Si el actual no estaba activo, abrirlo
            if (!isActive) {
                acc.classList.add('active');
                const content = acc.querySelector('.accordion-content');
                if (content) {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
            }
        });
    });

    // Ajustar max-height si cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
        document.querySelectorAll('.accordion-item.active .accordion-content').forEach(content => {
            content.style.maxHeight = content.scrollHeight + "px";
        });
    });
});
// ===== CONTROL DEL MODAL DE VIDEO =====
document.addEventListener('DOMContentLoaded', function() {
    const videoModal = document.getElementById('videoModal');
    if (!videoModal) return;
    
    const closeBtn = document.getElementById('closeVideoModal');
    const modalContent = document.getElementById('videoModalContent');
    const thumbnailContainers = document.querySelectorAll('.video-thumbnail-container');

    function openModal(src) {
        document.body.classList.add('modal-open');
        
        const iframe = document.createElement('iframe');
        iframe.src = src;
        iframe.allow = "autoplay; fullscreen";
        iframe.allowFullscreen = true;
        
        modalContent.innerHTML = '';
        modalContent.appendChild(iframe);
        
        videoModal.classList.add('show');
    }

    function closeModal() {
        videoModal.classList.remove('show');
        document.body.classList.remove('modal-open');
        
        setTimeout(() => {
            modalContent.innerHTML = '';
        }, 300);
    }

    thumbnailContainers.forEach(container => {
        container.addEventListener('click', () => {
            const src = container.getAttribute('data-video-src');
            if (src) {
                openModal(src.trim());
            }
        });
    });

    closeBtn.addEventListener('click', closeModal);

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeModal();
        }
    });
});
