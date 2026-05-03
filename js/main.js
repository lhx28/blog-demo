(function() {
  function init() {
    console.log('Blog initialized');
  }

  function handleScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
      navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('scroll', Utils.debounce(handleScroll, 10));
})();
