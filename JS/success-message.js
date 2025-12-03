/**
 * Success Message Handler
 * Replaces the functionality of info-saved.html with a JavaScript-based modal
 */

/**
 * Shows a success message modal and redirects after a delay
 * @param {string} message - The success message to display
 * @param {string} redirectUrl - The URL to redirect to after the delay
 * @param {number} delay - Delay in milliseconds before redirect (default: 2000ms)
 */
function showSuccessMessage(message, redirectUrl, delay = 2000) {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'success-overlay';
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
  `;

  // Create message box
  const messageBox = document.createElement('div');
  messageBox.style.cssText = `
    background: white;
    padding: 40px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    animation: slideUp 0.3s ease-out;
  `;

  // Create checkmark icon
  const checkmark = document.createElement('div');
  checkmark.innerHTML = '✓';
  checkmark.style.cssText = `
    font-size: 60px;
    color: #4CAF50;
    margin-bottom: 20px;
    font-weight: bold;
  `;

  // Create message text
  const messageText = document.createElement('h2');
  messageText.textContent = message || 'Your information has been successfully saved';
  messageText.style.cssText = `
    margin: 0 0 20px 0;
    color: #333;
    font-size: 24px;
    font-weight: normal;
  `;

  // Create redirect text
  const redirectText = document.createElement('p');
  redirectText.id = 'countdown-text';
  redirectText.textContent = `Redirecting in ${Math.ceil(delay / 1000)} seconds...`;
  redirectText.style.cssText = `
    color: #666;
    margin: 0;
    font-size: 16px;
  `;

  // Assemble the message box
  messageBox.appendChild(checkmark);
  messageBox.appendChild(messageText);
  messageBox.appendChild(redirectText);
  overlay.appendChild(messageBox);
  document.body.appendChild(overlay);

  // Add CSS animations if not already added
  if (!document.getElementById('success-message-styles')) {
    const style = document.createElement('style');
    style.id = 'success-message-styles';
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
    `;
    document.head.appendChild(style);
  }

  // Countdown timer
  let countdown = Math.ceil(delay / 1000);
  const countdownInterval = setInterval(() => {
    countdown--;
    if (countdown > 0 && redirectText) {
      redirectText.textContent = `Redirecting in ${countdown} seconds...`;
    } else {
      clearInterval(countdownInterval);
    }
  }, 1000);

  // Redirect after delay
  setTimeout(() => {
    if (overlay.parentNode) {
      overlay.style.animation = 'fadeOut 0.3s ease-in';
      setTimeout(() => {
        if (overlay.parentNode) {
          document.body.removeChild(overlay);
        }
        window.location.href = redirectUrl;
      }, 300);
    } else {
      window.location.href = redirectUrl;
    }
  }, delay);

  // Add fadeOut animation if not already added
  if (!document.getElementById('success-message-styles').textContent.includes('fadeOut')) {
    const style = document.getElementById('success-message-styles');
    style.textContent += `
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
  }
}

/**
 * Initialize success message from URL parameters (for backward compatibility)
 * If the page is loaded with ?redirect=url parameter, show success message
 */
function initSuccessFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectUrl = urlParams.get('redirect');
  const message = urlParams.get('message') || 'Your information has been successfully saved';
  
  if (redirectUrl) {
    showSuccessMessage(message, redirectUrl);
  }
}

// Auto-initialize if URL has redirect parameter
if (typeof window !== 'undefined' && window.location.search.includes('redirect=')) {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSuccessFromUrl);
  } else {
    initSuccessFromUrl();
  }
}

