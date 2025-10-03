console.log('[app] boot', window.location.pathname);
import './css/styles.css';
import router from './js/router';

(async () => {
  await router(window.location.pathname);
})();

/**
 * Toggle nav based on token in localStorage.
 */
function applyAuthNavState() {
  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);
  const logoutButton = document.getElementById('logout-button');
  const profileLink = document.getElementById('profile-link');

  const hide = (el) => el && el.classList.add('hidden');
  const show = (el) => el && el.classList.remove('hidden');

  if (isLoggedIn) {
    show(logoutButton);
    show(profileLink);
  } else {
    hide(logoutButton);
    hide(profileLink);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  applyAuthNavState();
  await router(window.location.pathname);
});
