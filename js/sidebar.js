(function() {
  const SITE_START_DATE = '2026-05-02';
  const LAST_POST_DATE = '2026-05-02T00:00:00.000Z';

  function updateStats() {
    const today = new Date();
    
    const startDate = new Date(SITE_START_DATE);
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const runningDaysElement = document.querySelector('[id="running-days"]');
    if (runningDaysElement) {
      runningDaysElement.textContent = diffDays.toString();
    }
    
    if (LAST_POST_DATE) {
      const lastPost = new Date(LAST_POST_DATE);
      const timeSinceLastPost = Math.abs(today.getTime() - lastPost.getTime());
      const daysSinceLastUpdate = Math.floor(timeSinceLastPost / (1000 * 60 * 60 * 24));
      
      const lastUpdateElement = document.querySelector('[id="last-update"]');
      if (lastUpdateElement) {
        lastUpdateElement.textContent = daysSinceLastUpdate.toString();
      }
    }
  }

  function setupBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', Utils.debounce(function() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.remove('hidden');
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
        backToTopBtn.classList.add('hidden');
      }
    }, 100));
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function updateCopyrightYear() {
    const yearElement = document.getElementById('copyright-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear().toString();
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    setupBackToTop();
    updateCopyrightYear();
    
    setInterval(updateStats, 60 * 60 * 1000);
  });
})();
