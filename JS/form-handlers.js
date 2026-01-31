// Form handlers for different entity types

// API base URL for backend (same port as users API)
const FOOD_API_URL = 'http://localhost:3001/api';

// Food Item Form Handler – saves to database via API, fallback to localStorage
function handleFoodItemForm() {
  const form = document.getElementById('survey-form');
  if (!form) return;

  const id = getUrlParameter('id');
  const isEdit = id !== null;

  // Load data if editing (try API first, then localStorage)
  function populateForm(item) {
    if (!item) return;
    document.getElementById('name').value = item.name;
    document.getElementById('description').value = item.description || '';
    document.getElementById('image-url').value = item.imageUrl || item.image_url || '';
    document.getElementById('category').value = item.category;
    document.getElementById('cuisine').value = item.cuisine;
    document.getElementById(`availability-${item.available ? 'yes' : 'no'}`).checked = true;
    document.getElementById(`veg-${item.vegetarian ? 'yes' : 'no'}`).checked = true;
    document.querySelector('h1').textContent = 'Edit Food Item';
  }

  // Edit mode: use FOOD_ITEMS_BASE for all items 1–98 (same source and save path for every id)
  if (isEdit) {
    const numId = parseInt(id, 10);
    const BASE = window.FOOD_ITEMS_BASE || [];
    const availableCount = window.FOOD_ITEMS_AVAILABLE_COUNT != null ? window.FOOD_ITEMS_AVAILABLE_COUNT : 86;
    const baseItem = BASE[numId - 1];
    if (baseItem) {
      populateForm({
        name: baseItem.name,
        description: baseItem.desc || '',
        imageUrl: baseItem.img || baseItem.image_url || '',
        image_url: baseItem.img || baseItem.image_url || '',
        category: baseItem.cat || '',
        cuisine: baseItem.cuisine || '',
        available: numId <= availableCount,
        vegetarian: baseItem.veg === 'Yes'
      });
    }
  }

  // Populate category and cuisine dropdowns from FOOD_ITEMS_BASE (single source of truth), fallback to localStorage
  const BASE = window.FOOD_ITEMS_BASE || [];
  let categoryList = [];
  let cuisineList = [];

  if (BASE.length > 0) {
    const catSet = new Set();
    const cuisineSet = new Set();
    BASE.forEach(item => {
      if (item.cat && String(item.cat).trim()) catSet.add(String(item.cat).trim());
      if (item.cuisine && String(item.cuisine).trim()) cuisineSet.add(String(item.cuisine).trim());
    });
    categoryList = Array.from(catSet).sort();
    cuisineList = Array.from(cuisineSet).sort();
  }

  if (categoryList.length === 0) {
    const fromStorage = JSON.parse(localStorage.getItem('categories') || '[]');
    categoryList = fromStorage.map(c => c.name).filter(Boolean).sort();
  }
  if (cuisineList.length === 0) {
    const fromStorage = JSON.parse(localStorage.getItem('cuisines') || '[]');
    cuisineList = fromStorage.map(c => c.name).filter(Boolean).sort();
  }

  const categorySelect = document.getElementById('category');
  const cuisineSelect = document.getElementById('cuisine');

  if (categorySelect && categorySelect.tagName === 'SELECT') {
    while (categorySelect.options.length > 1) categorySelect.remove(1);
    categoryList.forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      categorySelect.appendChild(option);
    });
  }

  if (cuisineSelect && cuisineSelect.tagName === 'SELECT') {
    while (cuisineSelect.options.length > 1) cuisineSelect.remove(1);
    cuisineList.forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      cuisineSelect.appendChild(option);
    });
  }

  // Re-apply category/cuisine in edit mode after dropdowns are built (so selection is preserved)
  if (isEdit && id) {
    const editItem = (window.FOOD_ITEMS_BASE || [])[parseInt(id, 10) - 1];
    if (editItem) {
      if (editItem.cat && categorySelect) categorySelect.value = editItem.cat;
      if (editItem.cuisine && cuisineSelect) cuisineSelect.value = editItem.cuisine;
    }
  }

  // Handle form submission – save to database (API), fallback to localStorage
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value.trim(),
      description: document.getElementById('description').value.trim(),
      imageUrl: document.getElementById('image-url').value.trim(),
      category: document.getElementById('category').value,
      cuisine: document.getElementById('cuisine').value,
      available: document.getElementById('availability-yes').checked,
      vegetarian: document.getElementById('veg-yes').checked,
      price: '$0.00'
    };

    try {
      let response;
      if (isEdit) {
        response = await fetch(`${FOOD_API_URL}/food-items/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        response = await fetch(`${FOOD_API_URL}/food-items`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save food item');
      }

      const savedItem = result.foodItem || result;
      const savedId = savedItem ? savedItem.id : id;

      // Keep localStorage in sync for list page / dropdowns if needed
      const foodItems = JSON.parse(localStorage.getItem('foodItems') || '[]');
      const payload = {
        id: savedId,
        ...formData,
        imageUrl: formData.imageUrl
      };
      if (isEdit) {
        const index = foodItems.findIndex(f => f.id === parseInt(id));
        if (index !== -1) foodItems[index] = payload;
        else foodItems.push(payload);
      } else {
        foodItems.push(payload);
      }
      localStorage.setItem('foodItems', JSON.stringify(foodItems));

      showSuccessMessage('Food item saved successfully!', 'list_fooditems.html');
    } catch (error) {
      console.error('Error saving food item:', error);
      alert('Error saving to database: ' + error.message + '\n\nMake sure the backend is running at http://localhost:3001. Saving to local storage instead.');

      const foodItems = JSON.parse(localStorage.getItem('foodItems') || '[]');
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
      showSuccessMessage('Food item saved to local storage (backend unavailable).', 'list_fooditems.html');
    }
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
  const API_URL = 'http://localhost:3001/api';

  // Format phone number
  const phoneInput = document.getElementById('contact-number');
  if (phoneInput) {
    formatPhoneNumber(phoneInput);
  }

  // Load user data if editing
  if (isEdit) {
    fetch(`${API_URL}/users/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load user data');
        }
        return response.json();
      })
      .then(user => {
        document.getElementById('name').value = user.name || '';
        document.getElementById('email').value = user.email || '';
        document.getElementById('contact-number').value = user.contact_number || '';
        document.querySelector('h1').textContent = 'Edit User';
      })
      .catch(error => {
        console.error('Error loading user:', error);
        // Fallback to localStorage if API fails
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.id === parseInt(id));
        
        if (user) {
          document.getElementById('name').value = user.name;
          document.getElementById('email').value = user.email || '';
          document.getElementById('contact-number').value = user.contactNumber || user.contact_number || '';
          document.querySelector('h1').textContent = 'Edit User';
        }
      });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      contact_number: document.getElementById('contact-number').value.trim(),
      password: document.getElementById('password').value
    };

    // Validation
    if (!formData.name || !formData.email || !formData.contact_number) {
      alert('Please fill in all required fields: Name, Email, and Contact Number');
      return;
    }

    if (!isEdit && !formData.password) {
      alert('Password is required for new users');
      return;
    }

    try {
      let response;
      if (isEdit) {
        // Update existing user
        const updateData = { ...formData };
        // Only include password if it's provided (not empty)
        if (!updateData.password || updateData.password.trim() === '') {
          delete updateData.password;
        }
        
        response = await fetch(`${API_URL}/users/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData)
        });
      } else {
        // Create new user
        if (!formData.password || formData.password.trim() === '') {
          alert('Password is required');
          return;
        }
        
        response = await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save user');
      }

      // Also save to localStorage as backup
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (isEdit) {
        const index = users.findIndex(u => u.id === parseInt(id));
        if (index !== -1) {
          users[index] = { 
            id: parseInt(id),
            name: formData.name,
            email: formData.email,
            contactNumber: formData.contact_number
          };
        }
      } else {
        const newId = result.user ? result.user.id : (users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1);
        users.push({ 
          id: newId,
          name: formData.name,
          email: formData.email,
          contactNumber: formData.contact_number
        });
      }
      localStorage.setItem('users', JSON.stringify(users));

      showSuccessMessage('User saved successfully!', 'users.html');
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Error saving user: ' + error.message + '\n\nMake sure the backend server is running on http://localhost:3001');
      
      // Fallback to localStorage only
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const formDataLocal = {
        name: formData.name,
        email: formData.email,
        contactNumber: formData.contact_number
      };

      if (isEdit) {
        const index = users.findIndex(u => u.id === parseInt(id));
        if (index !== -1) {
          users[index] = { ...users[index], ...formDataLocal };
        }
      } else {
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        users.push({ id: newId, ...formDataLocal });
      }

      localStorage.setItem('users', JSON.stringify(users));
      showSuccessMessage('User saved to local storage (backend unavailable)!', 'users.html');
    }
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

