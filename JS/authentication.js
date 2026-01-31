// Authentication script for sign-in page
// This script handles form submission, validation, and redirection
// Now connected to the user database via backend API

// Wait for the DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
  
  // Get references to form elements
  const signInForm = document.getElementById('signInForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const messageElement = document.getElementById('message');
  
  // Backend API URL
  const API_URL = 'http://localhost:3001/api';
  
  // Admin page URL to redirect to upon successful login
  const ADMIN_PAGE = 'admindashbord.html';
  
  /**
   * Function to display error message to the user
   * @param {string} errorText - The error message to display
   */
  function showError(errorText) {
    messageElement.textContent = errorText;
    messageElement.style.color = 'red';
    messageElement.style.backgroundColor = '#ffebee';
    messageElement.style.border = '1px solid #f44336';
    messageElement.style.display = 'block';
  }
  
  /**
   * Function to clear error message
   */
  function clearError() {
    messageElement.textContent = '';
    messageElement.style.display = 'none';
    messageElement.style.backgroundColor = '';
    messageElement.style.border = '';
  }
  
  /**
   * Function to handle successful login
   * Redirects to admin page and prevents back navigation
   */
  function handleSuccessfulLogin(userData) {
    // Clear any previous error messages
    clearError();
    
    // Store user data in sessionStorage
    sessionStorage.setItem('authenticated', 'true');
    sessionStorage.setItem('user', JSON.stringify(userData));
    
    // Use browser's location.replace() method to redirect to admin page in the same tab
    // This method replaces the current history entry, preventing back navigation
    window.location.replace(ADMIN_PAGE);
  }
  
  /**
   * Function to authenticate user via API
   * @param {string} email - The email entered by user
   * @param {string} password - The password entered by user
   */
  async function authenticateUser(email, password) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // Authentication failed
        showError(data.error || 'Invalid email or password. Please try again.');
        passwordInput.value = '';
        passwordInput.focus();
        return false;
      }

      // Authentication successful
      handleSuccessfulLogin(data.user);
      return true;
    } catch (error) {
      console.error('Error during authentication:', error);
      showError('Unable to connect to server. Please check if the backend is running on http://localhost:3001');
      passwordInput.value = '';
      passwordInput.focus();
      return false;
    }
  }
  
  /**
   * Event listener for form submission
   * Prevents default form submission and handles validation
   */
  signInForm.addEventListener('submit', async function(event) {
    // Prevent default form submission behavior (page refresh)
    event.preventDefault();
    
    // Get the values entered by the user
    const enteredEmail = emailInput.value.trim();
    const enteredPassword = passwordInput.value;
    
    // Clear any previous error messages
    clearError();
    
    // Basic validation
    if (!enteredEmail) {
      showError('Please enter your email address.');
      emailInput.focus();
      return;
    }
    
    if (!enteredPassword) {
      showError('Please enter your password.');
      passwordInput.focus();
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(enteredEmail)) {
      showError('Please enter a valid email address.');
      emailInput.focus();
      return;
    }
    
    // Show loading state (optional - you can add a loading spinner here)
    const submitButton = signInForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Signing in...';
    
    // Authenticate with backend API
    await authenticateUser(enteredEmail, enteredPassword);
    
    // Restore button state
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  });
  
  // Optional: Clear error message when user starts typing
  emailInput.addEventListener('input', clearError);
  passwordInput.addEventListener('input', clearError);
  
});

