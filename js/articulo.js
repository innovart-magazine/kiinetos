// ===== CONTROL DE PAGINACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageIndicator = document.getElementById('pageIndicator');
    let currentPageIndex = 0;

    function showPage(index) {
        if (pages.length === 0) return;
        pages.forEach((page, i) => {
            if (i === index) {
                page.style.display = 'block';
                // Trigger resize so Chart.js renders correctly after display:none
                setTimeout(() => window.dispatchEvent(new Event('resize')), 20);
                // Animación suave de entrada de página
                page.style.opacity = '0';
                page.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    page.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    page.style.opacity = '1';
                    page.style.transform = 'translateY(0)';
                }, 10);
            } else {
                page.style.display = 'none';
            }
        });

        if (prevBtn) prevBtn.disabled = index === 0;
        if (nextBtn) nextBtn.disabled = index === pages.length - 1;
        if (pageIndicator) pageIndicator.textContent = `Página ${index + 1} / ${pages.length}`;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPageIndex > 0) {
                currentPageIndex--;
                showPage(currentPageIndex);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPageIndex < pages.length - 1) {
                currentPageIndex++;
                showPage(currentPageIndex);
            }
        });
    }

    if (pages.length > 0) {
        showPage(0);
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
      document.documentElement.classList.toggle("light-mode");
      const isLight = document.body.classList.contains("light-mode") || document.documentElement.classList.contains("light-mode");
      localStorage.setItem("kinetos-theme", isLight ? "light" : "dark");
      applyTheme(isLight);
      document.dispatchEvent(new CustomEvent('themeToggled', { detail: { isLight } }));
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
        
        // Agrega un nuevo estado al historial para interceptar el gesto de retroceso
        history.pushState({ modalOpen: true }, '');
    }

    function closeModal(isPopstate) {
        if (!videoModal.classList.contains('show')) return;

        videoModal.classList.remove('show');
        document.body.classList.remove('modal-open');
        
        setTimeout(() => {
            modalContent.innerHTML = '';
        }, 300);

        // Si se cierra con la X o clic afuera, retrocedemos manualmente para limpiar el historial
        // Solo si no fue disparado por el gesto de retroceso (popstate)
        if (!isPopstate && history.state && history.state.modalOpen) {
            history.back();
        }
    }

    thumbnailContainers.forEach(container => {
        container.addEventListener('click', () => {
            const src = container.getAttribute('data-video-src');
            if (src) {
                openModal(src.trim());
            }
        });
    });

    closeBtn.addEventListener('click', () => closeModal(false));

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeModal(false);
        }
    });

    // Intercepta el gesto de retroceso o botón de atrás
    window.addEventListener('popstate', (e) => {
        if (videoModal.classList.contains('show')) {
            // El usuario usó el gesto de retroceso, solo cerramos el modal
            closeModal(true);
        }
    });
});
