import { API_SOCIAL_POSTS, API_SOCIAL_PROFILES, API_KEY } from '../constants';
/**
 * Reads a single post by its ID.
 *
 * Sends a GET request to fetch a post by its ID. Optionally includes the author's information.
 * If the request is successful, the post data is returned.
 *
 * @param {number} id - The ID of the post to retrieve.
 * @param {boolean} [includeAuthor=false] - Optional flag to include author data in the response.
 * @returns {Promise<object>} The retrieved post data.
 * @throws {Error} If the API request fails.
 *
 * @example
 * // Fetching a post with ID 1 and including author information
 * const postWithAuthor = await readPost(1, true);
 */
export async function readPost(id, includeAuthor = false) {
  let postUrl = `${API_SOCIAL_POSTS}/${id}`;
  const token = localStorage.getItem('token');

  if (includeAuthor) {
    postUrl += '?_author=true';
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'X-Noroff-API-Key': API_KEY,
  };

  try {
    const response = await fetch(postUrl, {
      method: 'GET',
      headers,
    });

    if (response.ok) {
      const { data } = await response.json();
      return data;
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Failed to fetch post');
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Reads multiple posts with optional pagination, tagging, and author information.
 *
 * Sends a GET request to retrieve a list of posts. Supports optional pagination, filtering by tags,
 * and including author information. Returns an object with the posts (`data`) and pagination metadata (`meta`).
 *
 * @param {number} [limit=12] - The maximum number of posts to retrieve per page.
 * @param {number} [page=1] - The page number to retrieve.
 * @param {string} [tag] - An optional tag to filter the posts.
 * @param {boolean} [includeAuthor=true] - Flag to include author information. Default is true.
 * @returns {Promise<object>} An object containing `data` (array of posts) and `meta` (pagination info).
 * @throws {Error} If the API request fails.
 *
 * @example
 * // Fetch the first page of posts, limiting to 10 posts per page, and filtering by the "javascript" tag
 * const posts = await readPosts(10, 1, "javascript");
 */
export async function readPosts(
  limit = 12,
  page = 1,
  tag,
  includeAuthor = true
) {
  let allPostsUrl = `${API_SOCIAL_POSTS}`;

  const params = new URLSearchParams();

  if (limit) params.append('limit', limit);
  if (page) params.append('page', page);
  if (tag) params.append('tag', tag);
  if (includeAuthor) params.append('_author', true);

  if (params.toString()) {
    allPostsUrl += `?${params.toString()}`;
  }

  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'X-Noroff-API-Key': API_KEY,
  };

  try {
    const response = await fetch(allPostsUrl, {
      method: 'GET',
      headers,
    });

    if (response.ok) {
      const { data, meta } = await response.json();
      return { data, meta };
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to fetch users's posts");
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Reads multiple posts by a specific user with optional pagination, tagging, and author inclusion.
 *
 * Sends a GET request to retrieve posts created by a specific user. Supports optional pagination,
 * filtering by tags, and including author information. Returns an object with the posts (`data`)
 * and pagination metadata (`meta`).
 *
 * @param {string} username - The username of the user whose posts are to be retrieved.
 * @param {number} [limit=12] - The maximum number of posts to retrieve per page.
 * @param {number} [page=1] - The page number to retrieve.
 * @param {string} [tag] - An optional tag to filter the user's posts.
 * @param {boolean} [includeAuthor=true] - Flag to include author information. Default is true.
 * @returns {Promise<object>} An object containing `data` (array of posts) and `meta` (pagination info).
 * @throws {Error} If the API request fails.
 *
 * @example
 * // Fetch the first page of posts for user "john_doe", limiting to 10 posts per page
 * const userPosts = await readPostsByUser("john_doe", 10, 1, "javascript");
 */
export async function readPostsByUser(
  limit = 12,
  page = 1,
  tag,
  includeAuthor = true
) {
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user?.name;

  let profilePostsUrl = `${API_SOCIAL_PROFILES}/${username}/posts`;

  const params = new URLSearchParams();

  if (limit) params.append('limit', limit);
  if (page) params.append('page', page);
  if (tag) params.append('tag', tag);
  if (includeAuthor) params.append('_author', true);

  if (params.toString()) {
    profilePostsUrl += `?${params.toString()}`;
  }

  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    'X-Noroff-API-Key': API_KEY,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await fetch(profilePostsUrl, {
      method: 'GET',
      headers,
    });

    if (response.ok) {
      const { data, meta } = await response.json();
      return { data, meta };
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to fetch users's posts");
    }
  } catch (error) {
    throw error;
  }
}
