/**
 * Table search: filter rows by the text in one or more columns.
 * Use with: <input class="table-search-input" data-search-tbody="tbody-id" data-search-col="1">
 * Or multiple columns: data-search-col="1,2,7" (comma-separated, 0-based). Row shown if search matches any column.
 */
(function() {
  function parseCols(str) {
    if (!str) return [];
    var parts = str.split(',');
    var cols = [];
    for (var i = 0; i < parts.length; i++) {
      var n = parseInt(parts[i].trim(), 10);
      if (!isNaN(n)) cols.push(n);
    }
    return cols;
  }

  function runSearch(input) {
    var tbodyId = input.getAttribute('data-search-tbody');
    var colStr = input.getAttribute('data-search-col');
    var cols = parseCols(colStr);
    if (!tbodyId || cols.length === 0) return;
    var tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    var q = (input.value || '').trim().toLowerCase();
    var rows = tbody.querySelectorAll('tr');
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var match = false;
      for (var c = 0; c < cols.length; c++) {
        var cell = row.cells[cols[c]];
        var text = cell ? (cell.textContent || '').trim().toLowerCase() : '';
        if (text.indexOf(q) !== -1) { match = true; break; }
      }
      row.style.display = match ? '' : 'none';
    }
  }

  function init() {
    var inputs = document.querySelectorAll('.table-search-input[data-search-tbody][data-search-col]');
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      input.addEventListener('input', function() { runSearch(this); });
      input.addEventListener('keyup', function() { runSearch(this); });
      runSearch(input);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
