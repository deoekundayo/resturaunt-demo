// Delete user function
var REMOVED_USERS = [
  { id: '1', name: 'deo', email: 'ekundayo63@gmail.com' }
];

function isRemovedUser(user) {
  if (!user) return false;
  var id = String(user.id || '').trim();
  var name = String(user.name || '').trim().toLowerCase();
  var email = String(user.email || '').trim().toLowerCase();
  return REMOVED_USERS.some(function(r) {
    return (r.id && id === r.id) ||
      (r.name && name === r.name) ||
      (r.email && email === r.email);
  });
}

async function deleteUser(userId, userName) {
  if (!confirm(`Are you sure you want to delete user "${userName}" (ID: ${userId})?`)) {
    return;
  }

  const API_URL = 'http://localhost:3001/api';
  
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete user');
    }

    // Also remove from localStorage if it exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const filteredUsers = users.filter(u => u.id !== userId);
    localStorage.setItem('users', JSON.stringify(filteredUsers));

    // Reload the table
    loadUsersFromAPI();
    
    alert('User deleted successfully!');
  } catch (error) {
    console.error('Error deleting user:', error);
    alert('Error deleting user: ' + error.message + '\n\nMake sure the backend server is running on http://localhost:3001');
    
    // Fallback: remove from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const filteredUsers = users.filter(u => u.id !== userId);
    localStorage.setItem('users', JSON.stringify(filteredUsers));
    loadUsersFromAPI();
  }
}

function renderUsers(tbody, users) {
  tbody.innerHTML = '';
  users.forEach(function(user) {
    if (isRemovedUser(user)) return;
    var id = String(user.id || '');
    var name = user.name || '';
    var email = user.email || '';
    var contact = user.contact || user.contactNumber || user.contact_number || '';
    var row = document.createElement('tr');
    row.innerHTML =
      '<td>' + id + '</td>' +
      '<td>' + name + '</td>' +
      '<td><a href="mailto:' + email + '" style="color:#050505;">' + email + '</a></td>' +
      '<td><a href="tel:' + String(contact).replace(/\D/g, '') + '" style="color:#050505;">' + contact + '</a></td>';
    tbody.appendChild(row);
  });
}

function mergeUsersById() {
  var staticUsers = window.USERS_LIST || [];
  var localUsers = JSON.parse(localStorage.getItem('users') || '[]').filter(function(user) {
    return !isRemovedUser(user);
  });
  localStorage.setItem('users', JSON.stringify(localUsers));
  var merged = new Map();

  staticUsers.forEach(function(user) {
    if (!user || !user.id || isRemovedUser(user)) return;
    merged.set(String(user.id), user);
  });

  localUsers.forEach(function(user) {
    if (!user || !user.id || isRemovedUser(user)) return;
    merged.set(String(user.id), { ...merged.get(String(user.id)), ...user });
  });

  return Array.from(merged.values());
}

// Load users from API and populate the table
async function loadUsersFromAPI() {
  const API_URL = 'http://localhost:3001/api';
  const tbody = document.querySelector('table tbody');
  
  if (!tbody) {
    console.error('Table body not found');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/users`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch users from API');
    }
    
    const users = await response.json();
    
    // Clear existing rows (except header)
    tbody.innerHTML = '';
    
    // Always include built-in/static users so table is never empty,
    // then let API users overwrite by id where available.
    const merged = new Map();
    mergeUsersById().forEach(function(user) {
      merged.set(String(user.id), user);
    });
    users.forEach(function(user) {
      if (!user || !user.id || isRemovedUser(user)) return;
      merged.set(String(user.id), {
        ...merged.get(String(user.id)),
        ...user
      });
    });
    renderUsers(tbody, Array.from(merged.values()));
  } catch (error) {
    console.error('Error loading users from API:', error);
    console.log('Falling back to static content or localStorage');
    renderUsers(tbody, mergeUsersById());
  }
}

// Auto-load users when page loads
if (typeof window !== 'undefined' && document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadUsersFromAPI);
} else {
  loadUsersFromAPI();
}

