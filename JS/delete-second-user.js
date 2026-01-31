// Script to delete the 2nd user from the database
// Run this in the browser console or include it in the page

async function deleteSecondUser() {
  const API_URL = 'http://localhost:3001/api';
  
  try {
    // Fetch all users
    const response = await fetch(`${API_URL}/users`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch users from API');
    }
    
    const users = await response.json();
    
    if (users.length < 2) {
      alert('There are less than 2 users in the database. Cannot delete the 2nd user.');
      return;
    }
    
    // Get the 2nd user (index 1)
    const secondUser = users[1];
    
    if (!confirm(`Are you sure you want to delete the 2nd user: "${secondUser.name}" (ID: ${secondUser.id}, Email: ${secondUser.email})?`)) {
      return;
    }
    
    // Delete the user
    const deleteResponse = await fetch(`${API_URL}/users/${secondUser.id}`, {
      method: 'DELETE'
    });

    if (!deleteResponse.ok) {
      const error = await deleteResponse.json();
      throw new Error(error.error || 'Failed to delete user');
    }

    // Also remove from localStorage if it exists
    const localUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const filteredUsers = localUsers.filter(u => u.id !== secondUser.id);
    localStorage.setItem('users', JSON.stringify(filteredUsers));

    alert(`User "${secondUser.name}" (ID: ${secondUser.id}) has been deleted successfully!`);
    
    // Reload the page to refresh the table
    window.location.reload();
    
  } catch (error) {
    console.error('Error deleting 2nd user:', error);
    alert('Error deleting 2nd user: ' + error.message + '\n\nMake sure the backend server is running on http://localhost:3001');
  }
}

// Auto-run if this script is included in the page
if (typeof window !== 'undefined') {
  // Uncomment the line below to auto-delete when the script loads
  // deleteSecondUser();
  
  // Or make it available globally to call manually
  window.deleteSecondUser = deleteSecondUser;
  console.log('deleteSecondUser() function is now available. Call it to delete the 2nd user.');
}

