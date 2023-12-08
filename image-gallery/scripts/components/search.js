import { searchImages } from '../api/searchImages.js';
import { renderGallery } from './gallery.js';

window.addEventListener('load', () => {
  const searchBar = document.querySelector('.search-bar__input');
  searchBar.focus();
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.search-bar__submit')) return;
  event.preventDefault();
  const searchForm = document.forms[0];
  const query = searchForm?.elements?.search.value;
  // searchForm.reset();
  const searchParams = {
    per_page: 12,
    orientation: 'landscape',
    extras: 'url_m',
  };
  (async () => {
    const images = await searchImages(query, searchParams);
    renderGallery(images);
    // console.log(images);
  })();
});
