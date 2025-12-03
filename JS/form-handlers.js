// Form handlers for different entity types

// Food Item Form Handler
function handleFoodItemForm() {
  const form = document.getElementById('survey-form');
  if (!form) return;

  const id = getUrlParameter('id');
  const isEdit = id !== null;

  // Load data if editing
  if (isEdit) {
    const foodItems = JSON.parse(localStorage.getItem('foodItems') || '[]');
    const item = foodItems.find(f => f.id === parseInt(id));
    
    if (item) {
      document.getElementById('name').value = item.name;
      document.getElementById('description').value = item.description;
      document.getElementById('image-url').value = item.imageUrl || '';
      document.getElementById('category').value = item.category;
      document.getElementById('cuisine').value = item.cuisine;
      document.getElementById(`availability-${item.available ? 'yes' : 'no'}`).checked = true;
      document.getElementById(`veg-${item.vegetarian ? 'yes' : 'no'}`).checked = true;
      document.querySelector('h1').textContent = 'Edit Food Item';
    }
  }

  // Populate category and cuisine dropdowns
  const categories = JSON.parse(localStorage.getItem('categories') || '[]');
  const cuisines = JSON.parse(localStorage.getItem('cuisines') || '[]');
  
  const categorySelect = document.getElementById('category');
  const cuisineSelect = document.getElementById('cuisine');
  
  if (categorySelect && categorySelect.tagName === 'SELECT') {
    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.name;
      option.textContent = cat.name;
      categorySelect.appendChild(option);
    });
  }
  
  if (cuisineSelect && cuisineSelect.tagName === 'SELECT') {
    cuisines.forEach(cuisine => {
      const option = document.createElement('option');
      option.value = cuisine.name;
      option.textContent = cuisine.name;
      cuisineSelect.appendChild(option);
    });
  }

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const foodItems = JSON.parse(localStorage.getItem('foodItems') || '[]');
    const formData = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      imageUrl: document.getElementById('image-url').value,
      category: document.getElementById('category').value,
      cuisine: document.getElementById('cuisine').value,
      available: document.getElementById('availability-yes').checked,
      vegetarian: document.getElementById('veg-yes').checked,
      price: '$0.00' // Default price
    };

    if (isEdit) {
      const index = foodItems.findIndex(f => f.id === parseInt(id));
      if (index !== -1) {
        foodItems[index] = { ...foodItems[index], ...formData };
      }
    } else {
      const newId = foodItems.length > 0 ? Math.max(...foodItems.map(f => f.id)) + 1 : 1;
      foodItems.push({ id: newId, ...formData });
    }

    localStorage.setItem('foodItems', JSON.stringify(foodItems));
    showSuccessMessage('Food item saved successfully!', 'list_fooditems.html');
  });
}

// Category Form Handler
function handleCategoryForm() {
  const form = document.getElementById('survey-form');
  if (!form) return;

  const id = getUrlParameter('id');
  const isEdit = id !== null;

  if (isEdit) {
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const category = categories.find(c => c.id === parseInt(id));
    
    if (category) {
      document.getElementById('name').value = category.name;
      document.getElementById('description').value = category.description;
      document.getElementById('image-url').value = category.imageUrl || '';
      document.getElementById(category.active ? 'yes-active' : 'no-active').checked = true;
      document.querySelector('h1').textContent = 'Edit Food Category';
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const formData = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      imageUrl: document.getElementById('image-url').value,
      active: document.getElementById('yes-active').checked
    };

    if (isEdit) {
      const index = categories.findIndex(c => c.id === parseInt(id));
      if (index !== -1) {
        categories[index] = { ...categories[index], ...formData };
      }
    } else {
      const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
      categories.push({ id: newId, ...formData });
    }

    localStorage.setItem('categories', JSON.stringify(categories));
    showSuccessMessage('Category saved successfully!', 'list_categories.html');
  });
}

// Cuisine Form Handler
function handleCuisineForm() {
  const form = document.getElementById('survey-form');
  if (!form) return;

  const id = getUrlParameter('id');
  const isEdit = id !== null;

  if (isEdit) {
    const cuisines = JSON.parse(localStorage.getItem('cuisines') || '[]');
    const cuisine = cuisines.find(c => c.id === parseInt(id));
    
    if (cuisine) {
      document.getElementById('name').value = cuisine.name;
      document.getElementById('description').value = cuisine.description;
      document.getElementById('image-url').value = cuisine.imageUrl || '';
      document.getElementById(cuisine.active ? 'yes-active' : 'no-active').checked = true;
      document.querySelector('h1').textContent = 'Edit Cuisine';
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const cuisines = JSON.parse(localStorage.getItem('cuisines') || '[]');
    const formData = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      imageUrl: document.getElementById('image-url').value,
      active: document.querySelector('input[name="active"]:checked').value === 'yes-active'
    };

    if (isEdit) {
      const index = cuisines.findIndex(c => c.id === parseInt(id));
      if (index !== -1) {
        cuisines[index] = { ...cuisines[index], ...formData };
      }
    } else {
      const newId = cuisines.length > 0 ? Math.max(...cuisines.map(c => c.id)) + 1 : 1;
      cuisines.push({ id: newId, ...formData });
    }

    localStorage.setItem('cuisines', JSON.stringify(cuisines));
    showSuccessMessage('Cuisine saved successfully!', 'list_cuisines.html');
  });
}

