import { API_KEY, API_SOCIAL_POSTS } from '../constants';

/**
 * Creates a new post by sending the data to the API.
 *
 * This function sends a POST request to create a new post with a title, optional body, tags, and media.
 * It includes authentication using a token stored in localStorage. If the post is successfully created,
 * the returned post data is resolved. If the request fails, an error is thrown.
 *
 * @param {Object} data - The post parameters.
 * @param {string} data.title - The title of the post (required).
 * @param {string} [data.body] - The body of the post (optional).
 * @param {string[]} [data.tags] - Array of tags associated with the post (optional).
 * @param {Object} [data.media] - Media object containing URL and alt text (optional).
 * @param {string} [data.media.url] - The URL of the media (optional).
 * @param {string} [data.media.alt] - Alt text for the media (optional).
 * @returns {Promise<Object>} The created post data from the API.
 * @throws {Error} If the API request fails an unexpected error occurs.
 *
 * @example
 * const postData = {
 *   title: "My New Post",
 *   body: "This is the body of the post",
 *   tags: ["tech", "programming"],
 *   media: { url: "https://example.com/image.jpg", alt: "Post Image" }
 * };
 *
 * try {
 *   const createdPost = await createPost(postData);
 *   // Handle the created post here
 * } catch (error) {
 *   // Handle the error here
 * }
 */
export async function createPost({ title, body, tags, media }) {
  const token = localStorage.getItem('token');

  const postData = {
    title,
    body,
    tags,
    media,
  };

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'X-Noroff-API-Key': API_KEY,
  };

  try {
    const response = await fetch(API_SOCIAL_POSTS, {
      method: 'POST',
      headers,
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      const { data } = await response.json();
      return data;
    }
    const errorResponse = await response.json();
    throw new Error(
      errorResponse.message ||
        'An unexpected error occurred while creating the post. Please try again.'
    );
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}
