import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import warningIcon from './img/warning.svg';
import closeIcon from './img/close.svg';

import { getImagesByQuery } from './js/pixabay-api';

import {
  clearGallery,
  createGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

hideLoader();
hideLoadMoreButton();

const formSearch = document.querySelector('.form');
const input = formSearch.querySelector('input[name="search-text"]');
const btnLoadMore = document.querySelector('.btn-loadmore');

let currentPage = 1;
let currentQuery = '';

formSearch.addEventListener('submit', handleSubmit);
btnLoadMore.addEventListener('click', handleLoading);

async function handleSubmit(event) {
  event.preventDefault();

  const query = input.value.trim();
  if (!query) return;

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.hits.length === 0) {
      hideLoader();
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }

    createGallery(data.hits);
    console.log(data);

    const maxPages = Math.ceil(data.totalHits / data.hits.length);
    if (currentPage >= maxPages) {
      showInfo("We're sorry, but you've reached the end of search results.");
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    showError('Something went wrong. Please try again later.');
    hideLoadMoreButton();
  } finally {
    hideLoader();
  }
}

async function handleLoading() {
  currentPage++;

  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);
    scrollPage();

    const maxPages = Math.ceil(data.totalHits / data.hits.length);
    if (currentPage >= maxPages) {
      showInfo("We're sorry, but you've reached the end of search results.");
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    showError('Something went wrong. Please try again later.');
  } finally {
    hideLoader();
  }
}

function scrollPage() {
  if (currentPage === 1) return;

  const card = document.querySelector('.gallery li');
  if (!card) return;

  const { height: cardHeight } = card.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function showInfo(message) {
  iziToast.info({
    message,
    position: 'topRight',
    timeout: 2000,
    progressBarColor: '#4e75ff',
    messageColor: '#ffffff',
    backgroundColor: '#4e75ff',
    close: true,
    iconUrl: warningIcon,
    onOpening: (instance, toast) => {
      const closeBtn = toast.querySelector('.iziToast-close');
      if (closeBtn) {
        closeBtn.style.backgroundImage = `url(${closeIcon})`;
        closeBtn.style.backgroundSize = '12px 12px';
        closeBtn.style.backgroundRepeat = 'no-repeat';
        closeBtn.style.backgroundPosition = 'center';
        closeBtn.style.color = '#ffffff';
      }
    },
  });
}

function showError(message) {
  iziToast.error({
    message,
    position: 'topRight',
    iconUrl: warningIcon,
    progressBarColor: '#ffffff',
    messageColor: '#ffffff',
    titleColor: '#ffffff',
    backgroundColor: '#ef4040',
    timeout: 2000,
    close: true,
    onOpening: (instance, toast) => {
      const closeBtn = toast.querySelector('.iziToast-close');
      if (closeBtn) {
        closeBtn.style.backgroundImage = `url(${closeIcon})`;
        closeBtn.style.backgroundSize = '12px 12px';
        closeBtn.style.backgroundRepeat = 'no-repeat';
        closeBtn.style.backgroundPosition = 'center';
        closeBtn.style.color = '#ffffff';
      }
    },
  });
}
