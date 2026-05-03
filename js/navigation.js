(function() {
  function setupDropdowns() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    dropdowns.forEach(dropdown => {
      const trigger = dropdown.querySelector('.dropdown-trigger');
      if (!trigger) return;
      
      trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const isOpen = dropdown.classList.contains('open');
        
        dropdowns.forEach(d => d.classList.remove('open'));
        
        if (!isOpen) {
          dropdown.classList.add('open');
        }
      });
    });
    
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nav-dropdown')) {
        dropdowns.forEach(d => d.classList.remove('open'));
      }
    });
  }

  function setupSearch() {
    const searchBtn = document.getElementById('search-btn');
    const searchPanel = document.getElementById('search-panel');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchBtn || !searchPanel) return;
    
    searchBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      searchPanel.classList.toggle('hidden');
      
      if (!searchPanel.classList.contains('hidden') && searchInput) {
        searchInput.focus();
      }
    });
    
    if (searchInput) {
      searchInput.addEventListener('input', Utils.debounce(function() {
        const query = this.value.trim();
        if (query.length > 0) {
          performSearch(query, searchResults);
        } else {
          if (searchResults) searchResults.innerHTML = '';
        }
      }, 300));
    }
    
    document.addEventListener('click', function(e) {
      if (!searchPanel.contains(e.target) && e.target !== searchBtn) {
        searchPanel.classList.add('hidden');
      }
    });
  }

  function performSearch(query, resultsContainer) {
    const posts = document.querySelectorAll('.post-card');
    const results = [];
    
    posts.forEach(post => {
      const title = post.querySelector('.post-title');
      const excerpt = post.querySelector('.post-excerpt');
      
      if (title && title.textContent.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          title: title.textContent,
          link: title.href || title.parentElement.href,
          type: 'title'
        });
      } else if (excerpt && excerpt.textContent.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          title: title?.textContent || 'Unknown',
          link: title?.href || title?.parentElement?.href || '#',
          type: 'content'
        });
      }
    });
    
    if (resultsContainer) {
      if (results.length === 0) {
        resultsContainer.innerHTML = '<p style="padding: 1rem; color: var(--text-muted); text-align: center;">没有找到结果</p>';
      } else {
        resultsContainer.innerHTML = results.map(r => `
          <a href="${r.link}" class="dropdown-item">
            <span style="font-weight: ${r.type === 'title' ? 'bold' : 'normal'}">${r.title}</span>
          </a>
        `).join('');
      }
    }
  }

  function setupMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!menuBtn || !mobileMenu) return;
    
    menuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
    });
    
    const dropdownTriggers = mobileMenu.querySelectorAll('.mobile-dropdown-trigger');
    dropdownTriggers.forEach(trigger => {
      trigger.addEventListener('click', function() {
        const submenu = this.nextElementSibling;
        if (submenu) {
          submenu.classList.toggle('hidden');
        }
      });
    });
    
    document.addEventListener('click', function(e) {
      if (!mobileMenu.contains(e.target) && e.target !== menuBtn) {
        mobileMenu.classList.add('hidden');
      }
    });
  }

  function setupWallpaperPanel() {
    const wallpaperBtn = document.getElementById('wallpaper-btn');
    const wallpaperPanel = document.getElementById('wallpaper-panel');
    
    if (!wallpaperBtn || !wallpaperPanel) return;
    
    wallpaperBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      wallpaperPanel.classList.toggle('hidden');
    });
    
    const options = wallpaperPanel.querySelectorAll('.wallpaper-option');
    options.forEach(option => {
      option.addEventListener('click', function() {
        const mode = this.dataset.mode;
        Utils.setWallpaperMode(mode);
        
        options.forEach(o => o.classList.remove('active'));
        this.classList.add('active');
        
        wallpaperPanel.classList.add('hidden');
      });
    });
    
    const currentMode = Utils.getWallpaperMode();
    options.forEach(option => {
      option.classList.remove('active');
      if (option.dataset.mode === currentMode) {
        option.classList.add('active');
      }
    });
    
    document.addEventListener('click', function(e) {
      if (!wallpaperPanel.contains(e.target) && e.target !== wallpaperBtn) {
        wallpaperPanel.classList.add('hidden');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    setupDropdowns();
    setupSearch();
    setupMobileMenu();
    setupWallpaperPanel();
  });
})();
