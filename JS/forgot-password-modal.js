/**
 * Forgot Password Modal Handler
 * Creates a modal dialog for password reset without needing a separate HTML page
 */

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
const GENERIC_PASSWORD = 'Reset@123';

/**
 * Shows the forgot password modal
 */
function showForgotPasswordModal() {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'forgot-password-overlay';
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease-in;
    overflow: hidden;
    box-sizing: border-box;
  `;

  // Create modal
  const modal = document.createElement('div');
  modal.id = 'forgot-password-modal';
  modal.style.cssText = `
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 450px;
    width: calc(100% - 40px);
    max-height: 90vh;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 40px;
    animation: slideUp 0.3s ease-out;
    position: relative;
    margin: 20px;
    box-sizing: border-box;
  `;

  // Create close button
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '×';
  closeButton.style.cssText = `
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    font-size: 32px;
    color: #999;
    cursor: pointer;
    line-height: 1;
    padding: 0;
    width: 30px;
    height: 30px;
    transition: color 0.3s ease;
  `;
  closeButton.onmouseover = () => closeButton.style.color = '#333';
  closeButton.onmouseout = () => closeButton.style.color = '#999';
  closeButton.onclick = closeForgotPasswordModal;

  // Create form
  const form = document.createElement('form');
  form.id = 'forgotPasswordForm';
  form.style.cssText = `
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
  `;

  // Create title
  const title = document.createElement('h1');
  title.textContent = 'Forgot Password';
  title.style.cssText = `
    margin: 0 0 30px 0;
    color: #333;
    font-size: 24px;
    font-weight: normal;
  `;

  // Create form group
  const formGroup = document.createElement('div');
  formGroup.style.cssText = `
    margin-bottom: 20px;
    width: 100%;
    box-sizing: border-box;
  `;

  const label = document.createElement('label');
  label.setAttribute('for', 'forgotUserId');
  label.textContent = 'User ID';
  label.style.cssText = `
    display: block;
    margin-bottom: 8px;
    color: #444;
    font-weight: 600;
    text-align: left;
    font-family: "Times New Roman", serif;
  `;

  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'forgotUserId';
  input.name = 'userId';
  input.placeholder = 'Enter your User ID';
  input.required = true;
  input.autocomplete = 'username';
  input.style.cssText = `
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
    font-family: "Times New Roman", serif;
    font-size: 16px;
    max-width: 100%;
  `;
  input.onfocus = () => input.style.border = '2px solid #4caf50';
  input.onblur = () => input.style.border = '1px solid #ddd';

  formGroup.appendChild(label);
  formGroup.appendChild(input);

  // Create message container
  const messageDiv = document.createElement('div');
  messageDiv.id = 'forgotPasswordMessage';
  messageDiv.style.cssText = `
    display: none;
    margin-top: 15px;
    padding: 12px;
    border-radius: 5px;
    text-align: center;
    font-family: "Times New Roman", serif;
    font-size: 14px;
  `;

  // Create success message container
  const successDiv = document.createElement('div');
  successDiv.id = 'forgotPasswordSuccess';
  successDiv.style.cssText = `
    display: none;
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    color: #155724;
    padding: 15px;
    border-radius: 5px;
    margin-top: 20px;
    font-family: "Times New Roman", serif;
  `;

  // Create submit button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Send Password to Email';
  submitButton.style.cssText = `
    width: 100%;
    padding: 12px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    font-family: "Times New Roman", serif;
    transition: background-color 0.3s ease;
    margin-top: 10px;
  `;
  submitButton.onmouseover = () => submitButton.style.backgroundColor = '#45a049';
  submitButton.onmouseout = () => submitButton.style.backgroundColor = '#4caf50';

  // Create cancel button
  const cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.textContent = 'Back to Sign In';
  cancelButton.style.cssText = `
    width: 100%;
    padding: 12px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    font-family: "Times New Roman", serif;
    transition: background-color 0.3s ease;
    margin-top: 10px;
  `;
  cancelButton.onmouseover = () => cancelButton.style.backgroundColor = '#555';
  cancelButton.onmouseout = () => cancelButton.style.backgroundColor = '#333';
  cancelButton.onclick = closeForgotPasswordModal;

  // Assemble form
  form.appendChild(title);
  form.appendChild(formGroup);
  form.appendChild(messageDiv);
  form.appendChild(successDiv);
  form.appendChild(submitButton);
  form.appendChild(cancelButton);

  modal.appendChild(closeButton);
  modal.appendChild(form);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Add CSS animations if not already added
  if (!document.getElementById('forgot-password-modal-styles')) {
    const style = document.createElement('style');
    style.id = 'forgot-password-modal-styles';
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideUp {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      body.modal-open {
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);
  }

  // Prevent body scroll when modal is open
  document.body.classList.add('modal-open');
  document.body.style.overflow = 'hidden';

  // Handle form submission
  form.addEventListener('submit', handleForgotPasswordSubmit);

  // Clear messages when user types
  input.addEventListener('input', () => {
    messageDiv.style.display = 'none';
    successDiv.style.display = 'none';
  });

  // Focus on input
  setTimeout(() => input.focus(), 100);

  // Close on overlay click (but not on modal click)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeForgotPasswordModal();
    }
  });
}

/**
 * Closes the forgot password modal
 */
function closeForgotPasswordModal() {
  const overlay = document.getElementById('forgot-password-overlay');
  if (overlay) {
    overlay.style.animation = 'fadeOut 0.3s ease-in';
    setTimeout(() => {
      if (overlay.parentNode) {
        document.body.removeChild(overlay);
      }
      // Re-enable body scroll
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    }, 300);
  }
}

/**
 * Handles the forgot password form submission
 */
function handleForgotPasswordSubmit(event) {
  event.preventDefault();

  const userIdInput = document.getElementById('forgotUserId');
  const messageDiv = document.getElementById('forgotPasswordMessage');
  const successDiv = document.getElementById('forgotPasswordSuccess');

  const userId = userIdInput.value.trim();

  // Clear previous messages
  messageDiv.style.display = 'none';
  successDiv.style.display = 'none';

  // Validate User ID is not empty
  if (!userId) {
    showForgotPasswordError('Please enter your User ID.');
    userIdInput.focus();
    return;
  }

  // Check if User ID exists in registered users
  if (!REGISTERED_USER_IDS.includes(userId)) {
    showForgotPasswordError('The User ID you entered is not in the system, please try again or contact the system administrator.');
    userIdInput.value = '';
    userIdInput.focus();
    return;
  }

  // Get user's email
  const userEmail = USER_EMAILS[userId];

  if (!userEmail) {
    showForgotPasswordError('Email address not found for this User ID. Please contact the system administrator.');
    userIdInput.focus();
    return;
  }

  // Generate reset token and link
  const resetToken = generateResetToken();
  const resetLink = generateResetLink(userId, resetToken);
  
  // Save reset token
  if (!saveResetToken(userId, resetToken)) {
    showForgotPasswordError('Error generating reset link. Please try again.');
    return;
  }
  
  // Send password to email (simulated) - includes both password and reset link
  if (sendPasswordEmail(userEmail, GENERIC_PASSWORD, resetLink)) {
    // Show success message
    showForgotPasswordSuccess(userId, userEmail, resetLink);
    
    // Clear the input
    userIdInput.value = '';
  } else {
    showForgotPasswordError('Error sending password. Please try again or contact the system administrator.');
  }
}

/**
 * Shows error message in the modal
 */
function showForgotPasswordError(errorText) {
  const messageDiv = document.getElementById('forgotPasswordMessage');
  const successDiv = document.getElementById('forgotPasswordSuccess');
  
  messageDiv.textContent = errorText;
  messageDiv.style.color = 'red';
  messageDiv.style.backgroundColor = '#f8d7da';
  messageDiv.style.border = '1px solid #f5c6cb';
  messageDiv.style.display = 'block';
  successDiv.style.display = 'none';
}

/**
 * Shows success message in the modal
 */
function showForgotPasswordSuccess(userId, email, resetLink) {
  const messageDiv = document.getElementById('forgotPasswordMessage');
  const successDiv = document.getElementById('forgotPasswordSuccess');
  
  messageDiv.style.display = 'none';
  successDiv.innerHTML = `
    <p style="margin: 5px 0;"><strong>Password Reset Successful!</strong></p>
    <p style="margin: 5px 0;">- A generic password has been sent to your email address.</p>
    <p style="margin: 5px 0;">- A password reset link has also been sent to your email address.</p>
    <p style="margin: 5px 0;"><strong>Your new password is:</strong> ${GENERIC_PASSWORD}</p>
    <p style="margin-top: 10px; font-size: 12px; color: #666;">Please check your email and use this password to sign in, or click the password reset link to set a new password.</p>
  `;
  successDiv.style.display = 'block';
  
  // Save the generic password to localStorage so user can sign in
  savePasswordToSystem(userId, GENERIC_PASSWORD);
}

/**
 * Function to save password to system (localStorage)
 */
function savePasswordToSystem(userId, password) {
  try {
    let credentials = {};
    const stored = localStorage.getItem('userCredentials');
    if (stored) {
      credentials = JSON.parse(stored);
    }
    
    credentials[userId] = password;
    localStorage.setItem('userCredentials', JSON.stringify(credentials));
    return true;
  } catch (e) {
    console.error('Error saving password:', e);
    return false;
  }
}

/**
 * Generates a password reset token
 */
function generateResetToken() {
  // Generate a random token (in production, use a more secure method)
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

/**
 * Saves password reset token to localStorage
 */
function saveResetToken(userId, token) {
  try {
    let resetTokens = {};
    const stored = localStorage.getItem('passwordResetTokens');
    if (stored) {
      resetTokens = JSON.parse(stored);
    }
    
    // Store token with expiration (24 hours from now)
    resetTokens[userId] = {
      token: token,
      expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    };
    
    localStorage.setItem('passwordResetTokens', JSON.stringify(resetTokens));
    return true;
  } catch (e) {
    console.error('Error saving reset token:', e);
    return false;
  }
}

/**
 * Generates password reset link
 */
function generateResetLink(userId, token) {
  const baseUrl = window.location.origin + window.location.pathname.replace(/[^/]*$/, '');
  return `${baseUrl}change-password.html?token=${token}&userId=${userId}`;
}

/**
 * Function to simulate sending email
 * Uses the email template generator
 */
function sendPasswordEmail(email, password, resetLink) {
  // Import email template function if available
  if (typeof sendPasswordResetEmail === 'function') {
    return sendPasswordResetEmail(email, password, resetLink);
  }
  
  // Fallback logging
  console.log(`Password reset email sent to ${email}`);
  console.log(`Email content:`);
  console.log(`- Generic password: ${password}`);
  console.log(`- Password reset link: ${resetLink}`);
  
  // In a real application, this would make an API call to send an email
  // The email would contain both the generic password and the reset link
  return true;
}

