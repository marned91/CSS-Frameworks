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
 * Number of posts to request per page.
 * @type {number}
 */
const POSTS_PER_PAGE = 12;

/**
 * Current page number (1-based).
 * @type {number}
 */
let currentPageNumber = 1;

/**
 * Maximum number of pages the UI will allow.
 * @type {number}
 */
const MAX_VISIBLE_PAGES = 50;

/**
 * Latest pagination metadata returned by the API.
 * Mirrors the `meta` object from the endpoint.
 * @type {{
 *   isFirstPage: boolean,
 *   isLastPage: boolean,
 *   currentPage: number,
 *   previousPage: number|null,
 *   nextPage: number|null,
 *   pageCount: number,
 *   totalCount: number
 * }}
 */
let paginationInfo = {
  isFirstPage: true,
  isLastPage: true,
  currentPage: 1,
  previousPage: null,
  nextPage: null,
  pageCount: 1,
  totalCount: 0,
};

const previousPageButton = document.getElementById('prevBtn');
const nextPageButton = document.getElementById('nextBtn');
const paginationStatusText = document.getElementById('pageInfo');

/**
 * Update the pagination UI state (buttons and status text), capped by MAX_VISIBLE_PAGES.
 * Displays status as "current/total" (e.g., "1/50").
 * @param {object} meta - Pagination info returned by the API.
 * @param {boolean} [meta.isFirstPage]
 * @param {boolean} [meta.isLastPage]
 * @param {number}  [meta.currentPage]
 * @param {number|null} [meta.previousPage]
 * @param {number|null} [meta.nextPage]
 * @param {number}  [meta.pageCount]
 * @param {number}  [meta.totalCount]
 * @returns {void}
 */
function updatePaginationUI(meta) {
  paginationInfo = meta || paginationInfo;

  const current = meta?.currentPage ?? currentPageNumber;
  const totalPagesFromMeta = meta?.pageCount ?? 1;
  const effectivePageCount = Math.min(totalPagesFromMeta, MAX_VISIBLE_PAGES);

  if (previousPageButton) {
    previousPageButton.disabled =
      current <= 1 || meta?.previousPage == null || Boolean(meta?.isFirstPage);
  }

  if (nextPageButton) {
    nextPageButton.disabled =
      current >= effectivePageCount ||
      meta?.nextPage == null ||
      Boolean(meta?.isLastPage);
  }

  if (paginationStatusText) {
    paginationStatusText.textContent = `${current}/${effectivePageCount}`;
  }
}

/**
 * Scroll to the top of the posts list (smooth).
 * @returns {void}
 */
