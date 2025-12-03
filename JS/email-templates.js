/**
 * Email Templates
 * Templates for sending emails (currently simulated, but ready for backend integration)
 */

/**
 * Generates a password reset email HTML template
 * @param {string} userEmail - The recipient's email address
 * @param {string} genericPassword - The generic password to include
 * @param {string} resetLink - The password reset link
 * @returns {string} - HTML email content
 */
function generatePasswordResetEmail(userEmail, genericPassword, resetLink) {
  const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset - ChefChain</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 30px 40px; text-align: center; background-color: #4caf50; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">🍽️ ChefChain</h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px;">Password Reset Request</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                Hello,
              </p>
              
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 16px; line-height: 1.6;">
                You have requested to reset your password for your ChefChain account. We've generated a temporary password for you and included a secure link to set a new password.
              </p>
              
              <!-- Generic Password Section -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #4caf50; padding: 20px; margin: 25px 0; border-radius: 5px;">
                <p style="margin: 0 0 10px 0; color: #333333; font-size: 16px; font-weight: bold;">
                  Your Temporary Password:
                </p>
                <p style="margin: 0; color: #4caf50; font-size: 24px; font-weight: bold; font-family: 'Courier New', monospace; letter-spacing: 2px;">
                  ${genericPassword}
                </p>
                <p style="margin: 10px 0 0 0; color: #666666; font-size: 14px;">
                  You can use this password to sign in immediately, or click the link below to set a new password.
                </p>
              </div>
              
              <!-- Reset Link Section -->
              <div style="text-align: center; margin: 30px 0;">
                <p style="margin: 0 0 15px 0; color: #333333; font-size: 16px;">
                  To set a new password, click the button below:
                </p>
                <a href="${resetLink}" style="display: inline-block; padding: 14px 30px; background-color: #4caf50; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; margin: 10px 0;">
                  Reset Password
                </a>
                <p style="margin: 15px 0 0 0; color: #666666; font-size: 12px;">
                  Or copy and paste this link into your browser:<br>
                  <a href="${resetLink}" style="color: #4caf50; word-break: break-all;">${resetLink}</a>
                </p>
              </div>
              
              <!-- Security Notice -->
              <div style="background-color: #fff3cd; border: 1px solid #ffc107; padding: 15px; margin: 25px 0; border-radius: 5px;">
                <p style="margin: 0 0 10px 0; color: #856404; font-size: 14px; font-weight: bold;">
                  ⚠️ Security Notice:
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #856404; font-size: 14px; line-height: 1.6;">
                  <li>This password reset link will expire in 24 hours</li>
                  <li>If you didn't request this password reset, please ignore this email</li>
                  <li>For security, change your password after signing in</li>
                  <li>Never share your password or reset link with anyone</li>
                </ul>
              </div>
              
              <p style="margin: 20px 0 0 0; color: #333333; font-size: 16px; line-height: 1.6;">
                If you have any questions or concerns, please contact our support team.
              </p>
              
              <p style="margin: 30px 0 0 0; color: #333333; font-size: 16px; line-height: 1.6;">
                Best regards,<br>
                <strong>The ChefChain Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; text-align: center; background-color: #f8f9fa; border-radius: 0 0 10px 10px; border-top: 1px solid #e9ecef;">
              <p style="margin: 0; color: #666666; font-size: 12px;">
                This is an automated email. Please do not reply to this message.
              </p>
              <p style="margin: 10px 0 0 0; color: #666666; font-size: 12px;">
                © ${new Date().getFullYear()} ChefChain. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
  
  return emailHtml.trim();
}

/**
 * Generates a plain text version of the password reset email
 * @param {string} userEmail - The recipient's email address
 * @param {string} genericPassword - The generic password to include
 * @param {string} resetLink - The password reset link
 * @returns {string} - Plain text email content
 */
function generatePasswordResetEmailText(userEmail, genericPassword, resetLink) {
  const emailText = `
PASSWORD RESET REQUEST - ChefChain

Hello,

You have requested to reset your password for your ChefChain account. We've generated a temporary password for you and included a secure link to set a new password.

YOUR TEMPORARY PASSWORD: ${genericPassword}

You can use this password to sign in immediately, or use the link below to set a new password.

PASSWORD RESET LINK:
${resetLink}

Click the link above or copy and paste it into your browser to reset your password.

SECURITY NOTICE:
- This password reset link will expire in 24 hours
- If you didn't request this password reset, please ignore this email
- For security, change your password after signing in
- Never share your password or reset link with anyone

If you have any questions or concerns, please contact our support team.

Best regards,
The ChefChain Team

---
This is an automated email. Please do not reply to this message.
© ${new Date().getFullYear()} ChefChain. All rights reserved.
  `;
  
  return emailText.trim();
}

/**
 * Sends password reset email (simulated - ready for backend integration)
 * @param {string} email - Recipient email address
 * @param {string} genericPassword - Generic password to include
 * @param {string} resetLink - Password reset link
 * @returns {boolean} - Success status
 */
function sendPasswordResetEmail(email, genericPassword, resetLink) {
  // Generate email content
  const htmlContent = generatePasswordResetEmail(email, genericPassword, resetLink);
  const textContent = generatePasswordResetEmailText(email, genericPassword, resetLink);
  
  // Log email content (for demo purposes)
  console.log('='.repeat(60));
  console.log('PASSWORD RESET EMAIL');
  console.log('='.repeat(60));
  console.log('To:', email);
  console.log('Subject: Password Reset Request - ChefChain');
  console.log('\n--- HTML CONTENT ---');
  console.log(htmlContent);
  console.log('\n--- PLAIN TEXT CONTENT ---');
  console.log(textContent);
  console.log('='.repeat(60));
  
  // In a real application, you would:
  // 1. Use an email service (SendGrid, AWS SES, Mailgun, etc.)
  // 2. Make an API call to send the email
  // 3. Handle success/error responses
  // Example:
  // return await emailService.send({
  //   to: email,
  //   subject: 'Password Reset Request - ChefChain',
  //   html: htmlContent,
  //   text: textContent
  // });
  
  // For demo, we'll simulate success
  return true;
}

