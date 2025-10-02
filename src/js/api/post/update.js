import { API_SOCIAL_POSTS, API_KEY } from '../constants';

/**
 * Updates an existing post by sending updated data to the API.
 *
 * Sends a PUT request to update an existing post with new data, such as title, body, media, and tags.
 * Only the fields that are provided will be updated. Returns the updated post data from the API.
 *
 * @param {number} id - The ID of the post to update.
 * @param {Object} params - The updated post parameters.
 * @param {string} [params.title] - The updated title of the post (optional).
 * @param {string} [params.body] - The updated body of the post (optional).
 * @param {string[]} [params.tags] - Array of updated tags associated with the post (optional).
 * @param {Object} [params.media] - Updated media object containing URL and alt text (optional).
 * @param {string} [params.media.url] - The updated URL of the media.
 * @param {string} [params.media.alt] - Updated alt text for the media.
 * @returns {Promise<Object>} The updated post data from the API.
 * @throws {Error} If the API request fails.
 *
 * @example
 * // Updating a post with ID 123, changing the title, body, and media URL
 * const updatedPost = await updatePost(123, {
 *   title: "Updated Post Title",
 *   body: "Updated body content.",
 *   media: {
 *     url: "https://new-image.com/image.jpg",
 *     alt: "Updated image alt text"
 *   },
 *   tags: ["javascript", "webdev"]
 * });
 */
export async function updatePost(id, { title, body, media, tags }) {
  const endPoint = `${API_SOCIAL_POSTS}/${id}`;
  const token = localStorage.getItem('token');

  const postData = {
    ...(title && { title }),
    ...(body && { body }),
    ...(media && { media }),
    ...(tags.length > 0 && { tags }),
  };

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'X-Noroff-API-Key': API_KEY,
  };

  try {
    const response = await fetch(endPoint, {
      method: 'PUT',
      headers,
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      const updatedPost = await response.json();
      return updatedPost;
    } else {
      const errorResponse = await response.json();
      throw new Error(
        `Failed to update post: ${errorResponse.message || response.statusText}`
      );
    }
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}
