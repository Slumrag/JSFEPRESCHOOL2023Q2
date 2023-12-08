export async function getRandomImages(searchParams = { count: 12 }) {
  const url = new URL('https://api.unsplash.com/');
  url.pathname = 'photos/random';
  url.searchParams.set('client_id', '4A687HfcpBO278XnwGbt6EVs2-KXWl6XcNLf0BK6MAI');
  Object.keys(searchParams).forEach((key) => {
    url.searchParams.set(key, searchParams[key]);
  });

  try {
    const response = await fetch(url.href);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
