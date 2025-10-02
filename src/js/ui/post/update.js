import { updatePost } from '../../api/post/update';
import { suggestTags } from '../../utilities/suggestTags';
import { showAlert } from '../../utilities/alertUser';
import { setLogoutListener } from '../global/logout';

setLogoutListener();
/**
 * Handles the update of a blog post by collecting data from the form and passing it to the `updatePost` function.
 * The function allows for updating the title, body, media URL, and tags of an existing post.
 * Upon successful update, it alerts the user and redirects to the profile page.
 * If an error occurs during the update process, an error message is displayed.
 *
 * @function onUpdatePost
 * @param {Event} event - The event triggered by submitting the post edit form.
 * @param {string} postId - The ID of the post to be updated.
 * @returns {Promise<void>} A promise that resolves when the post has been successfully updated.
 */
export async function onUpdatePost(event, postId) {
  event.preventDefault();

  const form = event.target;
  const fieldset = form.querySelector('fieldset');
  const button = form.querySelector('button');
  const originalButtonText = button.textContent;

  fieldset.disabled = true;
  button.disabled = true;
  button.textContent = 'Updating post...';

  const title = document.querySelector('#title').value.trim();
  const body = document.querySelector('#body').value.trim();
  const mediaUrl = document.querySelector('#mediaUrl').value.trim();
  const tagInput = document.querySelector('#tags').value.trim();
  const tags = tagInput
    ? tagInput.split(',').map((tag) => tag.trim())
    : suggestedTags;

  const suggestedTags = suggestTags(title);

  const updatedForm = {
    ...(title && { title }),
    ...(body && { body }),
    ...(mediaUrl && { media: { url: mediaUrl } }),
    ...(tags.length > 0 && { tags }),
  };

  try {
    await updatePost(postId, updatedForm);
    showAlert('Post updated successfully!', 'success');
  } catch (error) {
    console.error('Error during post update:', error);
    showAlert(
      'An error occurred while updating the post. Please refresh the page and try again',
      'error'
    );
  } finally {
    fieldset.disabled = false;
    button.disabled = false;
    button.textContent = originalButtonText;
  }
}
