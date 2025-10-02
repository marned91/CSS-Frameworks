import { API_SOCIAL_POSTS, API_KEY } from '../constants';
/**
 * Deletes a post by its ID.
 *
 * Sends a DELETE request to the API to delete a post with the specified ID.
 * If the deletion is successful, no value is returned (204 No Content).
 * If the request fails, an error is thrown with a relevant failure message.
 *
 * @param {number} id The ID of the post to delete. This should be an integer (e.g., 123).
 * @returns {void}  This function does not return any value upon successful deletion (204 No Content).
 * @throws {Error} If the API request fails, an error is thrown with the failure message.
 *
 * @example
 * try {
 *   await deletePost(123); // Replace 123 with the actual post ID
 *   // Handle successful deletion here
 * } catch (error) {
 *   // Handle error here
 * }
 */
export async function deletePost(id) {
  const deleteEndPoint = `${API_SOCIAL_POSTS}/${id}`;
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'X-Noroff-API-Key': API_KEY,
  };

  try {
    const response = await fetch(deleteEndPoint, {
      method: 'DELETE',
      headers,
    });

    if (response.ok) {
      return;
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Failed to delete post');
    }
  } catch (error) {
    console.error('Failed to delete post', error);
    throw error;
  }
}
