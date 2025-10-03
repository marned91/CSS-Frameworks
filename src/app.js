import './css/styles.css';
import router from './js/router';

/**
 * Toggle nav based on token in localStorage.
 */
function applyAuthNavState() {
  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);

  const logoutButton = document.getElementById('logout-button');
  const profileLink =
    document.getElementById('profile-link') ||
    document.querySelector('a[href="/profile/"]');

  const loginLink =
    document.getElementById('login-link') ||
    document.querySelector('a[href="/auth/login/"]');
  const joinLink =
    document.getElementById('join-link') ||
    document.querySelector('a[href="/auth/register/"]');

  const hide = (el) => el && el.classList.add('hidden');
  const show = (el) => el && el.classList.remove('hidden');

  if (isLoggedIn) {
    show(logoutButton);
    show(profileLink);
    hide(loginLink);
    hide(joinLink);
  } else {
    hide(logoutButton);
    hide(profileLink);
    show(loginLink);
    show(joinLink);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  applyAuthNavState();
  await router(window.location.pathname);
});
