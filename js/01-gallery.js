import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = makeGalleryMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function makeGalleryMarkup(pictures) {
  return pictures
    .map(({ preview, original, description }) => {
      return (
        'beforeend',
        `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`
      );
    })
    .join('');
}

function makeInstance(e) {
  e.preventDefault();
  let clickedPicture = e.target.dataset.source;

  const instance = basicLightbox.create(`
      <img src="${clickedPicture}" width="800" height="600">
  `);
  instance.show();

  if (e.target.nodeName !== 'IMG') {
    return;
  } else {
    document.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        instance.close();
      }
    });
  }
}

galleryContainer.addEventListener('click', makeInstance);
console.log(galleryItems);
