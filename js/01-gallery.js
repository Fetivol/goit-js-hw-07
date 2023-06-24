import { galleryItems } from './gallery-items.js';

const container = document.querySelector('.gallery');

const liElements = galleryItems
  .map(
    ({ preview, original, description }) =>
      `
    <li class="gallery__item">
  <a class="gallery__link" href="${original}" onclick="event.preventDefault()"
  >
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
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }
  const instance = basicLightbox.create(`
    <img src="${evt.target.dataset.source}" width="800" height="600">
    `);
  instance.show();

  closingModal(instance);
});

function closingModal(modal) {
  document.addEventListener('keydown', evt => {
    evt.preventDefault();
    if (evt.key === 'Escape' && modal.visible()) {
      modal.close();
    }
  });
}
