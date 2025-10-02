export function showSkeletonLoader() {
  const skeletonLoader = document.getElementById('skeleton-loader');
  if (skeletonLoader) {
    skeletonLoader.classList.remove('hidden');
  }
}

export function hideSkeletonLoader() {
  const skeletonLoader = document.getElementById('skeleton-loader');
  if (skeletonLoader) {
    skeletonLoader.classList.add('hidden');
  }
}