function scrollToTopOfPostList() {
  const container = document.querySelector('#all-posts');
  if (container && typeof container.scrollIntoView === 'function') {
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/**
 * Navigate to a specific page number and re-render the list, capped by MAX_VISIBLE_PAGES.
 * @param {number} pageNumber - Target page (1-based).
 * @param {string} [searchQuery=""] - Optional title filter (client-side).
 * @returns {Promise<void>}
 */
function navigateToPage(pageNumber, searchQuery = '') {
  const knownTotalPages = paginationInfo?.pageCount ?? Number.POSITIVE_INFINITY;
  const maxAllowedPage = Math.min(knownTotalPages, MAX_VISIBLE_PAGES);

  const clampedPage = Math.min(Math.max(1, pageNumber), maxAllowedPage);
  currentPageNumber = clampedPage;

  scrollToTopOfPostList();
  return renderPosts(searchQuery);
}

/**
 * Fetch and render the posts list on the home page.
 * Client-side search filters titles within the current page only.
 *
 * @param {string} [searchQuery=""] - Case-insensitive title filter.
 * @returns {Promise<void>}
 * @throws {Error} If fetching posts fails.
 */
async function renderPosts(searchQuery = '') {
  const postListContainer = document.querySelector('#all-posts');

  try {
    showSkeletonLoader();

    const token = localStorage.getItem('token');
    const includeAuthor = Boolean(token);
    const { data, meta } = await readPosts(
      POSTS_PER_PAGE,
      currentPageNumber,
      undefined,
      includeAuthor
    );

    const visiblePosts = searchQuery
      ? data.filter((post) =>
          (post.title || '').toLowerCase().includes(searchQuery.toLowerCase())
        )
      : data;

    postListContainer.innerHTML = '';

    visiblePosts.forEach((post) => {
      const postCardElement = createPostCardElement(post);
      postListContainer.appendChild(postCardElement);
    });

    if (visiblePosts.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent =
        'No posts found. Try searching for something else!';
      postListContainer.appendChild(emptyMessage);
    }

    if (meta) {
      updatePaginationUI(meta);
    }
  } catch (error) {
    showAlert('Error fetching posts: ' + error.message, 'error');
  } finally {
    hideSkeletonLoader();
  }
}

/**
 * Create a DOM node representing a single post card.
 *
 * @param {Object} post - The post data object.
 * @param {string} post.title - The title of the post.
 * @param {string} post.body - The body content of the post.
 * @param {string[]} [post.tags] - Tags associated with the post.
 * @param {string} post.created - ISO date string when the post was created.
 * @param {string} post.id - The unique post ID.
 * @returns {HTMLElement} The post card element.
 *
 * @example
 * const el = createPostCardElement({ title: "Hello", body: "World", tags: [], created: "2024-11-29T10:00:00Z", id: "123" });
 * document.body.appendChild(el);
 */
function createPostCardElement(post) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('post');

  const image = document.createElement('img');
  image.src = post.media?.url || '/images/default-post-image.png';
  image.alt = post.title || 'Post Image';
  image.classList.add('post-image');
  wrapper.appendChild(image);

  const title = document.createElement('h3');
  title.textContent = post.title;
  title.classList.add('post-h3');
  wrapper.appendChild(title);

  const bodySnippet = document.createElement('p');
  const snippetText = post.body
    ? post.body.slice(0, 100) + '...'
    : 'No content available';
  bodySnippet.textContent = snippetText;
  bodySnippet.classList.add('post-body');
  wrapper.appendChild(bodySnippet);

  const createdDate = document.createElement('p');
  const created = new Date(post.created);
  createdDate.textContent = `Posted ${created.toLocaleDateString()}`;
  createdDate.classList.add('post-date');
  wrapper.appendChild(createdDate);

  const tagsContainer = document.createElement('div');
  tagsContainer.classList.add('snippet-post-tags');

  if (Array.isArray(post.tags) && post.tags.length > 0) {
    post.tags.forEach((tag) => {
      const tagPill = document.createElement('span');
      tagPill.textContent = tag;
      tagPill.classList.add('snippet-post-tag-item');
      tagsContainer.appendChild(tagPill);
    });
  } else {
    const noTags = document.createElement('span');
    noTags.textContent = 'No tags';
    noTags.classList.add('snippet-post-no-tags');
    tagsContainer.appendChild(noTags);
  }
  wrapper.appendChild(tagsContainer);

  wrapper.addEventListener('click', () => {
    window.location.href = `/post/?id=${post.id}`;
  });

  return wrapper;
}

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

/**
 * Handle search action: resets to page 1 and re-renders with the query.
 * @returns {Promise<void>}
 */
function handleSearchClick() {
  const query = (searchInput?.value || '').trim();
  currentPageNumber = 1;
  return renderPosts(query || '');
}

if (searchButton) {
  searchButton.addEventListener('click', handleSearchClick);
}

if (previousPageButton) {
  previousPageButton.addEventListener('click', () => {
    const targetPage = paginationInfo?.previousPage ?? currentPageNumber - 1;
    navigateToPage(targetPage, (searchInput?.value || '').trim());
  });
}

if (nextPageButton) {
  nextPageButton.addEventListener('click', () => {
    const targetPage = paginationInfo?.nextPage ?? currentPageNumber + 1;
    navigateToPage(targetPage, (searchInput?.value || '').trim());
  });
}

/** Initial render */
renderPosts();
