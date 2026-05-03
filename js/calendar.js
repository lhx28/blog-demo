(function() {
  const POST_DATE_MAP = {
    '2025-01-20': [{ id: 'markdown-tutorial', title: 'Markdown 基础教程' }],
    '2024-01-15': [{ id: 'encrypted-post', title: 'Encrypted Post' }],
    '2024-05-01': [{ id: 'markdown-extended', title: 'Markdown Extended Features' }],
    '2024-04-01': [{ id: 'guide', title: 'Simple Guides for Mizuki' }],
    '2023-10-01': [{ id: 'markdown-mermaid', title: 'Markdown Mermaid' }],
    '2022-08-01': [{ id: 'video', title: 'Include Video in the Posts' }]
  };

  const MONTH_NAMES = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  function renderCalendar() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDate = now.getDate();
    
    const titleElement = document.getElementById('calendar-title');
    if (titleElement) {
      titleElement.textContent = `${currentYear}年${MONTH_NAMES[currentMonth]}`;
    }
    
    const firstDay = Utils.getFirstDayOfMonth(currentYear, currentMonth);
    const daysInMonth = Utils.getDaysInMonth(currentYear, currentMonth);
    
    const calendarGrid = document.getElementById('calendar-grid');
    if (!calendarGrid) return;
    
    let html = '';
    
    for (let i = 0; i < firstDay; i++) {
      html += '<div class="calendar-day empty"></div>';
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasPost = POST_DATE_MAP[dateKey] !== undefined;
      const isToday = day === currentDate;
      
      let classes = 'calendar-day';
      if (isToday) classes += ' today';
      if (hasPost) classes += ' has-post';
      
      html += `<div class="${classes}" data-date="${dateKey}" data-has-post="${hasPost}">${day}</div>`;
    }
    
    calendarGrid.innerHTML = html;
    
    setupCalendarClicks();
  }

  function setupCalendarClicks() {
    const calendarDays = document.querySelectorAll('.calendar-day[data-date]');
    
    calendarDays.forEach(dayElement => {
      dayElement.addEventListener('click', function() {
        const dateKey = this.dataset.date;
        const hasPost = this.dataset.hasPost === 'true';
        
        if (!hasPost || !dateKey) return;
        
        const posts = POST_DATE_MAP[dateKey] || [];
        if (posts.length > 0) {
          console.log('Posts on', dateKey, ':', posts);
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    renderCalendar();
    
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    
    setTimeout(() => {
      renderCalendar();
      setInterval(renderCalendar, 24 * 60 * 60 * 1000);
    }, msUntilMidnight);
  });
})();
