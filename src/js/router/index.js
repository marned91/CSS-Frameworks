// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose
export default async function router(pathname = window.location.pathname) {
  if (!pathname || pathname === '/index.html') pathname = '/';
  if (pathname.endsWith('//')) pathname = pathname.slice(0, -1);

  console.log('[router] route', pathname);

  switch (pathname) {
    case '/':
      await import('./views/home.js');
      break;

    case '/auth':
    case '/auth/':
      await import('./views/auth.js');
      break;

    case '/auth/login':
    case '/auth/login/':
      await import('./views/login.js');
      break;

    case '/auth/register':
    case '/auth/register/':
      await import('./views/register.js');
      break;

    case '/post':
    case '/post/':
      await import('./views/post.js');
      break;

    case '/post/edit':
    case '/post/edit/':
      await import('./views/postEdit.js');
      break;

    case '/post/create':
    case '/post/create/':
      await import('./views/postCreate.js');
      break;

    case '/profile':
    case '/profile/':
      await import('./views/profile.js');
      break;

    default:
      await import('./views/notFound.js');
  }
}
