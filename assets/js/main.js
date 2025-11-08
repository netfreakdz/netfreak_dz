(function() {
  const YEAR = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = YEAR;

  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');

  const applyTheme = (theme) => {
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  };

  const saved = localStorage.getItem('theme');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(saved || (prefersLight ? 'light' : 'dark'));

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isLight = root.classList.toggle('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      toggle.textContent = isLight ? '🌞' : '🌙';
    });
    // Set icon on load
    toggle.textContent = root.classList.contains('light') ? '🌞' : '🌙';
  }

  // Typewriter effect
  const typeTarget = document.getElementById('typewriter');
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typeTarget) {
    const phrases = [
      'Building sleek web experiences',
      'Crafting performant UIs',
      'Automating developer workflows',
      'Open-source + coffee ☕'
    ];

    let p = 0;
    let i = 0;
    let deleting = false;

    const type = () => {
      const current = phrases[p % phrases.length];
      if (!deleting) {
        i++;
        typeTarget.textContent = current.slice(0, i);
        if (i === current.length) {
          deleting = true;
          setTimeout(type, prefersReduced ? 600 : 1200);
          return;
        }
      } else {
        i--;
        typeTarget.textContent = current.slice(0, i);
        if (i === 0) {
          deleting = false;
          p++;
        }
      }
      const speed = prefersReduced ? 80 : (deleting ? 40 : 70);
      setTimeout(type, speed);
    };

    // Kick off typing after a small delay to avoid layout jank
    setTimeout(type, prefersReduced ? 200 : 500);
  }
})();
