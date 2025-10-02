import { createPost } from '../../api/post/create';
import { suggestTags } from '../../utilities/suggestTags';
import { showAlert } from '../../utilities/alertUser';
import { setLogoutListener } from '../global/logout';

setLogoutListener();
/**
 * This function collects the title, body, and media URL from the form elements, generates tags using
 * the `suggestTags` function based on the title, and constructs the `postData` object.
 * It ensures that the body does not exceed 280 characters before sending the data.
 * Upon successful creation, the function alerts the user, resets the form, and redirects to the user's profile page.
 *
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} A promise that resolves when the new post is created successfully.
 */

export async function onCreatePost(event) {
  event.preventDefault();

  const { title, body, mediaUrl } = event.target.elements;

  const tags = suggestTags(title.value);

  const media = { url: mediaUrl.value, alt: title.value };

  const postData = { title: title.value, body: body.value, tags, media };

  if (body.value.length > 280) {
    showAlert('The body of the post cannot exceed 280 characters.', 'error');
    return;
  }

  try {
    const newPost = await createPost(postData);
    showAlert('Success! You just created a new post', 'success');
    event.target.reset();
    setTimeout(() => (window.location.pathname = '/profile/'), 2000);
  } catch (error) {
    console.error('Error:', error);
    showAlert(
      `Failed to create new post. Please try again. Error: ${error.message}`,
      'error'
    );
  }
}
