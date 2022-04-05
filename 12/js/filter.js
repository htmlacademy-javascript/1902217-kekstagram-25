import {getTenRandomElements, getElementsByCommentsLength} from './utils.js';

const filterContainer = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters');
const allFilters = document.querySelectorAll('.img-filters__button');
const defaultFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

const addFilters = (array, cb) => {

  filterContainer.classList.remove('img-filters--inactive');
  filterForm.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target.matches('.img-filters__button') && !target.matches('.img-filters__button--active')) {
      allFilters.forEach((item) => item.classList.remove('img-filters__button--active'));
      target.classList.add('img-filters__button--active');

      switch (target) {
        case defaultFilter:
          cb(array.slice(0, 25));
          break;
        case randomFilter:
          cb(getTenRandomElements(array));
          break;
        case discussedFilter:
          cb(getElementsByCommentsLength(array));
          break;
      }
    }
  });
};

export {addFilters};
