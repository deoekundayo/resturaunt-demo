// Shared auth UI behavior for header buttons.
// - Before login: show Sign In, hide Sign Out
// - After login: hide Sign In, show Sign Out
// - Sign Out clears session and redirects to sign-in page
document.addEventListener('DOMContentLoaded', function () {
  const isAuthenticated = sessionStorage.getItem('authenticated') === 'true';
  const authAreas = document.querySelectorAll('.auth-buttons');

  authAreas.forEach(function (area) {
    const signInBtn = area.querySelector('.signin');
    const signOutBtn = area.querySelector('.signout');

    if (signInBtn) {
      signInBtn.style.display = isAuthenticated ? 'none' : 'inline-flex';
    }

    if (signOutBtn) {
      signOutBtn.style.display = isAuthenticated ? 'inline-flex' : 'none';
      signOutBtn.onclick = function () {
        sessionStorage.removeItem('authenticated');
        sessionStorage.removeItem('user');
        window.location.href = 'sign-in.html';
      };
    }
  });
});
