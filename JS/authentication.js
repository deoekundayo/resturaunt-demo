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

  // Dedicated admin credentials
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'Admin@123';

  // Demo users (same IDs used elsewhere in the project)
  const DEMO_USERS = [
    { id: '234567', name: 'John Doe', email: 'john.doe@gmail.com' },
    { id: '287654', name: 'Emma Smith', email: 'emma.smith@gmail.com' },
    { id: '215432', name: 'Michael Johnson', email: 'michael.j@gmail.com' },
    { id: '298765', name: 'Sarah Wilson', email: 'sarah.w@gmail.com' },
    { id: '223456', name: 'James Brown', email: 'james.b@gmail.com' },
    { id: '276543', name: 'Lisa Anderson', email: 'lisa.a@gmail.com' },
    { id: '245678', name: 'Robert Taylor', email: 'robert.t@gmail.com' },
    { id: '291234', name: 'Emily Davis', email: 'emily.d@gmail.com' },
    { id: '267890', name: 'David Miller', email: 'david.m@gmail.com' },
    { id: '254321', name: 'Jessica Lee', email: 'jessica.l@gmail.com' },
    { id: '238901', name: 'Olivia Martin', email: 'olivia.martin@gmail.com' },
    { id: '246789', name: 'Noah Harris', email: 'noah.harris@gmail.com' },
    { id: '259876', name: 'Ava Thompson', email: 'ava.thompson@gmail.com' }
  ];
  
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

  function loadStoredCredentials() {
    try {
      const stored = localStorage.getItem('userCredentials');
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  }

  function loadStoredUsers() {
    try {
      const stored = localStorage.getItem('users');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function getAllKnownUsers() {
    const merged = [...DEMO_USERS, ...loadStoredUsers()];
    const byId = new Map();

    merged.forEach((u) => {
      if (!u || !u.id) return;
      byId.set(String(u.id), {
        id: String(u.id),
        name: u.name || 'User',
        email: (u.email || '').toLowerCase(),
        password: u.password || ''
      });
    });

    return Array.from(byId.values());
  }

  function authenticateLocally(identifier, password) {
    const idOrEmail = identifier.trim().toLowerCase();
    const users = getAllKnownUsers();
    const matched = users.find(
      (u) => u.email === idOrEmail || u.id === idOrEmail
    );

    if (!matched) return false;

    const storedCredentials = loadStoredCredentials();
    const storedPassword = storedCredentials[matched.id];
    const localPassword = matched.password;
    const defaultPassword = matched.id; // demo default
    const effectivePassword = storedPassword || localPassword || defaultPassword;

    if (password !== effectivePassword) return false;

    handleSuccessfulLogin({
      id: matched.id,
      name: matched.name,
      email: matched.email,
      role: 'user'
    });
    return true;
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
        // If API rejects, fallback to local auth for demo mode.
        if (authenticateLocally(email, password)) {
          return true;
        }
        showError(data.error || 'Invalid credentials. Please try again.');
        passwordInput.value = '';
        passwordInput.focus();
        return false;
      }

      // Authentication successful
      handleSuccessfulLogin(data.user);
      return true;
    } catch (error) {
      console.error('Error during authentication:', error);
      // If backend is unavailable, still allow demo/local sign-in.
      if (authenticateLocally(email, password)) {
        return true;
      }
      showError('Invalid credentials. Please try again.');
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
    const enteredIdentifier = emailInput.value.trim();
    const enteredPassword = passwordInput.value;
    
    // Clear any previous error messages
    clearError();
    
    // Basic validation
    if (!enteredIdentifier) {
      showError('Please enter your email, user ID, or admin username.');
      emailInput.focus();
      return;
    }
    
    if (!enteredPassword) {
      showError('Please enter your password.');
      passwordInput.focus();
      return;
    }
    
    // Dedicated admin login path
    if (
      enteredIdentifier.toLowerCase() === ADMIN_USERNAME &&
      enteredPassword === ADMIN_PASSWORD
    ) {
      handleSuccessfulLogin({
        name: 'Administrator',
        email: 'admin@chefchain.local',
        role: 'admin'
      });
      return;
    }

    // Allow either email or user ID for non-admin users.
    const userIdRegex = /^\d{6}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(enteredIdentifier) && !userIdRegex.test(enteredIdentifier)) {
      showError('Enter a valid email, 6-digit user ID, or admin username.');
      emailInput.focus();
      return;
    }
    
    // Show loading state (optional - you can add a loading spinner here)
    const submitButton = signInForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Signing in...';
    
    // Authenticate with backend API
    await authenticateUser(enteredIdentifier, enteredPassword);
    
    // Restore button state
    submitButton.disabled = false;
    submitButton.textContent = originalButtonText;
  });
  
  // Optional: Clear error message when user starts typing
  emailInput.addEventListener('input', clearError);
  passwordInput.addEventListener('input', clearError);
  
});

