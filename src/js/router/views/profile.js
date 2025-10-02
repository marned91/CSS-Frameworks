import { authGuard } from '../../utilities/authGuard';
import { readPostsByUser } from '../../api/post/read';
import { onDeletePost } from '../../ui/post/delete';
import { readProfile } from '../../api/profile/read';
import { showAlert } from '../../utilities/alertUser';
import { setLogoutListener } from '../../ui/global/logout';
import {
  showSkeletonLoader,
  hideSkeletonLoader,
} from '../../utilities/skeletonLoader';

authGuard();
setLogoutListener();

/**
 * Fetches the user's profile data and displays the username and avatar image.
 * If the profile data cannot be fetched, default text is displayed instead.
 *
 * @returns {Promise<void>} A promise that resolves when the profile data is successfully loaded and displayed.
 * @throws {Error} If there is an issue fetching profile data from the API.
 *
 * @example
 * displayProfileInfo().then(() => {
 *   // Profile information will be displayed
 * }).catch((error) => {
 *   console.error(error); // Handle error
 * });
 */

async function displayProfileInfo() {
  showSkeletonLoader();

  const userInfo = JSON.parse(localStorage.getItem('user'));
  const username = userInfo?.name;

  const avatarContainer = document.querySelector('#profile-image');
  const usernameContainer = document.querySelector('#username-info');

  try {
    const profile = await readProfile(username);

    usernameContainer.textContent = `${profile?.name}'s Profile`;

    const avatarImage = document.createElement('img');
    avatarImage.src = profile.avatar?.url || '/images/default-avatar.png';
    avatarImage.alt = profile.avatar?.alt || 'Default profile avatar';
    avatarImage.classList.add('profile-avatar');

    avatarContainer.innerHTML = '';
    avatarContainer.appendChild(avatarImage);
  } catch (error) {
    console.error('Error fetching profile data:', error);
    usernameContainer.textContent = 'Unable to load username.';
    avatarContainer.textContent = 'Avatar not available.';
  } finally {
    hideSkeletonLoader();
  }
}

displayProfileInfo();

/**
 * Fetches and displays the posts created by the user.
 * Each post includes its title, body snippet, creation date, tags, and buttons for editing and deleting the post.
 *
 * @returns {Promise<void>} A promise that resolves when the user's posts have been fetched and displayed.
 * @throws {Error} If there is an issue fetching posts from the API.
 *
 * @example
 * displayUserPosts().then(() => {
 *   // User's posts will be displayed
 * }).catch((error) => {
 *   console.error(error); // Handle error
 * });
 */
async function displayUserPosts() {
  showSkeletonLoader();
  const postContainer = document.querySelector('#user-posts');

  try {
    const { data } = await readPostsByUser(12, 1);

    data.forEach((post) => {
      const postElement = document.createElement('div');
      postElement.classList.add('user-post');

      const imageElement = document.createElement('img');
      imageElement.src = post.media?.url || '/images/default-post-image.png';
      imageElement.alt = post.title || 'Post image';
      imageElement.classList.add('user-post-image');
      postElement.appendChild(imageElement);

      const title = document.createElement('h3');
      title.textContent = post.title;
      title.classList.add('user-post-title');
      postElement.appendChild(title);

      const bodySnippet = document.createElement('p');
      const snippetText = post.body
        ? post.body.slice(0, 100) + '...'
        : 'No content available';
      bodySnippet.textContent = snippetText;
      bodySnippet.classList.add('user-post-snippet');
      postElement.appendChild(bodySnippet);

      const date = document.createElement('p');
      const postDate = new Date(post.created);
      date.textContent = `Posted ${postDate.toLocaleDateString()}`;
      date.classList.add('user-post-date');
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

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.classList.add('edit-button');
      editButton.addEventListener('click', (e) => {
        e.stopPropagation();
        window.location.href = `/post/edit/?id=${post.id}`;
      });
      postElement.appendChild(editButton);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-button');
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        onDeletePost(e, post.id, postElement);
      });

      postElement.appendChild(deleteButton);

      postElement.addEventListener('click', () => {
        window.location.href = `/post/?id=${post.id}`;
      });
      postContainer.appendChild(postElement);
    });
  } catch (error) {
    showAlert('Error fetching posts:' + error.message, 'error');
  } finally {
    hideSkeletonLoader();
  }
}

displayUserPosts();
