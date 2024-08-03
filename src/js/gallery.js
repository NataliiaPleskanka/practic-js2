import Pagination from 'tui-pagination';
import { UnsplashAPI } from './UnsplashAPI';
import { createMarkup } from './createMarkup';
import 'tui-pagination/dist/tui-pagination.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const galleryList = document.querySelector('.js-gallery');
const api = new UnsplashAPI();
const container = document.getElementById('tui-pagination-container');
const form = document.querySelector('.js-search-form');
const loader = document.querySelector('.loader');
const options = {
  totalItems: 0,
  itemsPerPage: 12,
  visiblePages: 5,
  page: 1,
};

const pagination = new Pagination(container, options);
const page = pagination.getCurrentPage();

api.getPopularPhotos(page).then(result => {
  const markup = createMarkup(result.results);
  console.log(result);
  galleryList.innerHTML = markup;
  pagination.reset(result.total);
});

pagination.on('afterMove', getPopular);

function formSubmit(event) {
  event.preventDefault();
  const inputValue = event.target.elements.query.value.trim();
  if (inputValue === '') {
    iziToast.warning({
      message: 'Enter search query',
    });
    return;
  }

  loader.classList.remove('is-hidden');

  pagination.off('afterMove', getPopular);
  pagination.off('afterMove', getByQuery);
  api.query = inputValue;
  api
    .getPhotoByQuery(page)
    .then(result => {
      if (result.results.length === 0) {
        iziToast.warning({
          message: 'Not Found, try another query',
        });

        return;
      }

      iziToast.success({
        message: `We found ${result.total} photos!`,
      });

      if (result.total <= 12) {
        container.style.display = 'none';
      } else {
        container.style.display = 'block';
      }
      const markup = createMarkup(result.results);
      console.log(result);
      galleryList.innerHTML = markup;
      pagination.reset(result.total);
    })
    .catch(error => {
      console.log(error);
      iziToast.error({
        message: 'Something went wrong',
      });
    })
    .finally(() => {
      loader.classList.add('is-hidden');
      form.reset();
    });

  pagination.on('afterMove', getByQuery);
}

function getPopular(event) {
  const currentPage = event.page;
  api.getPopularPhotos(currentPage).then(result => {
    const markup = createMarkup(result.results);
    galleryList.innerHTML = markup;
  });
}

function getByQuery(event) {
  const currentPage = event.page;
  api.getPhotoByQuery(currentPage).then(result => {
    const markup = createMarkup(result.results);
    galleryList.innerHTML = markup;
  });
}

form.addEventListener('submit', formSubmit);
