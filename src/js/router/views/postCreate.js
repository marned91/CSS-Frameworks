import { onCreatePost } from '../../ui/post/create';
import { authGuard } from '../../utilities/authGuard';

authGuard();

const form = document.getElementById('create-post-form');

form.addEventListener('submit', async function (event) {
  const fieldset = form.querySelector('fieldset');
  const button = form.querySelector('button');
  const originalButtonText = button.textContent;

  fieldset.disabled = true;
  button.textContent = 'Creating post...';

  try {
    await onCreatePost(event);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    fieldset.disabled = false;
    button.textContent = originalButtonText;
  }
});
