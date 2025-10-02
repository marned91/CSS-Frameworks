import { API_AUTH_LOGIN } from '../constants';
/**
 * Logs in a user with the provided email and password.
 *
 * This function sends a POST request to the login API, passing the user's email and password in the request body.
 * If the login is successful, the response containing an access token and user data is saved to localStorage.
 *
 * @param {Object} data - The login data.
 * @param {string} data.email - The user's email address.
 * @param {string} data.password - The user's password.
 * @returns {Promise<Object>} A promise that resolves to the user's login response.
 * @throws {Error} Error if the login fails.
 *
 * @example
 * const loginData = { email: "user@example.com", password: "password123" };
 *
 * try {
 *   const userData = await login(loginData);
 *   // Handle successful login here
 * } catch (error) {
 *   // Handle login error here
 * }
 */

export async function login({ email, password }) {
  const body = JSON.stringify({ email, password });

  try {
    const response = await fetch(API_AUTH_LOGIN, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body,
    });

    if (response.ok) {
      const { data } = await response.json();
      const { accessToken: token, ...user } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return data;
    }

    throw new Error('Could not log in with this account');
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}
