import { readPost } from '../../api/post/read';
import { showAlert } from '../../utilities/alertUser';
import { setLogoutListener } from '../../ui/global/logout';
import {
  showSkeletonLoader,
  hideSkeletonLoader,
} from '../../utilities/skeletonLoader';

setLogoutListener();

/**
 * Fetches and displays the full details of a single post on the page.
 * The post is fetched using its ID from the URL query parameters and then
 * displayed with its title, author, creation date, image, body, and tags.
 *
 * @returns {Promise<void>} A promise that resolves when the full post has been displayed.
 * @throws {Error} If the post cannot be fetched or an error occurs while displaying it.
 *
 * @example
 * // Fetching and displaying the full post with ID from the URL
 * await displayFullPost();
 */

async function displayFullPost() {
  const postContainer = document.querySelector('#full-post');
  const params = new URLSearchParams(window.location.search);
  const postId = params.get('id');

  try {
    postContainer.classList.add('hidden');
    showSkeletonLoader();
    const postData = await readPost(postId, true);

    const titleElement = document.createElement('h1');
    titleElement.textContent = postData.title;
    titleElement.classList.add('full-post-title');
    postContainer.appendChild(titleElement);

    const authorElement = document.createElement('p');
    const authorName = postData.author?.name || 'Unknown user';
    authorElement.textContent = `Written by: ${authorName}`;
    authorElement.classList.add('full-post-author');
    postContainer.appendChild(authorElement);

    const createdDate = new Date(postData.created);
    const dateElement = document.createElement('p');
    dateElement.textContent = `Posted ${createdDate.toLocaleDateString()}`;
    dateElement.classList.add('full-post-date');
    postContainer.appendChild(dateElement);

    const imageElement = document.createElement('img');
    if (postData.media && postData.media.url) {
      imageElement.src = postData.media.url;
      imageElement.alt = postData.media.alt || postData.title;
    } else {
      imageElement.src = '/images/default-post-image.png';
      imageElement.alt = 'Default post image. Illustration of a cat painting';
    }
    imageElement.classList.add('full-post-image');
    postContainer.appendChild(imageElement);

    const bodyContainer = document.createElement('div');
    bodyContainer.classList.add('full-post-body-container');

    const bodyElement = document.createElement('p');
    bodyElement.classList.add('full-post-body');

    if (postData.body && postData.body.trim()) {
      bodyElement.textContent = postData.body;
    } else {
      bodyElement.classList.add('full-post-body-empty');
    }

    bodyContainer.appendChild(bodyElement);
    postContainer.appendChild(bodyContainer);

    const tagsElement = document.createElement('div');
    tagsElement.classList.add('full-post-tags');

    if (Array.isArray(postData.tags) && postData.tags.length > 0) {
      postData.tags.forEach((tag) => {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tag;
        tagSpan.classList.add('tag-item');
        tagsElement.appendChild(tagSpan);
      });
    } else {
      const noTagsText = document.createElement('span');
      noTagsText.textContent = 'No tags🥲';
      noTagsText.classList.add('no-tags');
      tagsElement.appendChild(noTagsText);
    }

    postContainer.appendChild(tagsElement);
  } catch (error) {
    showAlert('Error loading post:' + error.message, 'error');
  } finally {
    postContainer.classList.remove('hidden');
    hideSkeletonLoader();
  }
}

displayFullPost();
