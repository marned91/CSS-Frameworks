import { onLogin } from '../../ui/auth/login';

/**
 * Wire up the login form if present.
 * Works with either <form name="login"> or <form id="login-form">.
 */
const loginForm =
  (document.forms && document.forms.login) ||
  document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', onLogin);
} else {
  console.warn('[login] form not found in DOM');
}
