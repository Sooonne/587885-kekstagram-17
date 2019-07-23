'use strict';

(function () {
  var POPULAR_PHOTO_COUNT = 10;

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
    return window.photos.slice().sort(function (left, right) {
      var commentsDif = right.comments.length - left.comments.length;
      return commentsDif;
    });
  };

  var getPopularPhotos = function () {
    var copyPhotos = window.photos.slice();
    window.util.shuffleArray(copyPhotos);
    return copyPhotos.slice(0, POPULAR_PHOTO_COUNT);
  };

  var changeFilter = function (evt, photoCollection) {
    clearActiveEffects();
    window.renderPhotos(photoCollection);
    evt.target.classList.add('img-filters__button--active');
  };

  filterPopular.addEventListener('click', function (evt) {
    window.debounce(changeFilter, evt, window.photos);
  });

  filterNew.addEventListener('click', function (evt) {
    window.debounce(changeFilter, evt, getPopularPhotos());
  });

  filterDiscussed.addEventListener('click', function (evt) {
    window.debounce(changeFilter, evt, sortByComments());
  });

  var imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');

})();
