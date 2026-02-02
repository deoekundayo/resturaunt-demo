/**
 * Deterministic order data for id 1..TOTAL_ORDERS.
 * Same id always returns the same order so the orders table and order form stay in sync.
 */
(function() {
  var AVG_ORDER_VALUE = 22.40;
  var TOTAL_ORDERS = 1284;
  var STATUSES = ['Delivered', 'Delivered', 'Delivered', 'Processing', 'Pending', 'Shipped'];

  function pad(n, len) {
    return String(n).padStart(len, '0');
  }

  /** Simple deterministic "random" from seed (returns 0..1) */
  function seeded(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  /**
   * Get order data for the given id (1-based). Same id always returns same data.
   * @param {number} id - Order number 1..1284
   * @returns {{ orderId: string, dateStr: string, status: string, qty: number, value: number, valueFormatted: string, clientId: string }|null}
   */
  function getOrderById(id) {
    id = parseInt(id, 10);
    if (id < 1 || id > TOTAL_ORDERS) return null;
    var s = seeded(id);
    var s2 = seeded(id * 7919);
    var s3 = seeded(id * 2654435761);
    var value = AVG_ORDER_VALUE + (s - 0.5) * 12;
    value = Math.round(value * 100) / 100;
    var date = new Date();
    date.setDate(date.getDate() - Math.floor(s2 * 30));
    var dateStr = date.toISOString().slice(0, 10);
    var status = STATUSES[Math.floor(s3 * STATUSES.length)];
    var qty = 1 + Math.floor(s * 8);
    if (qty > 8) qty = 8;
    var orderId = 'ORD' + pad(id, 4);
    var users = window.USERS_LIST || [];
    var clientId = users.length
      ? String(users[Math.floor(seeded(id * 12345) * users.length)].id)
      : pad(200000 + Math.floor(seeded(id * 12345) * 200000), 6);
    var orderContent = getOrderContent(id, qty);
    var selectedItemNumbers = getOrderSelectedItemNumbers(id, qty);
    return {
      orderId: orderId,
      dateStr: dateStr,
      status: status,
      qty: qty,
      value: value,
      valueFormatted: '$' + value.toFixed(2),
      clientId: clientId,
      orderContent: orderContent,
      selectedItemNumbers: selectedItemNumbers
    };
  }

  /**
   * Build order content string: the food item(s) for this order (deterministic by id and qty).
   * Uses FOOD_ITEMS_BASE if available; otherwise fallback text.
   */
  function getOrderContent(id, qty) {
    var base = window.FOOD_ITEMS_BASE;
    if (!base || !base.length) return 'Food items (see menu)';
    var numItems = Math.min(Math.max(1, qty), 5);
    var names = [];
    for (var i = 0; i < numItems; i++) {
      var idx = (id - 1 + i * 17) % base.length;
      var name = base[idx] && base[idx].name ? base[idx].name : '';
      if (name && names.indexOf(name) === -1) names.push(name);
    }
    if (names.length === 0) names.push(base[(id - 1) % base.length].name);
    return names.join(', ');
  }

  /**
   * Return 1-based food item numbers in this order (for pre-checking checkboxes).
   * Matches getOrderContent logic; uses FOOD_ITEMS_BASE length.
   */
  function getOrderSelectedItemNumbers(id, qty) {
    var base = window.FOOD_ITEMS_BASE;
    if (!base || !base.length) return [];
    var len = base.length;
    var numItems = Math.min(Math.max(1, qty), 5);
    var numbers = [];
    for (var i = 0; i < numItems; i++) {
      var idx = (id - 1 + i * 17) % len;
      var num = idx + 1;
      if (numbers.indexOf(num) === -1) numbers.push(num);
    }
    if (numbers.length === 0) numbers.push((id - 1) % len + 1);
    return numbers;
  }

  window.getOrderById = getOrderById;
  window.ORDERS_TOTAL = TOTAL_ORDERS;
})();
