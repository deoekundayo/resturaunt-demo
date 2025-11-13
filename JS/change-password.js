// Change Password script
// This script handles password change form submission and validation

// Wait for the DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
  
  // Get references to form elements
  const changePasswordForm = document.getElementById('changePasswordForm');
  const userIdInput = document.getElementById('userId');
  const currentPasswordInput = document.getElementById('currentPassword');
  const newPasswordInput = document.getElementById('newPassword');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const messageElement = document.getElementById('message');
  
  // Registered User IDs from the users table
  const REGISTERED_USER_IDS = [
    '234567', '287654', '215432', '298765', '223456',
    '276543', '245678', '291234', '267890', '254321'
  ];
  
  // Default user credentials (same as in authentication.js)
  const DEFAULT_USER_CREDENTIALS = {
    '234567': '234567',
    '287654': '287654',
    '215432': '215432',
    '298765': '298765',
    '223456': '223456',
    '276543': '276543',
    '245678': '245678',
    '291234': '291234',
    '267890': '267890',
    '254321': '254321'
  };
  
  /**
   * Function to get current password for a user
   * Checks localStorage first, then defaults
   */
  function getCurrentPassword(userId) {
    // Load from localStorage
    try {
      const stored = localStorage.getItem('userCredentials');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed[userId]) {
          return parsed[userId];
        }
      }
    } catch (e) {
      console.error('Error loading stored credentials:', e);
    }
    
    // Return default password if not found in localStorage
    return DEFAULT_USER_CREDENTIALS[userId] || null;
  }
  
  /**
   * Function to save new password to localStorage
   */
  function savePassword(userId, newPassword) {
    try {
      // Load existing credentials
      let credentials = {};
      const stored = localStorage.getItem('userCredentials');
      if (stored) {
        credentials = JSON.parse(stored);
      }
      
      // Update password for this user
      credentials[userId] = newPassword;
      
      // Save back to localStorage
      localStorage.setItem('userCredentials', JSON.stringify(credentials));
      return true;
    } catch (e) {
      console.error('Error saving password:', e);
      return false;
    }
  }
  
  /**
   * Function to display message to the user
   */
  function showMessage(text, isError) {
    messageElement.textContent = text;
    messageElement.style.color = isError ? 'red' : 'green';
    messageElement.style.display = 'block';
  }
  
  /**
   * Function to clear message
   */
  function clearMessage() {
    messageElement.textContent = '';
    messageElement.style.display = 'none';
  }
  
  /**
   * Function to validate password requirements
   * Password must have:
   * - Minimum 6 characters
   * - At least 1 number
   * - At least 1 special character
   * @param {string} password - The password to validate
   * @returns {object} - Returns {valid: boolean, errors: array}
   */
  function validatePasswordRequirements(password) {
    const errors = [];
    
    // Check minimum length
    if (password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }
    
    // Check for at least one number
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    // Check for at least one special character
    // Special characters: !@#$%^&*()_+-=[]{}|;:,.<>?
    if (!/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    
    return {
      valid: errors.length === 0,
      errors: errors
    };
  }
  
  /**
   * Event listener for form submission
   */
  changePasswordForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const userId = userIdInput.value.trim();
    const currentPassword = currentPasswordInput.value.trim();
    const newPassword = newPasswordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    
    // Clear previous messages
    clearMessage();
    
    // Validate User ID
    if (!REGISTERED_USER_IDS.includes(userId) && !getCurrentPassword(userId)) {
      showMessage('User ID not found. Please check your User ID and try again.', true);
      currentPasswordInput.value = '';
      newPasswordInput.value = '';
      confirmPasswordInput.value = '';
      userIdInput.focus();
      return;
    }
    
    // Validate current password
    const actualCurrentPassword = getCurrentPassword(userId);
    if (currentPassword !== actualCurrentPassword) {
      showMessage('Current password is incorrect. Please try again.', true);
      currentPasswordInput.value = '';
      currentPasswordInput.focus();
      return;
    }
    
    // Validate new password is not empty
    if (newPassword.length === 0) {
      showMessage('New password cannot be empty.', true);
      newPasswordInput.focus();
      return;
    }
    
    // Validate password requirements
    const passwordValidation = validatePasswordRequirements(newPassword);
    if (!passwordValidation.valid) {
      showMessage('Password does not meet requirements: ' + passwordValidation.errors.join(', '), true);
      newPasswordInput.value = '';
      confirmPasswordInput.value = '';
      newPasswordInput.focus();
      return;
    }
    
    // Validate new password is different from current password
    if (newPassword === currentPassword) {
      showMessage('New password must be different from current password.', true);
      newPasswordInput.value = '';
      confirmPasswordInput.value = '';
      newPasswordInput.focus();
      return;
    }
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
      showMessage('New passwords do not match. Please try again.', true);
      newPasswordInput.value = '';
      confirmPasswordInput.value = '';
      newPasswordInput.focus();
      return;
    }
    
    // Save new password
    if (savePassword(userId, newPassword)) {
      showMessage('Password changed successfully! Redirecting to sign-in page...', false);
      
      // Clear form
      userIdInput.value = '';
      currentPasswordInput.value = '';
      newPasswordInput.value = '';
      confirmPasswordInput.value = '';
      
      // Redirect to sign-in page after 2 seconds
      setTimeout(function() {
        window.location.href = 'sign-in.html';
      }, 2000);
    } else {
      showMessage('Error saving password. Please try again.', true);
    }
  });
  
  // Clear message when user starts typing
  userIdInput.addEventListener('input', clearMessage);
  currentPasswordInput.addEventListener('input', clearMessage);
  newPasswordInput.addEventListener('input', clearMessage);
  confirmPasswordInput.addEventListener('input', clearMessage);
  
});

