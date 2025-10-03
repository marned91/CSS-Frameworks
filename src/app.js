console.log('[app] boot', window.location.pathname);
import './css/styles.css';
import router from './js/router';

(async () => {
  await router(window.location.pathname);
})();
