'use strict';

(function () {

  var generatePhotoNodes = function (photoData) {
    var photoElements = [];
    var similarPhotoTemplate = document.querySelector('#picture').content;
    for (var i = 0; i < photoData.length; i++) {
      photoElements[i] = similarPhotoTemplate.cloneNode(true);
      photoElements[i].querySelector('.picture__img').src = photoData[i].url;
      photoElements[i].querySelector('.picture__likes').textContent = photoData[i].likes;
      photoElements[i].querySelector('.picture__comments').textContent = photoData[i].comments.length;
    }
    return photoElements;
  };

  var renderPhotos = function () {
    var similarPhotoElement = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    var photoNodes = generatePhotoNodes(window.photoData);
    for (var i = 0; i < photoNodes.length; i++) {
      fragment.appendChild(photoNodes[i]);
    }
    similarPhotoElement.appendChild(fragment);
  };

  renderPhotos();
})();
