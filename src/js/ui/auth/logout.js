/**
 * This function should log the user out by removing aproppriate user data from the browser.
 * This includes the removal of the user's token and user information.
 * After logging out, it alerts the user and redirects them to the login page.
 *
 * @function onLogout
 * @returns {void} This function does not return a value.
 */

import { showAlert } from '../../utilities/alertUser';

export function onLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  showAlert('You have been logged out', 'info');

  setTimeout(() => (window.location.pathname = '/auth/'), 2000);
}
