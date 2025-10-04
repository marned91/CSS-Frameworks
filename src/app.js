import './css/styles.css';
import router from './js/router';

/**
 * Toggle nav based on token in localStorage.
 */
function applyAuthNavState() {
  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);

  const loginItem =
    document.getElementById('login-item') ||
    document.getElementById('login-link')?.closest('li');
  const joinItem =
    document.getElementById('join-item') ||
    document.getElementById('join-link')?.closest('li');
  const logoutItem =
    document.getElementById('logout-item') ||
    document.getElementById('logout-button')?.closest('li');
  const profileItem =
    document.getElementById('profile-item') ||
    document.getElementById('profile-link')?.closest('li');

  const hide = (el) => el && el.classList.add('hidden');
  const show = (el) => el && el.classList.remove('hidden');

  if (isLoggedIn) {
    show(logoutItem);
    show(profileItem);
    hide(loginItem);
    hide(joinItem);
  } else {
    hide(logoutItem);
    hide(profileItem);
    show(loginItem);
    show(joinItem);
  }

  ['login-link', 'join-link', 'logout-button', 'profile-link'].forEach((id) =>
    document.getElementById(id)?.classList.remove('hidden')
  );
}
document.addEventListener('DOMContentLoaded', async () => {
  console.log('[app] boot', window.location.pathname);
  applyAuthNavState();
  await router(window.location.pathname);
});
