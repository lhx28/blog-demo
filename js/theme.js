(function() {
  const DEFAULT_THEME = 'light';
  const LIGHT_MODE = 'light';
  const DARK_MODE = 'dark';
  const configHue = 0;

  function initTheme() {
    const theme = localStorage.getItem('theme') || DEFAULT_THEME;
    
    if (theme === DARK_MODE) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    const hue = localStorage.getItem('hue') || configHue;
    document.documentElement.style.setProperty('--hue', hue);
  }

  function setupThemeToggle() {
    const themeBtn = document.getElementById('theme-btn');
    if (!themeBtn) return;

    themeBtn.addEventListener('click', function() {
      const isDark = document.documentElement.classList.contains('dark');
      const newTheme = isDark ? LIGHT_MODE : DARK_MODE;
      
      Utils.setTheme(newTheme);
      updateThemeIcons(newTheme);
    });
    
    const currentTheme = Utils.getTheme();
    updateThemeIcons(currentTheme);
  }

  function updateThemeIcons(theme) {
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    if (!sunIcon || !moonIcon) return;
    
    if (theme === 'dark') {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    } else {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }
  }

  function setupHueSlider() {
    const hueBtn = document.getElementById('hue-btn');
    const huePanel = document.getElementById('hue-panel');
    const hueSlider = document.getElementById('hue-slider');
    const hueValue = document.getElementById('hue-value');
    
    if (!hueBtn || !huePanel || !hueSlider) return;
    
    const currentHue = Utils.getHue();
    hueSlider.value = currentHue;
    hueValue.textContent = currentHue;
    
    hueBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      huePanel.classList.toggle('hidden');
      closeOtherPanels('hue');
    });
    
    hueSlider.addEventListener('input', function() {
      const hue = parseInt(this.value);
      Utils.setHue(hue);
      hueValue.textContent = hue;
    });
    
    document.addEventListener('click', function(e) {
      if (!huePanel.contains(e.target) && e.target !== hueBtn) {
        huePanel.classList.add('hidden');
      }
    });
  }

  function closeOtherPanels(activePanel) {
    const panels = {
      'search': document.getElementById('search-panel'),
      'wallpaper': document.getElementById('wallpaper-panel'),
      'hue': document.getElementById('hue-panel'),
      'mobile': document.getElementById('mobile-menu')
    };
    
    Object.entries(panels).forEach(([key, panel]) => {
      if (key !== activePanel && panel) {
        panel.classList.add('hidden');
      }
    });
  }

  initTheme();
  
  document.addEventListener('DOMContentLoaded', function() {
    setupThemeToggle();
    setupHueSlider();
  });
})();
