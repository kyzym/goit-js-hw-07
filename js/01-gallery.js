import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = makeGalleryMarkup(galleryItems);
let instance;
galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function makeGalleryMarkup(pictures) {
  return pictures
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join('');
}

function openInstanceModal(e) {
  e.preventDefault();
  let elementTagName = e.target.nodeName;
  let selectedPicture = e.target.dataset.source;

  instance = basicLightbox.create(
    `
      <img src="${selectedPicture}" width="800" height="600">
  `,
    {
      onShow: instance => {
        console.log('add listener ');
        document.addEventListener('keydown', escBtnHandler);
      },
      onClose: instance => {
        console.log('remove listener ');
        document.removeEventListener('keydown', escBtnHandler);
      },
    }
  );
  instance.show();
  closeModalByEsc(elementTagName);
}

function closeModalByEsc(elementTagName) {
  if (elementTagName !== 'IMG') {
    console.log('"good shot"');
    return;
  }
}

function escBtnHandler(e) {
  if (e.code === 'Escape') {
    instance.close();
  }
}

galleryContainer.addEventListener('click', openInstanceModal);
