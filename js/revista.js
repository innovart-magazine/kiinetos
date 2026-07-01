
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

  // Typewriter Effect
  const twText = document.querySelector('.typewriter-text');
  if (twText) {
    const phrases = [
      "capturar las ideas en movimiento.",
      "proyectar el increíble potencial que nos rodea.",
      "ser una ventana hacia las nuevas tendencias.",
      "contar las historias que inspiran acción."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 60;

    function typeWriter() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        twText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 25; // Faster when deleting
      } else {
        twText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 60; // Normal typing speed
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at the end of phrase
        typingSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 600; // Pause before starting next phrase
      }

      setTimeout(typeWriter, typingSpeed);
    }

    // Start effect after a small delay
    setTimeout(typeWriter, 1200);
  }
});

// Manejo de la caché de retroceso (bfcache) para evitar pantalla negra
window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
        document.body.style.opacity = '1';
        document.body.style.transform = 'none';
    }
});