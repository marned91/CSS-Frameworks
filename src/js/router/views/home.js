import { authGuard } from '../../utilities/authGuard';
import { setLogoutListener } from '../../ui/global/logout';
import { readPosts } from '../../api/post/read';
import { showAlert } from '../../utilities/alertUser';
import {
  showSkeletonLoader,
  hideSkeletonLoader,
} from '../../utilities/skeletonLoader';

authGuard();
setLogoutListener();

/**
 * Fetches and displays a list of posts on the page.
 * If a search query is provided, it filters the posts based on their title. Search query from title only.
 * It fetches the latest posts from the API, filters them if needed.
 *
 * @param {string} [query=""] - The search query to filter posts by title (case-insensitive).
 * @returns {Promise<void>} A promise that resolves when posts have been displayed.
 * @throws {Error} If the posts could not be fetched.
 *
 */

async function displayPosts(query = '') {
  const postContainer = document.querySelector('#all-posts');

  try {
    showSkeletonLoader();

    const { data } = await readPosts(12, 1);

    const filteredPosts = query
      ? data.filter((post) =>
          post.title.toLowerCase().includes(query.toLowerCase())
        )
      : data;

    postContainer.innerHTML = '';

    filteredPosts.forEach((post) => {
      const postElement = createPostElement(post);
      postContainer.appendChild(postElement);
    });
    if (filteredPosts.length === 0) {
      const noSearchResultMessage = document.createElement('p');
      noSearchResultMessage.textContent =
        'No posts found. Try searching for something else!';
      postContainer.appendChild(noSearchResultMessage);
    }
  } catch (error) {
    showAlert('Error fetching posts:' + error.message, 'error');
  } finally {
    hideSkeletonLoader();
  }
}

/**
 * Creates an HTML element for a single post and its content.
 *
 * @param {Object} post - The post data object.
 * @param {string} post.title - The title of the post.
 * @param {string} post.body - The body content of the post.
 * @param {string[]} [post.tags] - The tags associated with the post.
 * @param {string} post.created - The creation date of the post.
 * @param {string} post.id - The ID of the post.
 * @returns {HTMLElement} The created HTML element representing the post.
 *
 * @example
 * const postElement = createPostElement({ title: "My Post", body: "This is a post", tags: ["tag1"], created: "2024-11-29T10:00:00Z", id: "123" });
 * document.body.appendChild(postElement); // Adds the post element to the page
 */
function createPostElement(post) {
  const postElement = document.createElement('div');
  postElement.classList.add('post');

  const imageElement = document.createElement('img');
  imageElement.src = post.media?.url || '/images/default-post-image.png';
  imageElement.alt = post.title || 'Post Image';
  imageElement.classList.add('post-image');
  postElement.appendChild(imageElement);

  const title = document.createElement('h3');
  title.textContent = post.title;
  title.classList.add('post-h3');
  postElement.appendChild(title);

  const bodySippet = document.createElement('p');
  const snippetText = post.body
    ? post.body.slice(0, 100) + '...'
    : 'No content available';
  bodySippet.textContent = snippetText;
  bodySippet.classList.add('post-body');
  postElement.appendChild(bodySippet);

  const date = document.createElement('p');
  const postDate = new Date(post.created);
  date.textContent = `Posted ${postDate.toLocaleDateString()}`;
  date.classList.add('post-date');
  postElement.appendChild(date);

  const tagsElement = document.createElement('div');
  tagsElement.classList.add('snippet-post-tags');

  if (Array.isArray(post.tags) && post.tags.length > 0) {
    post.tags.forEach((tag) => {
      const tagSpan = document.createElement('span');
      tagSpan.textContent = tag;
      tagSpan.classList.add('snippet-post-tag-item');
      tagsElement.appendChild(tagSpan);
    });
  } else {
    const noTagsText = document.createElement('span');
    noTagsText.textContent = 'No tags🥲';
    noTagsText.classList.add('snippet-post-no-tags');
    tagsElement.appendChild(noTagsText);
  }
  postElement.appendChild(tagsElement);

  postElement.addEventListener('click', () => {
    window.location.href = `/post/?id=${post.id}`;
  });

  return postElement;
}

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

const handleSearch = async () => {
  const query = searchInput.value.trim();
  displayPosts(query || '');
};

searchButton.addEventListener('click', handleSearch);

displayPosts();
