/**
 * Reads the profile of a specific user by fetching data from the API.
 *
 * Sends a GET request to fetch the profile of a user specified by their username.
 * Returns the profile data if the request is successful, otherwise throws an error.
 *
 * @param {string} username - The username of the user whose profile is being fetched.
 * @returns {Promise<Object>} The profile data of the specified user, including fields like `username`, `bio`, etc.
 * @throws {Error} If the API request fails or the profile cannot be found.
 *
 * @example
 * const profile = await readProfile("johndoe");
 * // Output: { username: "johndoe", bio: "Developer", ... }
 */

import { API_SOCIAL_PROFILES, API_KEY } from '../constants';

export async function readProfile(username) {
  const profileUrl = `${API_SOCIAL_PROFILES}/${username}`;

  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'X-Noroff-API-Key': API_KEY,
  };

  try {
    const response = await fetch(profileUrl, {
      method: 'GET',
      headers,
    });

    if (response.ok) {
      const { data } = await response.json();
      return data;
    } else {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.message || 'Failed to fetch author profile'
      );
    }
  } catch (error) {
    console.error('Failed to fetch profile details', error);
    throw error;
  }
}

export async function readProfiles(limit, page) {}
