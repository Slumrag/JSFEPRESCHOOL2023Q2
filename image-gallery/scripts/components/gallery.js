import { getRandomImages } from '../api/getRandomImages.js';
window.addEventListener('load', (event) => {
  const searchParams = {
    count: 12,
    orientation: 'landscape',
    extras: 'url_m',
  };
  (async () => {
    const images = await getRandomImages(searchParams);
    renderGallery(images);
  })();
});

function createImage(imageData) {
  const image = document.createElement('img');
  image.src = imageData?.urls.regular;
  image.alt = imageData?.alt_description;
  image.classList.add('image-gallery__item');
  return image;
}
function appendImage(image) {
  const gallery = document.querySelector('.image-gallery');
  gallery.append(image);
}
function clearGallery() {
  const gallery = document.querySelector('.image-gallery');
  while (gallery.firstChild) {
    gallery.removeChild(gallery.firstChild);
  }
}
function renderGallery(imageData) {
  clearGallery();
  imageData.forEach((data) => {
    const image = createImage(data);
    appendImage(image);
  });
}
export { renderGallery };
