import re

# 1. Modificar HTML
html_file = r'c:\kinetos\entrevista\articulo4.html'
with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

pattern = r'<div class="accordion-video">\s*(?:<!--.*?-->\s*)?<iframe.*?src="(.*?)".*?><\/iframe>\s*<\/div>'
replacement = r'''<div class="accordion-video video-thumbnail-container" data-video-src="\1">
                    <div class="video-placeholder">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="play-icon"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                    </div>
                    <button class="ver-video-btn">Ver Video Completo</button>
                  </div>'''
new_html = re.sub(pattern, replacement, html, flags=re.DOTALL)

modal_html = '''
  <div id="videoModal" class="video-modal">
    <button id="closeVideoModal" class="close-video-modal" aria-label="Cerrar video">&times;</button>
    <div class="video-modal-content" id="videoModalContent">
    </div>
  </div>

  <script src="../js/articulo.js" defer></script>
'''
new_html = new_html.replace('  <script src="../js/articulo.js" defer></script>', modal_html)

with open(html_file, 'w', encoding='utf-8') as f:
    f.write(new_html)

# 2. Modificar CSS
css_file = r'c:\kinetos\css\articulos.css'
with open(css_file, 'r', encoding='utf-8') as f:
    css = f.read()

# Quitar titulo en moviles
css = css.replace('''  .article-header .article-title {
    order: 3;
    width: 100%;
    max-width: 100%;
    text-align: center;
    margin-top: 0.5rem;
    font-size: 0.95rem;
    white-space: normal;
  }''', '''  .article-header .article-title {
    display: none; /* Limpieza Visual: Ocultar en móviles */
  }''')

# Añadir CSS modal y thumbnail al final
css += '''
/* ===== VIDEO THUMBNAIL Y MODAL ===== */
.video-thumbnail-container {
  cursor: pointer;
  position: relative;
  background: #111;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(168, 85, 247, 0.2);
}

.video-thumbnail-container:hover {
  border-color: rgba(168, 85, 247, 0.6);
}

.video-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  color: #a855f7;
  opacity: 0.8;
  transition: opacity 0.3s;
}

.video-thumbnail-container:hover .video-placeholder {
  opacity: 1;
}

.play-icon {
  width: 48px;
  height: 48px;
}

.ver-video-btn {
  margin-bottom: 20px;
  background: #a855f7;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  pointer-events: none;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 10px rgba(168, 85, 247, 0.3);
}

.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(5px);
}

.video-modal.show {
  display: flex;
  opacity: 1;
}

.close-video-modal {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 28px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  transition: background 0.2s;
}

.close-video-modal:hover {
  background: rgba(255, 255, 255, 0.25);
}

.video-modal-content {
  width: 100%;
  height: 100%;
  max-width: 1000px;
  max-height: 80vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-modal-content iframe {
  width: 100%;
  height: 100%;
  border: none;
  pointer-events: auto; /* Devolver interaccion al Drive en el modal */
}

body.modal-open {
  overflow: hidden !important;
}

/* Aplicar la regla de pointer-events a iframes en general como fue solicitado */
iframe {
  pointer-events: none;
}
'''

with open(css_file, 'w', encoding='utf-8') as f:
    f.write(css)

# 3. Modificar JS
js_file = r'c:\kinetos\js\articulo.js'
with open(js_file, 'r', encoding='utf-8') as f:
    js = f.read()

# Remover el reinicio de iframe al cerrar acordeon
js = js.replace('''                    // Pausar el iframe quitando y poniendo el src si se cierra
                    // Esto detiene el video de drive automáticamente
                    const iframe = content.querySelector('iframe');
                    if(iframe && iframe.src) {
                        const tempSrc = iframe.src;
                        iframe.src = '';
                        iframe.src = tempSrc;
                    }''', '')

# Añadir script de modal
js += '''
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
'''

with open(js_file, 'w', encoding='utf-8') as f:
    f.write(js)
