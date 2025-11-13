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
    'C101', 'C102', 'C103', 'C104', 'C105',
    'C106', 'C107', 'C108', 'C109', 'C110'
  ];
  
  // User credentials mapping: User ID -> Password
  // In a real application, this would be stored securely on a server
  // For demo purposes, default password is set to the User ID (e.g., C101 -> password: "C101")
  // You can customize passwords for each user here
  const DEFAULT_USER_CREDENTIALS = {
    'C101': 'C101',  // John Doe
    'C102': 'C102',  // Emma Smith
    'C103': 'C103',  // Michael Johnson
    'C104': 'C104',  // Sarah Wilson
    'C105': 'C105',  // James Brown
    'C106': 'C106',  // Lisa Anderson
    'C107': 'C107',  // Robert Taylor
    'C108': 'C108',  // Emily Davis
    'C109': 'C109',  // David Miller
    'C110': 'C110'   // Jessica Lee
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
    // Trim whitespace and convert to uppercase for User ID (to match table format)
    const trimmedUserId = userId.trim().toUpperCase();
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
    const trimmedUserId = enteredUsername.trim().toUpperCase();
    
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

