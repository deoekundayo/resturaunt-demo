// Authentication script for sign-in page
// This script handles form submission, validation, and redirection

// Wait for the DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
  
  // Get references to form elements
  const signInForm = document.getElementById('signInForm');
  const userNameInput = document.getElementById('userName');
  const passwordInput = document.getElementById('password');
  const messageElement = document.getElementById('message');
  
  // Registered User IDs from the users table
  const REGISTERED_USER_IDS = [
    '234567', '287654', '215432', '298765', '223456',
    '276543', '245678', '291234', '267890', '254321'
  ];
  
  // User credentials mapping: User ID -> Password
  // In a real application, this would be stored securely on a server
  // For demo purposes, default password is set to the User ID (e.g., 234567 -> password: "234567")
  // You can customize passwords for each user here
  const DEFAULT_USER_CREDENTIALS = {
    '234567': '234567',  // John Doe
    '287654': '287654',  // Emma Smith
    '215432': '215432',  // Michael Johnson
    '298765': '298765',  // Sarah Wilson
    '223456': '223456',  // James Brown
    '276543': '276543',  // Lisa Anderson
    '245678': '245678',  // Robert Taylor
    '291234': '291234',  // Emily Davis
    '267890': '267890',  // David Miller
    '254321': '254321'   // Jessica Lee
  };
  
  // User credentials object (will be populated with defaults and localStorage)
  let USER_CREDENTIALS = {};
  
  // Load credentials from localStorage and merge with defaults
  // localStorage passwords override defaults (for changed passwords)
  function loadStoredCredentials() {
    try {
      // Start with default credentials
      USER_CREDENTIALS = Object.assign({}, DEFAULT_USER_CREDENTIALS);
      
      // Load from localStorage and override defaults
      const stored = localStorage.getItem('userCredentials');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge stored credentials (this will override defaults for changed passwords)
        Object.assign(USER_CREDENTIALS, parsed);
      }
    } catch (e) {
      console.error('Error loading stored credentials:', e);
      // Fallback to defaults if there's an error
      USER_CREDENTIALS = Object.assign({}, DEFAULT_USER_CREDENTIALS);
    }
  }
  
  // Load stored credentials on page load
  loadStoredCredentials();
  
  // Admin page URL to redirect to upon successful login
  const ADMIN_PAGE = 'admindashbord.html';
  
  /**
   * Function to display error message to the user
   * @param {string} errorText - The error message to display
   */
  function showError(errorText) {
    messageElement.textContent = errorText;
    messageElement.style.color = 'red';
    messageElement.style.display = 'block';
  }
  
  /**
   * Function to clear error message
   */
  function clearError() {
    messageElement.textContent = '';
    messageElement.style.display = 'none';
  }
  
  /**
   * Function to validate credentials
   * @param {string} userId - The User ID entered by user
   * @param {string} password - The password entered by user
   * @returns {boolean} - Returns true if credentials are valid, false otherwise
   */
  function validateCredentials(userId, password) {
    // Trim whitespace for User ID (numeric IDs don't need uppercase conversion)
    const trimmedUserId = userId.trim();
    const trimmedPassword = password.trim();
    
    // Check if User ID exists in registered users
    if (!REGISTERED_USER_IDS.includes(trimmedUserId) && !USER_CREDENTIALS.hasOwnProperty(trimmedUserId)) {
      return false;
    }
    
    // Check if password matches for this User ID
    const expectedPassword = USER_CREDENTIALS[trimmedUserId];
    if (!expectedPassword) {
      return false;
    }
    
    return trimmedPassword === expectedPassword;
  }
  
  /**
   * Function to handle successful login
   * Redirects to admin page and prevents back navigation
   */
  function handleSuccessfulLogin() {
    // Clear any previous error messages
    clearError();
    
    // Use browser's location.replace() method to redirect to admin page in the same tab
    // This method replaces the current history entry, preventing back navigation
    // Unlike window.location.href, location.replace() removes the login page from history
    window.location.replace(ADMIN_PAGE);
    
    // Store authentication status in sessionStorage for additional security
    // This can be checked on the admin page to prevent unauthorized access
    sessionStorage.setItem('authenticated', 'true');
  }
  
  /**
   * Event listener for form submission
   * Prevents default form submission and handles validation
   */
  signInForm.addEventListener('submit', function(event) {
    // Prevent default form submission behavior (page refresh)
    event.preventDefault();
    
    // Get the values entered by the user
    const enteredUsername = userNameInput.value;
    const enteredPassword = passwordInput.value;
    
    // Clear any previous error messages
    clearError();
    
    // Validate the credentials
    const trimmedUserId = enteredUsername.trim();
    
    // Check if User ID exists in registered users
    const isUserIdRegistered = REGISTERED_USER_IDS.includes(trimmedUserId) || 
                               USER_CREDENTIALS.hasOwnProperty(trimmedUserId);
    
    if (!isUserIdRegistered) {
      // User ID not found in registered users
      showError('User ID not found. Please check your User ID and try again.');
      passwordInput.value = '';
      passwordInput.focus();
      return;
    }
    
    // Validate the credentials (User ID and Password)
    if (validateCredentials(enteredUsername, enteredPassword)) {
      // Credentials are correct - redirect to admin page
      handleSuccessfulLogin();
    } else {
      // Password is incorrect - display error message
      showError('Invalid password. Please check your password and try again.');
      
      // Clear the password field for security (but keep User ID for convenience)
      passwordInput.value = '';
      
      // Focus back on password field for easy retry
      passwordInput.focus();
      
      // Allow unlimited attempts - no need to block or limit the user
    }
  });
  
  // Optional: Clear error message when user starts typing
  userNameInput.addEventListener('input', clearError);
  passwordInput.addEventListener('input', clearError);
  
});