// Restaurant Form Handler
function handleRestaurantForm() {
  const form = document.getElementById('survey-form');
  if (!form) return;

  const id = getUrlParameter('id');
  const isEdit = id !== null;

  // Format phone number
  const phoneInput = document.getElementById('phone-number');
  if (phoneInput) {
    formatPhoneNumber(phoneInput);
  }

  if (isEdit) {
    const restaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    const restaurant = restaurants.find(r => r.id === parseInt(id));
    
    if (restaurant) {
      document.getElementById('name').value = restaurant.name;
      document.getElementById('address').value = restaurant.address;
      document.getElementById('image-url').value = restaurant.imageUrl || '';
      document.getElementById('phone-number').value = restaurant.phone;
      document.querySelector('h1').textContent = 'Edit Restaurant';
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const restaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    const formData = {
      name: document.getElementById('name').value,
      address: document.getElementById('address').value,
      imageUrl: document.getElementById('image-url').value,
      phone: document.getElementById('phone-number').value
    };

    if (isEdit) {
      const index = restaurants.findIndex(r => r.id === parseInt(id));
      if (index !== -1) {
        restaurants[index] = { ...restaurants[index], ...formData };
      }
    } else {
      const newId = restaurants.length > 0 ? Math.max(...restaurants.map(r => r.id)) + 1 : 1;
      restaurants.push({ id: newId, ...formData });
    }

    localStorage.setItem('restaurants', JSON.stringify(restaurants));
    showSuccessMessage('Restaurant saved successfully!', 'list_restaurants.html');
  });
}

// User Form Handler
function handleUserForm() {
  const form = document.getElementById('survey-form');
  if (!form) return;

  const id = getUrlParameter('id');
  const isEdit = id !== null;

  // Format phone number
  const phoneInput = document.getElementById('contact-number');
  if (phoneInput) {
    formatPhoneNumber(phoneInput);
  }

  if (isEdit) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.id === parseInt(id));
    
    if (user) {
      document.getElementById('name').value = user.name;
      document.getElementById('email').value = user.email || '';
      document.getElementById('contact-number').value = user.contactNumber || '';
      document.querySelector('h1').textContent = 'Edit User';
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      contactNumber: document.getElementById('contact-number').value
    };

    if (isEdit) {
      const index = users.findIndex(u => u.id === parseInt(id));
      if (index !== -1) {
        users[index] = { ...users[index], ...formData };
      }
    } else {
      const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      users.push({ id: newId, ...formData });
    }

    localStorage.setItem('users', JSON.stringify(users));
    showSuccessMessage('User saved successfully!', 'users.html');
  });
}

// Order Form Handler
function handleOrderForm() {
  const form = document.getElementById('survey-form');
  if (!form) return;

  const id = getUrlParameter('id');
  const isEdit = id !== null;

  if (isEdit) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id === parseInt(id));
    
    if (order) {
      document.getElementById('order-id').value = order.orderId;
      document.getElementById('order-content').value = order.content;
      document.getElementById('date').value = order.date;
      document.getElementById('order-status').value = order.status;
      document.getElementById('quantity').value = order.quantity;
      document.querySelector('h1').textContent = 'View/Edit Order';
    }
  } else {
    // For new orders, set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const formData = {
      orderId: document.getElementById('order-id').value,
      content: document.getElementById('order-content').value,
      date: document.getElementById('date').value,
      status: document.getElementById('order-status').value,
      quantity: parseInt(document.getElementById('quantity').value) || 0,
      userId: isEdit ? (orders.find(o => o.id === parseInt(id))?.userId || '') : ''
    };

    if (isEdit) {
      const index = orders.findIndex(o => o.id === parseInt(id));
      if (index !== -1) {
        orders[index] = { ...orders[index], ...formData };
      }
    } else {
      const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
      orders.push({ id: newId, ...formData });
    }

    localStorage.setItem('orders', JSON.stringify(orders));
    showSuccessMessage('Order saved successfully!', 'orders.html');
  });
}

