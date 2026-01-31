// Delete user function
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
    
    if (users.length === 0) {
      const row = document.createElement('tr');
      row.innerHTML = '<td colspan="5" style="text-align: center; padding: 20px;">No users found</td>';
      tbody.appendChild(row);
      return;
    }
    
    // Populate table with users from API
    users.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name || ''}</td>
        <td><a href="mailto:${user.email}" style="color:#050505;">${user.email || ''}</a></td>
        <td><a href="tel:${user.contact_number ? user.contact_number.replace(/\D/g, '') : ''}" style="color:#050505;">${user.contact_number || ''}</a></td>
        <td>
          <button onclick="deleteUser(${user.id}, '${(user.name || '').replace(/'/g, "\\'")}')" 
                  style="background-color: #333; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">
            Delete
          </button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Error loading users from API:', error);
    console.log('Falling back to static content or localStorage');
    
    // Fallback to localStorage if API is not available
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.length > 0) {
      tbody.innerHTML = '';
      users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.name || ''}</td>
          <td><a href="mailto:${user.email}" style="color:#050505;">${user.email || ''}</a></td>
          <td><a href="tel:${user.contactNumber ? user.contactNumber.replace(/\D/g, '') : (user.contact_number ? user.contact_number.replace(/\D/g, '') : '')}" style="color:#050505;">${user.contactNumber || user.contact_number || ''}</a></td>
          <td>
            <button onclick="deleteUser(${user.id}, '${(user.name || '').replace(/'/g, "\\'")}')" 
                    style="background-color: #333; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">
              Delete
            </button>
          </td>
        `;
        tbody.appendChild(row);
      });
    } else {
      // Show static content if no localStorage data
      tbody.innerHTML = '';
      const staticUsers = [
        { id: 234567, name: 'John Doe', email: 'john.doe@gmail.com', contact: '704-654-3210' },
        { id: 287654, name: 'Emma Smith', email: 'emma.smith@gmail.com', contact: '404-654-3211' },
        { id: 215432, name: 'Michael Johnson', email: 'michael.j@gmail.com', contact: '336-654-3212' },
        { id: 298765, name: 'Sarah Wilson', email: 'sarah.w@gmail.com', contact: '980-654-3213' },
        { id: 223456, name: 'James Brown', email: 'james.b@gmail.com', contact: '864-654-3214' },
        { id: 276543, name: 'Lisa Anderson', email: 'lisa.a@gmail.com', contact: '704-654-3215' },
        { id: 245678, name: 'Robert Taylor', email: 'robert.t@gmail.com', contact: '404-654-3216' },
        { id: 291234, name: 'Emily Davis', email: 'emily.d@gmail.com', contact: '336-654-3217' },
        { id: 267890, name: 'David Miller', email: 'david.m@gmail.com', contact: '980-654-3218' },
        { id: 254321, name: 'Jessica Lee', email: 'jessica.l@gmail.com', contact: '864-654-3219' }
      ];
      
      staticUsers.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td><a href="mailto:${user.email}" style="color:#050505;">${user.email}</a></td>
          <td><a href="tel:${user.contact.replace(/\D/g, '')}" style="color:#050505;">${user.contact}</a></td>
          <td><span style="color: #999; font-size: 12px;">Static data</span></td>
        `;
        tbody.appendChild(row);
      });
    }
  }
}

// Auto-load users when page loads
if (typeof window !== 'undefined' && document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadUsersFromAPI);
} else {
  loadUsersFromAPI();
}

