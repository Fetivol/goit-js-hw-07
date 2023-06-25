import { galleryItems } from './gallery-items.js';

const container = document.querySelector('.gallery');

const liElements = galleryItems
  .map(
    ({ preview, original, description }) =>
      `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `
  )
  .join('');
container.insertAdjacentHTML('beforeend', liElements);

container.addEventListener('click', evt => {
  evt.preventDefault();
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }
  const instance = basicLightbox.create(
    `
    <img src="${evt.target.dataset.source}" width="800" height="600">
    `,
    {
      onShow: () => {
        window.addEventListener('keydown', handlerModalClose);
      },
      onClose: () => {
        window.removeEventListener('keydown', handlerModalClose);
      },
    }
  );
  instance.show();

  function handlerModalClose(evt) {
    console.log(evt.key);
    if (evt.key === 'Escape') {
      instance.close();
    }
  }
});
