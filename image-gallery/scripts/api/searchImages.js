async function searchImages(query, searchParams = {}) {
  const url = new URL('https://api.unsplash.com/');
  url.pathname = 'search/photos';
  url.searchParams.set('query', query);
  url.searchParams.set('client_id', '4A687HfcpBO278XnwGbt6EVs2-KXWl6XcNLf0BK6MAI');
  Object.keys(searchParams).forEach((key) => {
    url.searchParams.set(key, searchParams[key]);
  });

  try {
    const response = await fetch(url.href);
    const data = await response.json();
    return data.results;
    // console.log('data', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
  }
}
export { searchImages };
