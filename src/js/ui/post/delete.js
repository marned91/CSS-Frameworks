import { deletePost } from '../../api/post/delete';
import { showAlert } from '../../utilities/alertUser';

/**
 * Handles the deletion of a blog post by passing the post ID to the `deletePost` function.
 * This function prompts the user for confirmation before proceeding with the deletion.
 * Upon successful deletion, it alerts the user and reloads the page.
 * If an error occurs during the deletion process, an error message is displayed.
 *
 * @function onDeletePost
 * @param {Event} event - The event triggered by clicking the delete button.
 * @param {string} postId - The ID of the post to be deleted.
 * @returns {Promise<void>} A promise that resolves when the post has been successfully deleted.
 */
export async function onDeletePost(event, postId) {
  event.preventDefault();

  const modal = document.getElementById('delete-modal');
  modal.classList.remove('hidden');

  document.getElementById('cancel-btn').addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  document.getElementById('confirm-btn').addEventListener('click', async () => {
    try {
      await deletePost(postId);
      showAlert('Your post was successfully deleted!', 'success');
      window.location.reload();
    } catch (error) {
      console.error('Error during post deletion:', error);
      showAlert(
        'An error occurred while deleting the post. Please try again.',
        'error'
      );
    } finally {
      modal.classList.add('hidden');
    }
  });
}
