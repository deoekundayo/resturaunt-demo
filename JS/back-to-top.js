/**
 * Back to top button for table pages.
 * Shows when the user has scrolled past 10 table rows; scrolls to top on click.
 */
(function() {
  var ROW_THRESHOLD = 10;

  function init() {
    var container = document.querySelector('.table-container');
    if (!container) return;
    var table = container.querySelector('table');
    if (!table) return;
    var tbody = table.querySelector('tbody');
    if (!tbody) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'back-to-top-btn';
    btn.innerHTML = '&#8593;';
    btn.setAttribute('aria-label', 'Scroll back to top of page');
    btn.style.display = 'none';
    document.body.appendChild(btn);

    function updateVisibility() {
      var rows = tbody.querySelectorAll('tr');
      if (rows.length < ROW_THRESHOLD) {
        btn.style.display = 'none';
        return;
      }
      var tenthRow = rows[ROW_THRESHOLD - 1];
      var rect = tenthRow.getBoundingClientRect();
      if (rect.top < 0) {
        btn.style.display = 'block';
      } else {
        btn.style.display = 'none';
      }
    }

    window.addEventListener('scroll', updateVisibility, { passive: true });
    updateVisibility();

    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
