'use strict';

(function () {
  var photos = [];

  var filterForm = document.querySelector('.img-filters__form');
  var filterPopular = filterForm.querySelector('#filter-popular');
  var filterNew = filterForm.querySelector('#filter-new');
  var filterDiscussed = filterForm.querySelector('#filter-discussed');

  var clearActiveEffects = function () {
    filterPopular.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    filterNew.classList.remove('img-filters__button--active');
  };

  var sortByComments = function () {
    return photos.slice().sort(function (left, right) {
      var commentsDif = right.comments.length - left.comments.length;
      return commentsDif;
    });
  };

  var getTenPopularPhotos = function () {
    var copyPhotos = photos.slice();
    window.util.shuffleArray(copyPhotos);
    return copyPhotos.slice(0, 10);
  };

  var changeFilter = function (evt, photoCollection) {
    clearActiveEffects();
    window.renderPhotos(photoCollection);
    evt.target.classList.add('img-filters__button--active');
  };

  filterPopular.addEventListener('click', function (evt) {
    // clearActiveEffects();
    // window.renderPhotos(photos);
    // evt.target.classList.add('img-filters__button--active');
    // changeFilter(evt, photos);
    window.debounce(changeFilter, evt, photos);
  });

  filterNew.addEventListener('click', function (evt) {
    // clearActiveEffects();
    // window.renderPhotos(getTenPopularPhotos());
    // evt.target.classList.add('img-filters__button--active');
    // changeFilter(evt, getTenPopularPhotos());
    window.debounce(changeFilter, evt, getTenPopularPhotos());
  });

  filterDiscussed.addEventListener('click', function (evt) {
    // clearActiveEffects();
    // window.renderPhotos(sortByComments());
    // evt.target.classList.add('img-filters__button--active');
    // changeFilter(evt, sortByComments());
    window.debounce(changeFilter, evt, sortByComments());
  });

  var onDataLoad = function (data) {
    photos = data;
    window.renderPhotos(photos);
  };

  var onDataError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(onDataLoad, onDataError);

  var imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');
})();
