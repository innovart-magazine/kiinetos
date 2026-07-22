import os

css_code = """
/* ==========================================================================
   CAPA DE SEGURIDAD CSS - RESPONSIVIDAD GLOBAL
   ========================================================================== */

/* 1. Contención Absoluta del Viewport (Reset Global) */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

/* 2. Domesticación de Iframes y Multimedia */
img,
video,
canvas,
iframe {
  max-width: 100%;
  height: auto;
  display: block;
}

iframe[src*="youtube.com"] {
  aspect-ratio: 16 / 9;
  width: 100%;
}

/* 3. Prevención de Ruptura en Flexbox y Acordiones */
p, h1, h2, h3, h4, h5, h6, a, span, td, th {
  word-break: break-word;
  overflow-wrap: break-word;
}

.flex-container > *,
.flex-child,
.accordion-content,
.card-content {
  min-width: 0;
}

/* 4. Ajustes del Carrusel en Pantallas Pequeñas (< 768px) */
@media (max-width: 767px) {
  .carousel-slide {
    width: 100%; 
    max-width: 100vw;
  }
}
"""

css_dir = r"c:\kinetos\css"
for filename in os.listdir(css_dir):
    if filename.endswith(".css"):
        filepath = os.path.join(css_dir, filename)
        with open(filepath, "a", encoding="utf-8") as f:
            f.write("\n" + css_code + "\n")
print("CSS appended to all files.")
