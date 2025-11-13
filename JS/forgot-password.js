// Forgot Password script
// This script handles password reset requests

// Wait for the DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
  
  // Get references to form elements
  const forgotPasswordForm = document.getElementById('forgotPasswordForm');
  const userIdInput = document.getElementById('userId');
  const messageElement = document.getElementById('message');
  const successMessageElement = document.getElementById('successMessage');
  
  // Registered User IDs from the users table
  const REGISTERED_USER_IDS = [
    '234567', '287654', '215432', '298765', '223456',
    '276543', '245678', '291234', '267890', '254321'
  ];
  
  // User ID to Email mapping (from the users table)
  const USER_EMAILS = {
    '234567': 'john.doe@gmail.com',      // John Doe
    '287654': 'emma.smith@gmail.com',   // Emma Smith
    '215432': 'michael.j@gmail.com',    // Michael Johnson
    '298765': 'sarah.w@gmail.com',      // Sarah Wilson
    '223456': 'james.b@gmail.com',      // James Brown
    '276543': 'lisa.a@gmail.com',       // Lisa Anderson
    '245678': 'robert.t@gmail.com',     // Robert Taylor
    '291234': 'emily.d@gmail.com',      // Emily Davis
    '267890': 'david.m@gmail.com',      // David Miller
    '254321': 'jessica.l@gmail.com'    // Jessica Lee
  };
  
  // Generic password that will be sent to users
  // Must meet requirements: min 6 chars, 1 number, 1 special character
  const GENERIC_PASSWORD = 'Reset@123';
  
  /**
   * Function to display error message to the user
   */
  function showError(errorText) {
    messageElement.textContent = errorText;
    messageElement.style.color = 'red';
    messageElement.style.display = 'block';
    successMessageElement.style.display = 'none';
  }
  
  /**
   * Function to display success message
   */
  function showSuccess(userId, email) {
    messageElement.style.display = 'none';
    successMessageElement.innerHTML = `
      <p><strong>Password Reset Successful!</strong></p>
      <p>A generic password has been sent to your email address.</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Your new password is:</strong> ${GENERIC_PASSWORD}</p>
      <p style="margin-top: 10px; font-size: 12px; color: #666;">Please check your email and use this password to sign in. You can change it after signing in.</p>
    `;
    successMessageElement.style.display = 'block';
    
    // Save the generic password to localStorage so user can sign in
    savePasswordToSystem(userId, GENERIC_PASSWORD);
  }
  
  /**
   * Function to clear messages
   */
  function clearMessages() {
    messageElement.textContent = '';
    messageElement.style.display = 'none';
    successMessageElement.style.display = 'none';
  }
  
  /**
   * Function to save password to system (localStorage)
   * This allows the user to sign in with the generic password
   */
  function savePasswordToSystem(userId, password) {
    try {
      // Load existing credentials
      let credentials = {};
      const stored = localStorage.getItem('userCredentials');
      if (stored) {
        credentials = JSON.parse(stored);
      }
      
      // Update password for this user
      credentials[userId] = password;
      
      // Save back to localStorage
      localStorage.setItem('userCredentials', JSON.stringify(credentials));
      return true;
    } catch (e) {
      console.error('Error saving password:', e);
      return false;
    }
  }
  
  /**
   * Function to simulate sending email
   * In a real application, this would send an actual email
   */
  function sendPasswordEmail(email, password) {
    // In a real application, this would make an API call to send an email
    // For demo purposes, we'll just log it and save to localStorage
    console.log(`Password reset email sent to ${email} with password: ${password}`);
    
    // In a production system, you would:
    // 1. Generate a secure token
    // 2. Send email via email service (SendGrid, AWS SES, etc.)
    // 3. Store token with expiration in database
    // 4. User clicks link in email to reset password
    
    return true;
  }
  
  /**
   * Event listener for form submission
   */
  forgotPasswordForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get User ID
    const userId = userIdInput.value.trim();
    
    // Clear previous messages
    clearMessages();
    
    // Validate User ID is not empty
    if (!userId) {
      showError('Please enter your User ID.');
      userIdInput.focus();
      return;
    }
    
    // Check if User ID exists in registered users
    if (!REGISTERED_USER_IDS.includes(userId)) {
      showError('The User ID you entered is not in the system, please try again or contact the system administrator.');
      userIdInput.value = '';
      userIdInput.focus();
      return;
    }
    
    // Get user's email
    const userEmail = USER_EMAILS[userId];
    
    if (!userEmail) {
      showError('Email address not found for this User ID. Please contact the system administrator.');
      userIdInput.focus();
      return;
    }
    
    // Send password to email (simulated)
    if (sendPasswordEmail(userEmail, GENERIC_PASSWORD)) {
      // Show success message
      showSuccess(userId, userEmail);
      
      // Clear the input
      userIdInput.value = '';
    } else {
      showError('Error sending password. Please try again or contact the system administrator.');
    }
  });
  
  // Clear messages when user starts typing
  userIdInput.addEventListener('input', clearMessages);
  
});

