(function() {
  function setupLayoutToggle() {
    const layoutBtn = document.getElementById('layout-btn');
    if (!layoutBtn) return;
    
    const gridIcon = layoutBtn.querySelector('.grid-icon');
    const listIcon = layoutBtn.querySelector('.list-icon');
    
    const currentMode = Utils.getLayoutMode();
    updateLayoutIcons(currentMode, gridIcon, listIcon);
    
    layoutBtn.addEventListener('click', function() {
      const currentMode = Utils.getLayoutMode();
      const newMode = currentMode === 'grid' ? 'list' : 'grid';
      
      Utils.setLayoutMode(newMode);
      updateLayoutIcons(newMode, gridIcon, listIcon);
    });
  }

  function updateLayoutIcons(mode, gridIcon, listIcon) {
    if (!gridIcon || !listIcon) return;
    
    if (mode === 'grid') {
      gridIcon.style.display = 'block';
      listIcon.style.display = 'none';
    } else {
      gridIcon.style.display = 'none';
      listIcon.style.display = 'block';
    }
  }

  function initLayout() {
    const container = document.getElementById('post-list-container');
    if (!container) return;
    
    const mode = Utils.getLayoutMode();
    container.classList.remove('grid-mode', 'list-mode');
    container.classList.add(mode === 'grid' ? 'grid-mode' : 'list-mode');
  }

  document.addEventListener('DOMContentLoaded', function() {
    initLayout();
    setupLayoutToggle();
  });
})();
