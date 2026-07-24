# Kinetos - Revista Digital de Desarrollo de Capital Humano

Kinetos es una revista digital interactiva diseñada para la difusión de conocimiento en temas de innovación, gestión del talento humano, entrevistas a líderes, capacitaciones y visitas empresariales. Es parte de las iniciativas del proyecto institucional **INNOVART** de la UNITEC.

## Tecnologías Utilizadas

- **HTML5:** Para la semántica y estructura del contenido.
- **CSS3 Vanilla:** Para los estilos, layout y animaciones. Incluye un sistema de variables (Custom Properties) para soportar el cambio entre **Modo Claro** y **Modo Oscuro**.
- **JavaScript Vanilla:** Para la interactividad, almacenamiento de preferencias locales (como el tema oscuro/claro), paginación de artículos y manejo de animaciones.
- **TailwindCSS (vía CDN):** Usado como utilidad complementaria en algunas vistas.

## Estructura del Proyecto

El código está organizado bajo el principio de separación de responsabilidades, con estilos y scripts globales para evitar duplicación.

```text
kinetos/
├── css/
│   ├── global.css          # Estilos base, variables, navbar, footer y utilidades compartidas.
│   ├── articulos.css       # Estilos específicos para las vistas de artículos largos y galerías.
│   ├── entrevista.css      # Estilos para el listado de tarjetas (grid) de entrevistas/visitas/capacitaciones.
│   ├── innovart.css        # Estilos específicos para la sección institucional Innovart.
│   └── revista.css         # Estilos para la página de inicio y portada.
├── js/
│   ├── global.js           # Lógica común: toggle de modo claro/oscuro, transiciones y validaciones del Navbar/Footer.
│   ├── articulo.js         # Lógica específica para artículos (paginación, acordeones de cristal y modales).
│   ├── entrevista.js       # Lógica adicional para filtrado de entrevistas.
│   └── revista.js          # Control de portada.
├── section/                # Páginas que sirven de índice (entrevista.html, capacitaciones.html, visitas.html, innovart.html).
├── entrevista/             # Carpetas con artículos detallados de entrevistas (ej: pablo.html).
├── capacitaciones/         # Artículos sobre los cursos y capacitaciones.
├── visitas/                # Artículos y registros de las visitas industriales.
├── img/                    # Imágenes estáticas del sitio web y logotipos.
├── img-cap/                # Recursos de imágenes exclusivos de las capacitaciones.
└── index.html              # Portada principal de la revista.
```

## Características Principales

1. **Modo Claro / Oscuro:** Integrado en todas las páginas, la preferencia del usuario se almacena en `localStorage`.
2. **Animaciones de Transición:** Navegación fluida entre páginas (slide in/out o scale fade) que hace la experiencia más parecida a una App Nativa.
3. **Responsive Design:** Todas las tarjetas e interfaces se ajustan a móviles, tablets y computadoras de escritorio automáticamente.
4. **Acordeones y Modales:** Visualización interactiva para videos, infografías y lecturas de artículos extensos (sin necesidad de scroll vertical infinito).

## Cómo Ejecutar

Para correr este proyecto en modo local, solo necesitas un servidor web simple (como `Live Server` en VS Code, o un servidor local en Python):

```bash
# Ejemplo usando Python 3
cd kinetos
python -m http.server 8000
```

Luego, visita `http://localhost:8000` en tu navegador de preferencia. No es necesario realizar instalaciones de paquetes (npm/yarn) debido a su naturaleza Vanilla.
