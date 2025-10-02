/**
 * Functions you attach to logout events that calls ui/auth/logout function
 */

import { onLogout } from '../auth/logout';

export function setLogoutListener() {
  const logoutButton = document.querySelector('#logout-button');

  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      onLogout();
    });
  }
}
