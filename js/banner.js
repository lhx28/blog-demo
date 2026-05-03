(function() {
  const BANNER_INTERVAL = 5000;
  let bannerInterval = null;
  let fullscreenInterval = null;

  function initBannerCarousel() {
    const carousel = document.getElementById('banner-carousel');
    if (!carousel) return;
    
    const items = carousel.querySelectorAll('.carousel-item');
    if (items.length <= 1) return;
    
    let currentIndex = 0;
    
    function showNext() {
      items[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % items.length;
      items[currentIndex].classList.add('active');
    }
    
    bannerInterval = setInterval(showNext, BANNER_INTERVAL);
  }

  function initFullscreenCarousel() {
    const fullscreenWallpaper = document.querySelector('.fullscreen-wallpaper');
    if (!fullscreenWallpaper) return;
    
    const desktopItems = fullscreenWallpaper.querySelectorAll('.desktop-wallpaper img');
    const mobileItems = fullscreenWallpaper.querySelectorAll('.mobile-wallpaper img');
    
    function startCarousel(items) {
      if (items.length <= 1) return;
      
      let currentIndex = 0;
      
      setInterval(() => {
        items[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.add('active');
      }, BANNER_INTERVAL);
    }
    
    if (desktopItems.length > 0) {
      startCarousel(desktopItems);
    }
    if (mobileItems.length > 0) {
      startCarousel(mobileItems);
    }
  }

  function updateBannerVisibility() {
    const mode = Utils.getWallpaperMode();
    const bannerWrapper = document.getElementById('banner-wrapper');
    const fullscreenWallpaper = document.querySelector('.fullscreen-wallpaper');
    
    switch (mode) {
      case 'banner':
        if (bannerWrapper) bannerWrapper.style.display = 'block';
        if (fullscreenWallpaper) fullscreenWallpaper.style.display = 'none';
        break;
      case 'fullscreen':
        if (bannerWrapper) bannerWrapper.style.display = 'block';
        if (fullscreenWallpaper) fullscreenWallpaper.style.display = 'none';
        break;
      case 'none':
        if (bannerWrapper) bannerWrapper.style.display = 'none';
        if (fullscreenWallpaper) fullscreenWallpaper.style.display = 'none';
        break;
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    updateBannerVisibility();
    initBannerCarousel();
    initFullscreenCarousel();
  });

  window.addEventListener('wallpaper-mode-change', function() {
    updateBannerVisibility();
  });
})();
