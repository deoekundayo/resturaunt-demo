/**
 * Orders page: combine status filter with text search.
 * Rows are shown only if they match both the selected status and the search text.
 */
(function() {
  var STATUS_COL = 3;
  var SEARCH_COLS = [1, 2, 7];

  function runFilters() {
    var tbody = document.getElementById('orders-tbody');
    var searchInput = document.getElementById('table-search');
    var statusSelect = document.getElementById('orders-status-filter');
    if (!tbody || !searchInput || !statusSelect) return;

    var statusVal = (statusSelect.value || '').trim();
    var q = (searchInput.value || '').trim().toLowerCase();
    var rows = tbody.querySelectorAll('tr');

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var statusCell = row.cells[STATUS_COL];
      var rowStatus = statusCell ? (statusCell.textContent || '').trim() : '';
      var statusMatch = statusVal === '' || rowStatus === statusVal;

      var searchMatch = true;
      if (q) {
        searchMatch = false;
        for (var c = 0; c < SEARCH_COLS.length; c++) {
          var cell = row.cells[SEARCH_COLS[c]];
          var text = cell ? (cell.textContent || '').trim().toLowerCase() : '';
          if (text.indexOf(q) !== -1) {
            searchMatch = true;
            break;
          }
        }
      }

      row.style.display = statusMatch && searchMatch ? '' : 'none';
    }
  }

  function init() {
    var statusSelect = document.getElementById('orders-status-filter');
    var searchInput = document.getElementById('table-search');
    if (!statusSelect || !searchInput) return;

    statusSelect.addEventListener('change', runFilters);
    searchInput.addEventListener('input', runFilters);
    searchInput.addEventListener('keyup', runFilters);
    runFilters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
