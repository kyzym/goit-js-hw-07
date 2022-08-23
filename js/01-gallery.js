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

function makeModal(e) {
  e.preventDefault();
  let elementTagName = e.target.nodeName;
  let selectedPicture = e.target.dataset.source;

  toggleInstanceModal(selectedPicture, elementTagName);
}

function toggleInstanceModal(selectedPicture, elementTagName) {
  const instance = basicLightbox.create(`
      <img src="${selectedPicture}" width="800" height="600">
  `);
  instance.show();

  if (elementTagName !== 'IMG') {
    return;
  } else {
    console.log(elementTagName);
    document.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        instance.close();
      }
    });
  }
}

galleryContainer.addEventListener('click', makeModal);
console.log(galleryItems);
