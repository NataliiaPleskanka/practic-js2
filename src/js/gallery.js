import Pagination from 'tui-pagination';
import { UnsplashAPI } from './UnsplashAPI';
import { createMarkup } from './createMarkup';
import 'tui-pagination/dist/tui-pagination.min.css';
import iziToast from 'izitoast';
const galleryList = document.querySelector('.js-gallery');
const api = new UnsplashAPI();
const container = document.getElementById('tui-pagination-container');
const form = document.querySelector('.js-search-form');
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

pagination.on('afterMove', event => {
  const currentPage = event.page;
  api.getPopularPhotos(currentPage).then(result => {
    const markup = createMarkup(result.results);
    galleryList.innerHTML = markup;
  });
  console.log(currentPage);
});

function formSubmit(event) {
  event.preventDefault();
  const inputValue = event.target.elements.query.value.trim();
  if (inputValue === '') {
    iziToast.warning({
      message: 'Enter search query',
    });
    return;
  }
}

form.addEventListener('submit', formSubmit);
