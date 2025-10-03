import './css/styles.css';
import router from './js/router';

function applyAuthNavState() {
  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);
  const logoutButton = document.getElementById('logout-button');
  const profileLink =
    document.getElementById('profile-link') ||
    document.querySelector('a[href="/profile/"]');

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

  // Kjør routeren som før
  await router(window.location.pathname);

  // 🔁 Fallback: Hvis vi faktisk står på Home (DOM har #all-posts),
  // sørg for at home.js er importert. Import av samme modul to ganger
  // re-eksekverer ikke toppnivå (ESM cache), så dette er trygt.
  try {
    if (!window.__homeViewLoaded && document.getElementById('all-posts')) {
      await import('./js/views/home.js');
      window.__homeViewLoaded = true;
      // valgfritt: console.log('[home] loaded via fallback');
    }
  } catch (e) {
    console.warn('[app] fallback home import failed:', e);
  }
});
