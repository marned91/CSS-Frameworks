import { readPost } from '../../api/post/read';
import { onUpdatePost } from '../../ui/post/update';
import { authGuard } from '../../utilities/authGuard';
import { showAlert } from '../../utilities/alertUser';
import { setLogoutListener } from '../../ui/global/logout';

authGuard();
setLogoutListener();

/**
 * Loads the data for the post specified by the given post ID and populates the edit form with the data.
 * If the post does not exist, an alert is shown, and the form is not populated.
 *
 * @param {number} postId - The ID of the post to load data for.
 * @returns {Promise<void>} A promise that resolves when the post data has been successfully loaded and the form populated.
 * @throws {Error} If there is an issue loading the post data from the API.
 *
 * @example
 * loadPostData(123).then(() => {
 *   // Post data will be loaded and form populated.
 * }).catch((error) => {
 *   console.error(error); // Handle the error
 * });
 */
async function loadPostData(postId) {
  try {
    const post = await readPost(postId);
    populateForm(post);
    if (!post) {
      showAlert("The post you're trying to edit does not exist.", 'info');
      return;
    }
    populateForm(post);
  } catch (error) {
    console.error('Error loading post data:', error);
    showAlert('Failed to load post data.', 'error');
  }
}

/**
 * Populates the form fields with the post data.
 *
 * @function
 * @param {Object} post - The post data to populate the form with.
 * @param {string} post.title - The title of the post.
 * @param {string} post.body - The body content of the post.
 * @param {Object} [post.media] - The media object associated with the post.
 * @param {string} post.media.url - The URL of the media.
 * @param {Array<string>} post.tags - The tags associated with the post.
 *
 * @example
 * const post = {
 *   title: "My Post",
 *   body: "This is the content.",
 *   media: { url: "https://example.com/image.jpg" },
 *   tags: ["JavaScript", "Coding"]
 * };
 * populateForm(post);
 */
function populateForm(post) {
  document.querySelector('#title').value = post.title || '';
  document.querySelector('#body').value = post.body || '';
  document.querySelector('#mediaUrl').value = post.media?.url || '';
  document.querySelector('#tags').value = post.tags.join(',');
}

const params = new URLSearchParams(window.location.search);
const postId = params.get('id');

loadPostData(postId);

const form = document.getElementById('edit-post-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    onUpdatePost(event, postId);
  });
} else {
  showAlert(
    'Oops! We could not find a form on the page. Please refresh the page and try again',
    'info'
  );
}
