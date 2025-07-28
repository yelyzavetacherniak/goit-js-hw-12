import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btnLoadmore = document.querySelector('.btn-loadmore');

export const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function clearGallery() {
  gallery.innerHTML = '';
}

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}" class="gallery-link">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery-image"/>
        </a>
        <div class="info">
  <div class="label">Likes</div>
  <div class="label">Views</div>
  <div class="label">Comments</div>
  <div class="label">Downloads</div>

  <div class="value">${likes}</div>
  <div class="value">${views}</div>
  <div class="value">${comments}</div>
  <div class="value">${downloads}</div>
        </div>
      </li>
`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  btnLoadmore.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  btnLoadmore.classList.add('hidden');
}
