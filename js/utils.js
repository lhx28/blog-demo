const Utils = {
  getTheme() {
    return localStorage.getItem('theme') || 'light';
  },

  setTheme(theme) {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  },

  getHue() {
    return parseInt(localStorage.getItem('hue')) || 0;
  },

  setHue(hue) {
    localStorage.setItem('hue', hue);
    document.documentElement.style.setProperty('--hue', hue);
  },

  getWallpaperMode() {
    return localStorage.getItem('wallpaperMode') || 'banner';
  },

  setWallpaperMode(mode) {
    localStorage.setItem('wallpaperMode', mode);
    document.body.classList.remove('enable-banner', 'wallpaper-fullscreen', 'no-banner-mode');
    
    switch (mode) {
      case 'banner':
        document.body.classList.add('enable-banner');
        break;
      case 'fullscreen':
        document.body.classList.add('wallpaper-fullscreen');
        break;
      case 'none':
        document.body.classList.add('no-banner-mode');
        break;
    }
    
    window.dispatchEvent(new CustomEvent('wallpaper-mode-change', { detail: mode }));
  },

  getLayoutMode() {
    return localStorage.getItem('layoutMode') || 'grid';
  },

  setLayoutMode(mode) {
    localStorage.setItem('layoutMode', mode);
    const container = document.getElementById('post-list-container');
    if (container) {
      container.classList.remove('grid-mode', 'list-mode');
      container.classList.add(mode === 'grid' ? 'grid-mode' : 'list-mode');
    }
  },

  toggleClass(element, className) {
    element.classList.toggle(className);
  },

  debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  },

  formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  },

  getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
  }
};
